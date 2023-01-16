package com.mitchellhenschel.util

import mu.KotlinLogging
import java.net.InetAddress
import java.nio.ByteBuffer
import java.nio.ByteOrder
import java.util.*

private val log = KotlinLogging.logger {}

/*fun getIdFromDate(): Timestamp {
    val dFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss", Locale.ENGLISH)
    val d = LocalDateTime.now().format(dFormat)
    return Timestamp.valueOf(d)
}*/

fun String.convertIpAddressToLong(): Long {
    return try {
        log.info("Converting ipAddr: $this")
        val addr: InetAddress = InetAddress.getByName(this)
        log.debug("InetAddress: ${addr.address}")
        val buffer = ByteBuffer.allocate(Long.SIZE_BYTES).order(ByteOrder.BIG_ENDIAN)
        buffer.put(byteArrayOf(0,0,0,0))
        buffer.put(addr.address)
        buffer.position(0)
        log.debug("Converted to: ${buffer.long}")
        buffer.getLong(0)
    } catch (e: Exception) {
        log.error("An error occurred while extracting IP address.")
        e.printStackTrace()
        0.toLong()
    }

}

fun Long.convertLongToIpAddress(): String {
    val address = InetAddress.getByName(this.toString())
    log.debug("Converted $this to $address")
    return address.toString()
}