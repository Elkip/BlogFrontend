package com.mitchellhenschel

import com.auth0.jwk.JwkProviderBuilder
import com.mitchellhenschel.config.LoginConfig
import com.mitchellhenschel.config.jwtConfigReader
import com.mitchellhenschel.features.contact.contactRoutes
import com.mitchellhenschel.features.login.JWTService
import com.mitchellhenschel.features.login.LoginRepo
import com.mitchellhenschel.features.login.loginRoutes
import com.mitchellhenschel.util.EmailUtil
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.plugins.forwardedheaders.*
import java.util.concurrent.TimeUnit

fun main(args: Array<String>): Unit =
    io.ktor.server.netty.EngineMain.main(args)

fun Application.authModule() {
    val appConfig = this.environment.config
    val loginConfig = LoginConfig(appConfig)
    val jwtConfig = jwtConfigReader(loginConfig)
    val jwkProvider = JwkProviderBuilder(jwtConfig.issuer)
        .cached(10, 2, TimeUnit.HOURS)
        .rateLimited(10, 1, TimeUnit.MINUTES)
        .build()

    val jwtService = JWTService(jwtConfig, jwkProvider)

    install(ForwardedHeaders) // WARNING: for security, do not include this if not behind a reverse proxy
    install(XForwardedHeaders) // WARNING: for security, do not include this if not behind a reverse proxy

    install(CORS) {
        allowMethod(HttpMethod.Options)
        allowMethod(HttpMethod.Delete)
        allowHeader(HttpHeaders.XForwardedProto)
        allowHeader(HttpHeaders.AccessControlAllowHeaders)
        allowHeader(HttpHeaders.AccessControlAllowOrigin)
        allowHeader("Authorization")
        allowHeader("X-Requested-With")
        allowHeader(HttpHeaders.ContentType)
        allowHost(loginConfig.hostname, schemes = listOf("https"))
        maxAgeInSeconds = 7200
        allowNonSimpleContentTypes = true
        allowCredentials = true
    }

    install(Authentication) {

        basic("auth-basic") {
            validate { credentials ->
                val login = LoginRepo(loginConfig)
                val validation = login.validateUser(credentials.name, credentials.password)
                validation
            }
        }

        jwt("auth-jwt") {
            skipWhen { call -> jwtService.verifyToken(call.request.cookies["token"]) }
            realm = jwtConfig.realm
            verifier(jwkProvider, jwtConfig.issuer) {
                acceptLeeway(3)
            }
            validate { credentials ->
                if (credentials.payload.getClaim("ROLE").asString() == realm) {
                    JWTPrincipal(credentials.payload)
                } else {
                    null
                }
            }
        }
    }
    contactRoutes(loginConfig)
    loginRoutes(jwtService)
}

