package com.mitchellhenschel.util

import org.bouncycastle.jce.provider.BouncyCastleProvider
import java.security.Security
import javax.crypto.Cipher
import javax.crypto.SecretKey
import javax.crypto.spec.IvParameterSpec
import javax.crypto.spec.SecretKeySpec

class PasswordUtil(private val ivKey: String, keyWord: String) {

    private val keyValue = ByteArray(keyWord.length)

    init {
        Security.addProvider(BouncyCastleProvider())
        keyWord.toList().forEachIndexed { i, e -> keyValue[i] = e.code.toByte() }
    }

    @Throws(Exception::class)
    fun decrypt(encrypted: String): String {
        val iv = ByteArray(16)
        for (i in iv.indices) {
            iv[i] = ivKey[i].code.toByte()
        }
        val ivParameterSpec = IvParameterSpec(iv)
        val enc = toByte(encrypted)
        val skeySpec: SecretKey = SecretKeySpec(keyValue, "AES")
        val cipher = Cipher.getInstance("AES/GCM/NoPadding")
        cipher.init(Cipher.DECRYPT_MODE, skeySpec, ivParameterSpec)
        val result = cipher.doFinal(enc)
        return String(result)
    }

    @Throws(Exception::class)
    private fun getRawKey(): ByteArray {
        val key: SecretKey = SecretKeySpec(keyValue, "AES")
        return key.encoded
    }

    private fun toByte(hexString: String): ByteArray {
        val len = hexString.length / 2
        val result = ByteArray(len)
        for (i in 0 until len)
            result[i] = Integer.valueOf(
                hexString.substring(2 * i, 2 * i + 2),
                16
            ).toByte()
        return result
    }
}
