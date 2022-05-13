let express = require("express");
let router = express.Router();
var Trainer = require("../models").Trainer;
const sequelize = require("sequelize");
const Op = sequelize.Op;
const crypto = require("crypto");

router
  .route("/trainer")
  .get(function (req, res) {
    Trainer.findAll({
      where: {
        fitness_no: req.body.fitness_no,
      },
    });
  })
  .post(function (req, res) {});
module.exports = router;
