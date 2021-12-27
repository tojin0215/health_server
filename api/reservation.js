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
        Reservation.findAll({})
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
            date: req.body.date,
            time: req.body.time,
            exercise_name: req.body.exercise_name,
            customer_name: req.body.customer_name,
            customer_id: req.body.customer_id,
            isCancel: req.body.isCancel,
            cancelComment: req.body.cancelComment,
        })
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
        Reservation.update({
            date: req.body.date,
            time: req.body.time,
            exercise_name: req.body.exercise_name,
            isCancel: req.body.isCancel,
            cancelComment: req.body.cancelComment,
        }, {
            where: {
                res_no: req.body.res_no
            }
        }
        )
            .then(() => {
                res.send('updateokay');
            })
            .catch((err) => {
                console.error(err);
            });
    })
router.route('/reservation/delete')
    .delete(function (req, res) {
        //예약삭제
        Reservation.destroy({ where: { res_no: req.body.res_no } })
            .then((result) => {
                res.send('Delete');
            })
            .catch((err) => {
                console.error(err);
            });
    })


module.exports = router;
