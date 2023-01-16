package com.mitchellhenschel.features.login

import com.mitchellhenschel.config.LoginConfig
import com.mitchellhenschel.framework.database.BaseMariaDbRepo
import mu.KotlinLogging
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction

class LoginRepo(loginConfig: LoginConfig): BaseMariaDbRepo(loginConfig) {

    private val log = KotlinLogging.logger {}
    private val l = loginConfig
    fun validateUser(username: String, password: String): LoginEntity? = transaction {
            val userQuery = USERS.slice(USERS.columns)
                .select {
                    USERS.username eq username
                }
            val userList = userQuery.toList()
            if (userList.size != 1) {
                log.info("User not found")
                return@transaction null
            }
            val user = userList[0]
            val realPassHash = user[USERS.pass]
            val verified = l.checkPassword(password, realPassHash)

            return@transaction if (verified) {
                log.info("User verified")
                userQuery.map { LoginEntity.fromRow(it) }[0]
            } else {
                log.warn("Incorrect password")
                null
            }
    }
}