let express = require('express');
let router = express.Router();
var Workout = require('../models').Workout;
const sequelize = require('sequelize');
const Op = sequelize.Op;
