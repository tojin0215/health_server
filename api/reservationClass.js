let express = require('express');
let router = express.Router();
var ReservationClass = require('../models').ReservationClass;

const sequelize = require("sequelize");
const Op = sequelize.Op;

require('moment-timezone');
var moment = require('moment');
moment.tz.setDefault("Asia/Seoul");

router.route('/reservationClass/select')
    .get(function (req, res) {
        //예약현황 select
        ReservationClass.findAll({
            where: {
                fitness_no: req.query.fitness_no
            }
        })
            .then((reservationClass) => {
                res.json(reservationClass);
            })
            .catch((err) => {
                console.error(err);
            })
    })

router.route('/reservationClass/insert')
    .post(function (req, res) {
        // insert
        ReservationClass.create({
            fitness_no: req.body.fitness_no,
            exercise_class: req.body.exercise_class,
            number_of_people: req.body.number_of_people
        }
        )
            .then(() => {
                res.send({ 'message': 'ok' });
            })
            .catch((err) => {
                console.error(err);
            });
    })


router.route('/reservationClass/delete')
    .delete(function (req, res) {
        //삭제
        ReservationClass.destroy({ where: { no: req.body.no } })
            .then((result) => {
                res.send('Delete');
            })
            .catch((err) => {
                console.error(err);
            });
    })


module.exports = router;
