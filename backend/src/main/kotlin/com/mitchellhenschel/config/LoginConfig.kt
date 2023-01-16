package com.mitchellhenschel.config

import com.mitchellhenschel.util.PasswordUtil
import io.ktor.server.config.*
import io.ktor.server.plugins.*
import java.util.*

class LoginConfig(appConfig: ApplicationConfig) {

    val hostname: String
    val mariaDbUri: String
    val mariaDbUser: String
    val issuer: String
    val audience: String
    val realm: String
    val pubKeyId: String
    val privateKey: String?
    val keyLocation: String?
    private val keyword: String
    private val mariaDbName: String
    private val key: String?
    private val sendBlueKey: String?
    private val properties = Properties()

    init {
        this.hostname = appConfig.propertyOrNull("ktor.deployment.allowedHost")?.getString() ?: ""
        val env = appConfig.propertyOrNull("ktor.environment")?.getString()?.lowercase()
        val configFile = "default_$env.properties"
        val inStream = this.javaClass.classLoader.getResourceAsStream(configFile)
        properties.load(inStream)
        inStream?.close()
        val url = properties.getProperty("MARIA_IP")
        this.mariaDbName = properties.getProperty("MARIA_DB")
        this.mariaDbUser = properties.getProperty("MARIA_USER")
        this.mariaDbUri = "jdbc:mariadb://$url/$mariaDbName"
        this.keyword = properties.getProperty("KEYWORD")
        this.key = appConfig.propertyOrNull("ktor.deployment.key")?.getString()
        this.issuer = appConfig.property("ktor.jwt.issuer").getString()
        this.audience = appConfig.property("ktor.jwt.audience").getString()
        this.pubKeyId = appConfig.property("ktor.jwt.pubKeyId").getString()
        this.realm = appConfig.property("ktor.jwt.realm").getString()
        this.privateKey = appConfig.propertyOrNull("ktor.jwt.privateKey")?.getString()
        this.keyLocation = appConfig.propertyOrNull("ktor.jwt.keyLocation")?.getString()
        this.sendBlueKey = appConfig.propertyOrNull("ktor.email.sendInBlueKey")?.getString()
    }

    fun getPassword(): String {
        if (this.key == null)
            throw NotFoundException()
        val passHelper = PasswordUtil(this.key, this.keyword)
        val encryptedPass = properties.getProperty("MARIA_PASS")
        return passHelper.decrypt(encryptedPass)
    }

    fun checkPassword(inputPass: String, realPassHash: String): Boolean {
        if (this.key == null)
            throw NotFoundException()
        val passHelper = PasswordUtil(this.key, this.keyword)
        return inputPass == passHelper.decrypt(realPassHash)
    }

    fun getEmailKey(): String {
        if (this.key == null || this.sendBlueKey == null)
            throw NotFoundException()
        val passHelper = PasswordUtil(this.key, this.keyword)
        return passHelper.decrypt(this.sendBlueKey)
    }

}
