package com.mitchellhenschel.features.login

import com.auth0.jwk.JwkProvider
import com.auth0.jwk.NetworkException
import com.auth0.jwk.SigningKeyNotFoundException
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.exceptions.JWTVerificationException
import com.mitchellhenschel.config.JwtConfig
import mu.KotlinLogging
import org.json.simple.JSONObject
import org.json.simple.parser.JSONParser
import java.security.KeyFactory
import java.security.PrivateKey
import java.security.interfaces.RSAPrivateKey
import java.security.interfaces.RSAPublicKey
import java.security.spec.PKCS8EncodedKeySpec
import java.util.*

class JWTService(private val jwtConfig: JwtConfig, private val jwkProvider: JwkProvider) {

    private val privateKey: PrivateKey
    private val log = KotlinLogging.logger{}

    init {
        val keySpecPKCS8 = PKCS8EncodedKeySpec(jwtConfig.privateKey)
        privateKey = KeyFactory.getInstance("RSA").generatePrivate(keySpecPKCS8)
    }

    fun generateToken(user: LoginEntity): String {
        val publicKey = jwkProvider.get(jwtConfig.pubKeyId).publicKey
        log.debug("Got public key")

        try {
            return JWT.create()
                .withAudience(jwtConfig.audience)
                .withIssuer(jwtConfig.issuer)
                .withClaim("NAME", user.name)
                .withClaim("ROLE", user.role)
                .withClaim("EMAIL", user.email)
                .withExpiresAt(Date(System.currentTimeMillis() + 60000))
                .sign(Algorithm.RSA256(publicKey as RSAPublicKey, privateKey as RSAPrivateKey))
        } catch (netEx: NetworkException) {
            log.error("Network Exception: " + netEx.message)
        } catch (signingEx: SigningKeyNotFoundException) {
            log.error("Signing Key not found " + signingEx.message)
        } catch (e: Exception) {
            log.error("Something went wrong: " + e.message)
        }
        return ""
    }

    fun verifyToken(token: String?): Boolean {
        if (token == null) {
            log.info("No token found in memory")
            return false
        }
        val payloadJson = validatedToken(token) ?: return false
        return (payloadJson["ROLE"] == jwtConfig.realm)
    }

    fun getLoginEntity(token: String): LoginEntity? {
        val payloadJson = validatedToken(token) ?: return null
        val name = payloadJson["NAME"].toString()
        val email = payloadJson["EMAIL"].toString()
        val role = payloadJson["ROLE"].toString()
        return LoginEntity(name, email, role)
    }

    private fun validatedToken(validateToken: String): JSONObject? {
        try {
            log.debug("Decoding payload with RSA Key")
            val encodedPayload = JWT.require(
                Algorithm.RSA256(
                    jwkProvider.get(jwtConfig.pubKeyId).publicKey as RSAPublicKey,
                    privateKey as RSAPrivateKey
                )
            )
                .build()
                .verify(validateToken)
                .payload
            log.debug("Decoding payload from Base64")
            val payload = String(Base64.getDecoder().decode(encodedPayload))
            val parser = JSONParser()
            log.debug("Parsing JSON Object")
            return parser.parse(payload) as JSONObject
        } catch (jwtException: JWTVerificationException) {
            log.error("Failed to verify JWT: " + jwtException.message)
            return null
        } catch (exception: Exception) {
            log.error("An error occurred: " + exception.message)
            return null
        }
    }
}
