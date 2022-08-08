let express = require('express');
let router = express.Router();
var Sales = require('../models').Sales;

const sequelize = require('sequelize');
const Op = sequelize.Op;

require('moment-timezone');
var moment = require('moment');
moment.tz.setDefault('Asia/Seoul');

router
  .route('/sales')
  .get(function (req, res) {
    // 불러오기
    let type = req.query.type;
    if (type === 'all') {
      // 전체 리스트
      //console.log(moment().format("YYYY-MM-DD"))
      //console.log(moment().add(1,'day').format("YYYY-MM-DD"))
      Sales.findAll({
        where: {
          fitness_no: req.query.fitness_no,
          //paymentDate : moment().format("YYYY-MM-DD")
          paymentDate: {
            [Op.between]: [
              moment().format('YYYY-MM-DD'),
              moment().add(1, 'day').format('YYYY-MM-DD'),
            ],
          },
        },
      })
        .then((sales) => {
          res.json(sales);
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
    } else if (type === 'select') {
      // 원하는 날짜22
      //console.log(moment(req.query.startDate).subtract(7, 'hours').format("YYYY-MM-DD"))
      Sales.findAll({
        where: {
          fitness_no: req.query.fitness_no,
          //paymentDate : moment().format("YYYY-MM-DD")
          paymentTools: { [Op.like]: '%' + req.query.paymentTools + '%' },
          exerciseName: { [Op.like]: '%' + req.query.exerciseName + '%' },
          paymentDate: {
            [Op.between]: [
              moment(req.query.startDate).subtract(9, 'hours'),
              moment(req.query.endDate).subtract(9, 'hours'),
            ],
          },
        },
      })
        .then((sales) => {
          res.json(sales);
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
    } else if (type === 'tools') {
      //결제도구
      Sales.findAll({
        where: {
          fitness_no: req.query.fitness_no,
          paymentTools: req.query.paymentTools,
          paymentDate: {
            [Op.between]: [
              moment().format('YYYY-MM-DD'),
              moment().add(1, 'day').format('YYYY-MM-DD'),
            ],
          },
        },
      })
        .then((sales) => {
          res.json(sales);
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
    } else if (type === 'exercise') {
      //운동
      Sales.findAll({
        where: {
          fitness_no: req.query.fitness_no,
          exerciseName: req.query.exerciseName,
          paymentDate: {
            [Op.between]: [
              moment().format('YYYY-MM-DD'),
              moment().add(1, 'day').format('YYYY-MM-DD'),
            ],
          },
        },
      })
        .then((sales) => {
          res.json(sales);
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
    }
  })
  .post(function (req, res) {
    // 쓰기
    Sales.create({
      fitness_no: req.body.fitness_no,
      client_name: req.body.client_name,
      exerciseName: req.body.exerciseName,
      exercisePrice: req.body.exercisePrice,
      //locker:req.body.locker,
      lockerPrice: req.body.lockerPrice,
      //sportswear:req.body.sportswear,
      sportswearPrice: req.body.sportswearPrice,
      paymentTools: req.body.paymentTools,
      paymentDate: req.body.paymentDate,
      paidMembership: req.body.paidMembership,
      salesStart_date: req.body.salesStart_date,
      salesDays: req.body.salesDays,
    })
      .then(() => {
        res.send({ success: 'sales update!' });
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .put(function (req, res) {
    // 수정
  })
  .delete(function (req, res) {
    //삭제
  });

module.exports = router;
