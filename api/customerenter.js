let express = require('express');
let router = express.Router();
var CustomerEnter = require('../models').CustomerEnter;

const sequelize = require("sequelize");
const Op = sequelize.Op;

router.route('/customerenter')
    .get(function (req, res) {

        let fitness_no = req.query.fitness_no;
        let customer_no = req.query.customer_no;
        let ukey = req.query.ukey;

        CustomerEnter.findAll({where: {fitness_no: fitness_no, customer_no: customer_no}})
        .then((customerEnter) => {
            if (customerEnter) {
                if (customerEnter.skey === ukey) {res.json({'message': true})}
                else {res.json({'message': false})}
            }
            else {{res.json({'message': false})}}

        })
        .catch((err) => {
            console.error(err);
            next(err);
        })
        
    })
    .post(function(req, res) {
        const NOT_CHECKED = 0;
        let b = req.body
        let type = req.query.type;
        let type2 = req.query.type2;

        if (type === "check") {
            if (type2 === "customer") {
                let k = ''
                for (var i=0;i<32;i++) {
                    k = k + Math.floor(Math.random());
                }
                CustomerEnter.create({
                    fitness_no: b.fitness_no,
                    customer_no: b.customer_no,
                    is_checked: NOT_CHECKED,
                    skey: k,
                })
                .then(() => {
                    res.send({message: 'ok', skey: k});
                })
                .catch((err) => {
                    console.error(err);
                });
            }
            else if (type2 === "manager") {
                CustomerEnter.create({
                    fitness_no: b.fitness_no,
                    customer_no: b.customer_no,
                    is_checked: NOT_CHECKED,
                    skey: b.skey,
                })
                .then(() => {
                    res.send({message: 'ok'});
                })
                .catch((err) => {
                    console.error(err);
                });
            }
        }

    })
    .put(function(req, res) {
        /*Exercise.update({ title: "바꿀거 ", contents: "바꿀 내용1", mood : "바꿀 내용2", verse: "바꿀 내용3", }, { where: { writer: '권소령', year:2021, month:1, date:28 } })
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
        /*Exercise.destroy({ where: { writer: "권소령", year:2021, month:1, date:14 } })
        .then((result) => {
        res.send('Delete the diary');
        })
        .catch((err) => {
        console.error(err);
        next(err);
        });*/
    });

module.exports = router;
