/**
 * @author xcv
 */
let express = require("express");
let router = express.Router();
var trainer = require("../models").Trainer;

const sequelize = require("sequelize");
const Op = sequelize.Op;

require("moment-timezone");
var moment = require("moment");
const { Trainer } = require("../models");
moment.tz.setDefault("Asia/Seoul");

router.route("/trainerLogin").post(function (req, res) {
  Trainer.findAll({
    where: {
      fitness_no: req.body.fitness_no,
    },
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
