let express = require('express');
let router = express.Router();
var Sales = require('../models').Sales;

const sequelize = require("sequelize");
const Op = sequelize.Op;

router.route('/sales')
    .get(function(req, res) {
        // 불러오기
        let type = req.query.type;
        Sales.findAll()
            .then((sales) => {
                res.json(sales);
            })
            .catch((err) => {
                console.error(err);
                next(err);
            });
    })
    .post(function(req, res) {
        // 쓰기
        Sales.create({
            fitness_no: req.body.fitness_no,
            member_no: req.body.member_no,
            exerciseName:  req.body.exerciseName, 
            exercisePrice: req.body.exercisePrice,
            //locker:req.body.locker,
            lockerPrice: req.body.lockerPrice,
            //sportswear:req.body.sportswear,
            sportswearPrice: req.body.sportswearPrice,
            paymentTools: req.body.paymentTools,
            paymentDate: req.body.paymentDate,
        }).then(() => {
            res.send({'success':'sales update!'});
        })
        .catch((err) => {
            console.error(err);
        });
    })
    .put(function(req, res) {
        // 수정
        /*Sales.update({ title: "바꿀거 ", contents: "바꿀 내용1", mood : "바꿀 내용2", verse: "바꿀 내용3", }, { where: { writer: '권소령', year:2021, month:1, date:28 } })
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
        /*Sales.destroy({ where: { writer: "권소령", year:2021, month:1, date:14 } })
        .then((result) => {
        res.send('Delete the diary');
        })
        .catch((err) => {
        console.error(err);
        next(err);
        });*/
    });

module.exports = router;
