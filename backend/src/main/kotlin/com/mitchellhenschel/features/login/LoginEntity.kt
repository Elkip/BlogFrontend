package com.mitchellhenschel.features.login

import com.mitchellhenschel.framework.database.BaseMariaDbRepo
import io.ktor.server.auth.*
import org.jetbrains.exposed.sql.ResultRow

data class LoginEntity(val name: String,
                       val email: String,
                       val role: String) : Principal {
                           companion object {
                               fun fromRow(resultRow: ResultRow) = LoginEntity(
                                   name = resultRow[BaseMariaDbRepo.USERS.name],
                                   email = resultRow[BaseMariaDbRepo.USERS.email],
                                   role = resultRow[BaseMariaDbRepo.USERS.role]
                               )
                           }
                       }

