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
        const fitness_no = req.body.fitness_no;
        const exercise_class = req.body.exercise_class;
        const number_of_people = req.body.number_of_people;
        const hour = req.body.hour;
        const minute = req.body.minute;
        const trainer = req.body.trainer;
        const class_date = req.body.class_date;

        ReservationClass.findAll({ where: { fitness_no, exercise_class, hour, minute } })
            .then(result => {
                if (result.length > 0) {
                    ReservationClass.findAll({ where: { class_date } })
                        .then(result => {
                            if (result.length > 0) {
                                res.send({ 'message': '중복날짜' })
                            }
                        })
                    res.send({ 'message': '이미 설정한 운동입니다.' });
                }
                else {
                    ReservationClass
                        .create({ fitness_no, exercise_class, number_of_people, hour, minute, trainer, class_date })
                        .then(() => res.send({ 'message': 'ok' }))
                        .catch((err) => res.send({ 'message': '등록이 불가합니다.' }));
                }
            })
            .catch((err) => res.send({ 'message': '등록이 불가합니다.' }));
    })

router.route('/reservationClass/update')
    .post(function (req, res) {
        // update
        ReservationClass.update({
            fitness_no: req.body.fitness_no,
            exercise_class: req.body.exercise_class,
            number_of_people: req.body.number_of_people,
            hour: req.body.hour,
            minute: req.body.minute,
            trainer: req.body.trainer,
            class_date: req.body.class_date
        }, {
            where: {
                no: req.query.no
            }
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
        ReservationClass.destroy({ where: { no: req.query.no } })
            .then((result) => {
                res.send('Delete');
            })
            .catch((err) => {
                console.error(err);
            });
    })


module.exports = router;
