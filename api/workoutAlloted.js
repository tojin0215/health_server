let express = require('express');
let router = express.Router();
var WorkoutAlloted = require('../models').WorkoutAlloted;
const sequelize = require('sequelize');
const Op = sequelize.Op;
