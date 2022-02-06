let express = require('express');
let router = express.Router();
var Reservation = require('../models').Reservation;

const sequelize = require("sequelize");
const Op = sequelize.Op;

require('moment-timezone');
var moment = require('moment');
moment.tz.setDefault("Asia/Seoul");

router.route('/reservation/select')
    .get(function (req, res) {
        //예약현황 select
        Reservation.findAll({
            where: {
                fitness_no: req.query.fitness_no
            }
        })
            .then((reservation) => {
                res.json(reservation);
            })
            .catch((err) => {
                console.error(err);
            })
    })

router.route('/reservation/insert')
    .post(function (req, res) {
        const fitness_no = req.body.fitness_no;
        //>= x, < o
        Reservation.findAll({ where: { fitness_no } })
            .then((reservation) => {
                const ex_name = req.body.exercise_name;
                const ex_time = req.body.time;
                const ex_date = req.body.date;
                const customer_name = req.body.customer_name;
                const number_of_people = req.body.number_of_people
                const trainer = req.body.trainer;
                const customer_id = `${req.body.customer_id}`

                let exercise_length = reservation.filter(item =>
                    item.exercise_name === ex_name && item.time === ex_time &&
                    item.date.split('T')[0] === ex_date.split('T')[0]).length;


                const is_already_registed = reservation.filter(item =>
                    item.customer_id === customer_id &&
                    item.exercise_name === ex_name && item.time === ex_time &&
                    item.date.split('T')[0] === ex_date.split('T')[0]
                ).length > 0


                if (exercise_length >= req.body.number_of_people) {
                    res.send({ 'message': '예약이 다 찼습니다' });
                }
                else if (is_already_registed) {
                    res.send({ 'message': '이미 신청한 운동입니다' });
                }
                else {

                    //예약하기 insert
                    Reservation.create({
                        fitness_no: fitness_no,
                        date: ex_date,
                        time: ex_time,
                        exercise_name: ex_name,
                        customer_name: customer_name,
                        number_of_people: number_of_people,
                        trainer: trainer,
                        customer_id: `${req.body.customer_id}`
                    })
                        .then(() => {
                            res.send({ 'message': 'ok' });
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                }
            })
            .catch((err) => {
                console.error(err);
                next(err);
            });
    })


router.route('/reservation/update')
    .put(function (req, res) {
        //예약변경 update 

        if (req.body.type === "app") {
            Reservation.update({
                date: req.body.date,
                time: req.body.time,
                exercise_name: req.body.exercise_name,
                isCancel: req.body.isCancel,
                cancelComment: req.body.cancelComment,
                number_of_people: req.body.number_of_people
            }, {
                where: {
                    res_no: req.query.res_no
                }
            }
            )
                .then(() => {
                    res.send('appupdate');
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            Reservation.update({
                time: req.body.time,
                exercise_name: req.body.exercise_name,
                number_of_people: req.body.number_of_people,
                trainer: req.body.trainer,

                date: req.body.date,
                isCancel: req.body.isCancel,
                cancelComment: req.body.cancelComment
            }, {
                where: {
                    res_no: req.query.res_no
                }
            }
            )
                .then(() => {
                    res.send('updateokay');
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    })


router.route('/reservation/delete')
    .delete(function (req, res) {
        //예약삭제
        Reservation.destroy({ where: { res_no: req.query.res_no } })
            .then((result) => {
                res.send('Delete');
            })
            .catch((err) => {
                console.error(err);
            });
    })


module.exports = router;
