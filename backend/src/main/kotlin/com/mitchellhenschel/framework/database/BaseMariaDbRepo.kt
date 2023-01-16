package com.mitchellhenschel.framework.database

import com.mitchellhenschel.config.LoginConfig
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.javatime.datetime
import org.jetbrains.exposed.sql.transactions.TransactionManager
import java.time.LocalDateTime

abstract class BaseMariaDbRepo(config: LoginConfig) {

    private val db = Database.connect(config.mariaDbUri, driver = "com.mysql.cj.jdbc.Driver",
        user = config.mariaDbUser, password = config.getPassword())
    init {
        TransactionManager.defaultDatabase = db
    }

    object USERS: Table() {
        var username = varchar("USERNAME" , 20)
        var pass = varchar("PASS", 250)
        var role = varchar("ROLE", 5)
        var name = varchar("NAME", 30)
        var email = varchar("EMAIL", 30)

        override val primaryKey = PrimaryKey(username, name = "PK_USER_ID")
    }

    object CONTACT : Table() {
        val id: Column<Int> = integer("ID").autoIncrement()
        var name = varchar("NAME", 30)
        var email = varchar("EMAIL", 30)
        var message = varchar("MESSAGE", 250)
        var date: Column<LocalDateTime> = datetime("DATE")
        var ip: Column<Long> = long("IP")

        override val primaryKey = PrimaryKey(id, name = "PK_CONTACT_ID")
    }
}
