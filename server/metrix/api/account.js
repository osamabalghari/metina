const config = require('config')
const express = require('express')
const limiter = require('express-rate-limit')
const accountController = require('../controller/accountController')
const throttle = config.get('throttle')
const metrixapi = express.Router()
const use = require('../../helper/utility').use

metrixapi.post('/api/signup', limiter(throttle.signup), use(accountController.create))

module.exports = metrixapi
