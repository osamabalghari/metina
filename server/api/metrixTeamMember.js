/* delete me after setup */
const express = require('express');
const teamMembersController = require('../controller/teamMembersController');
const api = express.Router();
const use = require('../helper/utility').use;
const auth = require('../model/auth');

api.post('/api/team_member', use(teamMembersController.create));
api.get('/api/team_member/:id', auth.verify('owner', 'invite.create'), use(teamMembersController.get));

api.get('/api/all_team_members/:id', use(teamMembersController.getAll));

module.exports = api;