package com.mitchellhenschel.features.contact

import com.mitchellhenschel.config.LoginConfig
import com.mitchellhenschel.framework.database.BaseMariaDbRepo
import com.mitchellhenschel.util.convertIpAddressToLong
import org.jetbrains.exposed.sql.SortOrder
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction


class ContactRepo(loginConfig: LoginConfig): BaseMariaDbRepo(loginConfig) {
    fun insertMessage(message: ContactEntity, ip: String): ContactEntity {
        message.ip = ip.convertIpAddressToLong()
        if (!(message.email == "" || message.name == "" || message.message == ""))
            transaction {
               message.id = CONTACT.insert {
                   it[name] = message.name
                   it[email] = message.email
                   it[date] = message.date
                   it[this.message] = message.message
                   it[this.ip] = message.ip
               } get CONTACT.id
            }
        return message
    }

    fun getLastMessage(): ContactEntity {
        return transaction {
            val lastContact = CONTACT.slice(CONTACT.columns)
                .selectAll()
                .orderBy(CONTACT.date, order = SortOrder.DESC)
                .toList().map { ContactEntity.fromRow(it) }
                .firstOrNull()

            return@transaction lastContact ?: ContactEntity()
        }
    }
}