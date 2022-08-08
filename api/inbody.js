let express = require('express');
let router = express.Router();
var Inbody = require('../models').Inbody;

const sequelize = require('sequelize');
const Op = sequelize.Op;

require('moment-timezone');
var moment = require('moment');
moment.tz.setDefault('Asia/Seoul');
//asd
router
  .route('/inbody')
  .get(function (req, res) {
    // 불러오기
    let type = req.query.type;
    if (type === 'all') {
      // 전체 리스트
      Inbody.findAll({
        where: {
          fitness_no: req.query.fitness_no,
          //member_no: req.query.fitness_no
        },
      })
        .then((inbody) => {
          res.json(inbody);
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
    } else if (type === 'client') {
      Inbody.findAll({
        where: {
          fitness_no: req.query.fitness_no,
          member_no: req.query.member_no,
        },
      })
        .then((inbody) => {
          res.json(inbody);
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
    } else if (type === 'select') {
      console.log(
        moment(req.query.startDate).subtract(7, 'hours').format('YYYY-MM-DD')
      );
      Inbody.findAll({
        where: {
          fitness_no: req.query.fitness_no,
          member_no: req.query.member_no,
          measurementDate: {
            [Op.between]: [
              moment(req.query.startDate).subtract(9, 'hours'),
              moment(req.query.endDate).subtract(9, 'hours'),
            ],
          },
        },
      })
        .then((inbody) => {
          res.json(inbody);
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
    } else if (type === 'inbodySelect') {
      console.log(req.query.startNum, ' ', req.query.endNum);
      Inbody.findAll({
        where: {
          fitness_no: req.query.fitness_no,
          member_no: req.query.member_no,
          inbody_no: {
            [Op.between]: [req.query.startNum, req.query.endNum],
          },
        },
      })
        .then((inbody) => {
          res.json(inbody);
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
    }
  })
  .post(function (req, res) {
    // 쓰기
    Inbody.create({
      fitness_no: req.body.fitness_no,
      member_no: req.body.member_no,
      inbody_no: req.body.inbody_no,
      height: req.body.height, //키
      measurementDate: req.body.measurementDate, // 측정날짜
      bodyMoisture: req.body.bodyMoisture, //체수분
      protein: req.body.protein, //단백질
      mineral: req.body.mineral, // 무기질
      bodyFat: req.body.bodyFat, //체지방
      muscleMass: req.body.muscleMass, //근육량
      bodyFatMass1: req.body.bodyFatMass1, //체지방량1
      weight: req.body.weight, //체중
      skeletalMuscleMass: req.body.skeletalMuscleMass, //골격근량
      bodyFatMass2: req.body.bodyFatMass2, //체지방량2
      BMI: req.body.bmi, //BMI
      PercentBodyFat: req.body.PercentBodyFat, //체지방률
    })
      .then(() => {
        res.send({ success: 'inbody update!' });
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .put(function (req, res) {
    // 수정
    /*Inbody.update({ title: "바꿀거 ", contents: "바꿀 내용1", mood : "바꿀 내용2", verse: "바꿀 내용3", }, { where: { writer: '권소령', year:2021, month:1, date:28 } })
        .then((result) => {
        res.send('Update the diary');
        })
        .catch((err) => {
        console.error(err);
        next(err);
        });*/
  })
  .delete(function (req, res) {
    //삭제
    /*Inbody.destroy({ where: { writer: "권소령", year:2021, month:1, date:14 } })
        .then((result) => {
        res.send('Delete the diary');
        })
        .catch((err) => {
        console.error(err);
        next(err);
        });*/
  });

module.exports = router;
