let express = require('express');
let router = express.Router();
var Inbody = require('../models').Inbody;

const sequelize = require("sequelize");
const Op = sequelize.Op;

require('moment-timezone');
var moment = require('moment');
moment.tz.setDefault("Asia/Seoul");

router.route('/inbody')
    .get(function(req, res) {
        // 불러오기
        let type = req.query.type;
        if(type === "all"){ // 전체 리스트
            Inbody.findAll({
                where: { 
                    fitness_no: req.query.fn,
                    //member_no: req.query.fn
                } 
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
    .post(function(req, res) {
        // 쓰기
        // Inbody.create({
        //     fitness_no: req.body.fitness_no,
        //     member_no: req.body.member_no,
        //     exerciseName:  req.body.exerciseName, 
        //     exercisePrice: req.body.exercisePrice,
        //     //locker:req.body.locker,
        //     lockerPrice: req.body.lockerPrice,
        //     //sportswear:req.body.sportswear,
        //     sportswearPrice: req.body.sportswearPrice,
        //     paymentTools: req.body.paymentTools,
        //     paymentDate: req.body.paymentDate,
        // }).then(() => {
        //     res.send({'success':'inbody update!'});
        // })
        // .catch((err) => {
        //     console.error(err);
        // });
    })
    .put(function(req, res) {
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
