package com.mitchellhenschel.features.contact

import com.mitchellhenschel.framework.database.BaseMariaDbRepo
import com.mitchellhenschel.util.convertLongToIpAddress
import org.jetbrains.exposed.sql.ResultRow
import java.time.LocalDateTime

data class ContactEntity(
    var id: Int = 0,
    var date: LocalDateTime = LocalDateTime.now(),
    var name: String = "",
    var email: String = "",
    var message: String = "",
    var ip: Long = 0.toLong()) {
    override fun toString(): String = "{\n\t\"id\":\"$id\",\n" +
            "\t\"date\":\"$date\",\n\t\"name\":\"$name\",\n\t\"email\":\"$email\"," +
            "\n\t\"message\":\"$message\",\n\t\"ip\":\"${ip.convertLongToIpAddress()}\"\n}"

    fun toHTML(): String = "<html><body><h3>New message from $name at ${ip.convertLongToIpAddress()} received $date</h3> \n\n" +
            "Message Id: $id \n$message</body></html>"

    companion object {
        fun fromRow(resultRow: ResultRow) = ContactEntity(
            id = resultRow[BaseMariaDbRepo.CONTACT.id],
            name = resultRow[BaseMariaDbRepo.CONTACT.name],
            date = resultRow[BaseMariaDbRepo.CONTACT.date],
            email = resultRow[BaseMariaDbRepo.CONTACT.email],
            message = resultRow[BaseMariaDbRepo.CONTACT.message],
            ip = resultRow[BaseMariaDbRepo.CONTACT.ip]
        )
    }
}