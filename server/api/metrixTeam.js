/* delete me after setup */
const express = require('express');
const teamController = require('../controller/teamController');
const api = express.Router();
const use = require('../helper/utility').use;
const inviteController = require('../controller/inviteController');
const auth = require('../model/auth');
const multer = require('multer')
const upload = multer({dest: 'uploads'})

api.post('/api/team', auth.verify('admin', 'invite.create'), upload.any(), use(teamController.create));
api.get('/api/team/:id', auth.verify('owner', 'invite.create'), use(teamController.get));
api.get('/api/team', auth.verify('user' || 'admin' || 'owner', 'invite.create'), use(teamController.getAll));
api.put('/api/team/:id', auth.verify('admin', 'invite.create'),  upload.any(), use(teamController.update));
api.delete('/api/delete-team/:id', auth.verify('admin', 'invite.create'), use(teamController.deleteTeam));

api.post('/api/invite_member', use(inviteController.addMember));
module.exports = api;