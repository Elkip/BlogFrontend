package com.mitchellhenschel

import io.ktor.http.*
import io.ktor.server.config.*
import io.ktor.server.routing.*
import io.ktor.server.testing.*
import kotlin.test.Test
import kotlin.test.assertEquals

class ApplicationTest {

    @Test
    fun testRoot() {
        testApplication {
            environment {
                config = ApplicationConfig("application.conf")
            }
            routing {
                get("/") {
                    assertEquals(HttpStatusCode.OK, this.context.response.status())
                }
            }
        }
    }
}
