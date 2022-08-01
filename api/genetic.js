let express = require('express');
let router = express.Router();
var ExercisePack = require('../models').User;

const sequelize = require('sequelize');
const Op = sequelize.Op;
router.route('/genetic');
module.exports = router;
