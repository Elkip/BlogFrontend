package com.mitchellhenschel.features.login

import com.mitchellhenschel.Response
import com.mitchellhenschel.util.CommonRoutes
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.http.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.util.date.*

fun Application.loginRoutes(jwtService: JWTService) = routing {

    authenticate("auth-basic") {
        get(CommonRoutes.LOGIN) {
            call.application.environment.log.info("Starting login sequence")
            val user = this.call.authentication.principal<LoginEntity>()!!
            call.application.environment.log.debug("Generating signed token")
            val token = jwtService.generateToken(user)
            if (token == "") {
                call.application.environment.log.warn("No token returned")
                call.respond(Response(status = "500"))
            }
            call.application.environment.log.debug("Creating secure cookie")
            val cookie = Cookie("token", token, httpOnly = true, secure = true, extensions = mapOf("SameSite" to "lax"))
            call.response.cookies.append(cookie)
            call.application.environment.log.info("Sending response")
            call.respond(Response(status = "ok"))
        }
    }

    authenticate("auth-jwt") {
        get("getRole") {
            val entity = jwtService.getLoginEntity(call.request.cookies["token"]!!) ?: LoginEntity("", "", "")
            call.respond(entity)
        }
        get("logout") {
            call.response.cookies.append(
                "token",
                "",
                CookieEncoding.URI_ENCODING,
                0.toLong(),
                GMTDate(),
                null,
                null,
                secure = true,
                httpOnly = true
            )
            call.respond(Response(status = "ok"))
        }
    }

}

