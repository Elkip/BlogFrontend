package com.mitchellhenschel.util

import com.mitchellhenschel.features.contact.ContactEntity
import mu.KotlinLogging
import org.apache.commons.mail.DefaultAuthenticator
import org.apache.commons.mail.SimpleEmail
import java.util.*

class EmailUtil(){

    private val props = Properties()
    private val log = KotlinLogging.logger {}
    init {
       props.load(this.javaClass.classLoader.getResourceAsStream("mail.properties"))
    }
    fun sendMessageMail(message: ContactEntity, pass: String?) {
        log.info("Preparing to send email")
        val body = message.toHTML()
        try {
            val email = SimpleEmail()
            email.hostName = props["mail.smtp.host"] as String
            email.setSmtpPort(Integer.parseInt(props["mail.smtp.port"] as String))
            email.setAuthenticator(DefaultAuthenticator(props["mail.smtp.user"] as String, pass))
            email.setFrom(props["mail.from"] as String)
            email.subject = props["mail.subject"] as String
            email.setMsg(body)
            email.addTo(props["mail.to"] as String)
            email.send()
            log.info("Email sent")
        } catch (e: Exception) {
            e.printStackTrace()
        }

    }

}