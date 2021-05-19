let express = require('express');
let router = express.Router();
const CustomerEnter = require('../models').CustomerEnter;
const Customer = require('../models').Customer;
const Manager = require('../models').Manager;

const sequelize = require("sequelize");
const Op = sequelize.Op;

const jwt = require('jsonwebtoken');

const NOT_CHECKED = 0;
const TYPE_CUSTOMER = 'customer';
const TYPE_MANAGER = 'manager';
const JWT_SECRET_KEY = 'test';

router.route('/customerenter')
    .get(function (req, res) {

        // let fitness_no = req.query.fitness_no;
        // let customer_no = req.query.customer_no;
        // let ukey = req.query.ukey;

        const token = req.query.token;

        if (!token) res.json({code: 404, message: '토큰이 없습니다.'})
        try {
            const decoded = jwt.verify(token, JWT_SECRET_KEY);
            
            CustomerEnter.create({
                fitness_no: decoded._fit_no,
                customer_no: decoded._id,
                is_checked: NOT_CHECKED,
                skey: decoded._type,
            })
            .then(() => {
                if (decoded._type === TYPE_CUSTOMER) {
                    Customer
                    .findAll({
                        where: {fitness_no: decoded._fit_no, member_no: decoded._id}})
                    .then(function (result) {
                        if (result.length === 0) {
                            res.json({code: 403, message: '인증 실패'})
                        }
                        else {
                            res.json({code: 200, message: '인증되었습니다.', user: result[0]})
                        }
                    })
                }
                else if (decoded._type === TYPE_MANAGER) {
                    res.json({code: 200, message: '인증되었습니다.', user: result[0]});
                }
            })
            
        } catch (e) {
            console.error(e);
            res.json({code: 403, message: '인증 실패'})
        }
    })
    .post(function(req, res) {
        let b = req.body
        let type = req.query.type;
        let type2 = req.query.type2;

        if (type === "check") {
            if (type2 === "customer") {
                Customer
                .findAll({
                    where: {fitness_no: b.fitness_no, member_no: b.customer_no}})
                .then(function (result) {
                    if (result.length === 0) {
                        res.json({code: 404, message: '회원을 찾을 수 없습니다.'})
                    }
                    else {
                        const token = jwt.sign({
                            _id: b.customer_no,
                            _fit_no: b.fitness_no,
                            _type: TYPE_CUSTOMER,
                        }, JWT_SECRET_KEY)
                        res.send({message: 'ok', token: token});
                    }
                })
            }
            else if (type2 === "manager") {
                Manager
                .findAll({
                    where: {fitness_no: b.fitness_no, id: b.manager_no}})
                .then(function (result) {
                    if (result.length === 0) {
                        res.json({code: 404, message: '회원을 찾을 수 없습니다.'})
                    }
                    else {
                        const token = jwt.sign({
                            _id: b.manager_no,
                            _fit_no: b.fitness_no,
                            _type: TYPE_MANAGER,
                        }, JWT_SECRET_KEY)
                        res.send({message: 'ok', token: token});
                    }
                })
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
