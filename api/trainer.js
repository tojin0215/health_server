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
    })
      .then(() => {
        res.send({ success: "select success!" });
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .post(function (req, res) {
    Trainer.create({
      phone: req.body.phone,
      birth: req.body.birth,
      trainer_name: req.body.trainer_name,
      fitness_no: req.body.fitness_no,
      ment: req.body.ment,
      history: req.body.history,
      sex: req.body.sex,
    })
      .then(() => {
        res.send({ success: "insert success!" });
      })
      .catch((err) => {
        console.error(err);
      });
  });
module.exports = router;
