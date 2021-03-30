let express = require('express');
let router = express.Router();
var Customer = require('../models').Customer;

const sequelize = require("sequelize");
const Op = sequelize.Op;

router.route('/customer')
    .get(function(req, res) {
        let type = req.query.type;

        if(type === "all"){ // 전체 리스트
            Customer.findAll({
                where: { 
                    fitness_no: req.query.fn
                } 
            })
                .then((customers) => {
                    res.json(customers);
                })
                .catch((err) => {
                    console.error(err);
                    next(err);
                });
        }
        else if(type === "search0"){ //이름검색
            Customer.findAll({
                where: { 
                    fitness_no: req.query.fn,
                    name: {
                        [Op.like]: "%" + req.query.search + "%" 
                    }
                } 
            })
            .then((customers) => {
                res.json(customers);
            })
            .catch((err) => {
                console.error(err);
                next(err);
            });
        }
        else if(type === "search1"){ //폰검색
            Customer.findAll({
                where: { 
                    fitness_no: req.query.fn,
                    phone: {
                        [Op.like]: "%" + req.query.search + "%" 
                    }
                } 
            })
            .then((customers) => {
                res.json(customers);
            })
            .catch((err) => {
                console.error(err);
                next(err);
            });
        }
        else if(type === "search2"){ //담당자검색
            Customer.findAll({
                where: { 
                    fitness_no: req.query.fn,
                    in_charge: {
                        [Op.like]: "%" + req.query.search + "%" 
                    }
                } 
            })
            .then((customers) => {
                res.json(customers);
            })
            .catch((err) => {
                console.error(err);
                next(err);
            });
        }else if(type === "search3"){ //주민번호검색
            Customer.findAll({
                where: { 
                    fitness_no: req.query.fn,
                    resi_no: {
                        [Op.like]: "%" + req.query.search + "%" 
                    }
                } 
            })
            .then((customers) => {
                res.json(customers);
            })
            .catch((err) => {
                console.error(err);
                next(err);
            });
        }
    })
    .post(function(req, res) {
        // 쓰기
        Customer.create({
            //member_no : 0,
            fitness_no: req.body.fitness_no,
            name: req.body.name,
            sex:  req.body.sex, 
            start_date: req.body.start_date,
            period: req.body.period,
            phone: req.body.phone,
            solar_or_lunar: req.body.solar_or_lunar,
            address: req.body.address,
            join_route: req.body.join_route,
            //uncollected: req.body.uncollected,
            in_charge: req.body.in_charge,
            note: req.body.note,
            resi_no:req.body.resi_no
        }).then(() => {
            //res.send({'success':'member update!'});
            Customer.findAll({
                where:{
                    fitness_no: req.body.fitness_no,
                    start_date: req.body.start_date,
                }
            })
            .then((customers) => {
                res.json(customers);
            })
            .catch((err) => {
                console.error(err);
                next(err);
            });
            res.send(customers);
        })
        .catch((err) => {
            console.error(err);
        });
    })
    .put(function(req, res) {
        // 수정
        /*User.update({ title: "바꿀거 ", contents: "바꿀 내용1", mood : "바꿀 내용2", verse: "바꿀 내용3", }, { where: { writer: '권소령', year:2021, month:1, date:28 } })
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
        /*User.destroy({ where: { writer: "권소령", year:2021, month:1, date:14 } })
        .then((result) => {
        res.send('Delete the diary');
        })
        .catch((err) => {
        console.error(err);
        next(err);
        });*/
    });

router.route('/customersearch')
    .post(function(req, res) {
        // 쓰기
        Customer.findAll({
            where: { 
                name: {
                    [Op.like]: "%" + req.body.name + "%" 
                }
            } 

        })
            .then((customers) => {
                res.json(customers);
            })
            .catch((err) => {
                console.error(err);
                next(err);
            });
    })

module.exports = router;
