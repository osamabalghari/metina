const express = require('express')
const config = require('config')
const limiter = require('express-rate-limit')
const authController = require('../../controller/authController')
const throttle = config.get('throttle')
const metrixapi = express.Router()
const use = require('../../helper/utility').use

metrixapi.post('/api/sigin', limiter(throttle.signin), use(authController.signin))

module.exports = metrixapi
