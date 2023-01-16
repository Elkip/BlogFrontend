package com.mitchellhenschel.config

import mu.KotlinLogging
import java.io.File
import java.nio.file.Files
import java.util.*

data class JwtConfig(
    val issuer: String,
    val audience: String,
    val realm: String,
    val privateKey: ByteArray,
    val pubKeyId: String
    )

fun jwtConfigReader(config: LoginConfig): JwtConfig = JwtConfig(
    issuer = config.issuer,
    audience = config.audience,
    realm = config.realm,
    privateKey = getPrivateKey(config.privateKey, config.keyLocation),
    pubKeyId = config.pubKeyId
)

fun getPrivateKey(privateKey: String?, keyLocation: String?): ByteArray {
    val log = KotlinLogging.logger{}
    if (privateKey != null) {
        log.debug("Read key from properties")
        return Base64.getDecoder().decode(privateKey)
    }
    if (keyLocation != null) {
        val keyFile = File(keyLocation)
        val key = Files.readAllBytes(keyFile.toPath())
        log.debug("Read key from file")
        return key
    }
    throw error("No private key found")
}
