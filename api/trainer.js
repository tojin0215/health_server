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

router.route("/trainerLogin").get(function (req, res) {
  const phone = req.body.phone;
  const birth = req.body.birth;
  if (phone === undefined) {
    res.send({ message: "등록된 핸드폰번호가 없습니다." });
  } else {
    Trainer.findAll({
      where: {
        phone: phone,
        birth: birth,
      },
    })
      .then((result) => {
        Trainer.findAll({}).then((result) => console.log(result.length));
        if (result.length > 0) {
          res.send(result[0]);
        } else {
          res.send({ message: "생년월일이 틀렸습니다." });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
});

module.exports = router;
