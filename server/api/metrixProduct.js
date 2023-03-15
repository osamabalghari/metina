/* delete me after setup */
const express = require('express');
const productController = require('../controller/productController');
const api = express.Router();
const use = require('../helper/utility').use;
const inviteController = require('../controller/inviteController');
const auth = require('../model/auth');
const multer = require('multer')
const upload = multer({dest: 'uploads'})

api.post('/api/product', auth.verify('admin', 'invite.create'),  upload.any(), use(productController.create));
api.get('/api/product/:id', auth.verify('admin', 'invite.create'), use(productController.get));

//get all team products by team id
api.get('/api/all_product/:id', auth.verify('owner', 'invite.create'), use(productController.getAll));
api.post('/api/invite_member', use(inviteController.addMember));
module.exports = api;