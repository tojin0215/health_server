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
        //예약하기 insert
        Reservation.create({
            fitness_no: req.body.fitness_no,
            date: req.body.date,
            time: req.body.time,
            exercise_name: req.body.exercise_name,
            customer_name: req.body.customer_name,
            number_of_people: req.body.number_of_people
            // customer_id: req.body.customer_id
        }
        )
            .then(() => {
                res.send({ 'message': 'ok' });
            })
            .catch((err) => {
                console.error(err);
            });
    })

router.route('/reservation/update')
    .put(function (req, res) {
        //예약변경 update 

        if (type === "app") {
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
