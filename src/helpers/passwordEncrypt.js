"use strict"
/* --------------------- PASSWORD ENCRYPT ------------ */

const crypto = require('node:crypto'),
    keycode = process.env.SECRET_KEY,
    loopCount = 10_000,
    charcount = 32,
    encType = 'sha512'

module.exports = function (password) {
    return crypto.pbkdf2Sync(password, keycode, loopCount, charcount, encType).toString('hex')
}
