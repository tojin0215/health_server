let express = require('express');
let router = express.Router();
var User = require('../models').User;
var Customer = require('../models').Customer;
var Manager = require('../models').Manager;

const sequelize = require("sequelize");
const Op = sequelize.Op;
const crypto = require('crypto');

const salt = "Bdp6N2q)y6ncNgUft!s!jAxmGHy2bG%S";

router.route('/mobile/signup')
.post(function(req, res) {
    const id = req.body.id;
    const pw = req.body.pw;
    const name = req.body.name;
    const tel = req.body.tel;
    const gym_code = req.body.gym_code;

    const regex_tel = /^(010)?[\s\-\.]?(\d{4})[\s\-\.]?(\d{4})$/

    if (!tel || !String(tel).match(regex_tel)) {
        res.status(400).json({
            "message": "잘못된 번호",
            "tel": tel
        })
        return
    }

    const parsed_tel = "010" + String(tel).match(regex_tel)[2] + String(tel).match(regex_tel)[3]
    const hashedPw = crypto.createHash("sha512").update(pw + salt).digest("hex");

    User.findAll({
        where: {
            id: id
        }
    })
    .then(users => {
        if (users.length !== 0) {
            res.status(400).json({"message": "사용자가 존재합니다."})
        } else {
            Customer.findAll({
                where: {
                    name: name,
                    phone: parsed_tel,
                }
            })
            .then(customers => {
                if (customers.length === 0) {
                    User.create({
                        id: id,
                        pw: hashedPw,
                        name: name,
                        tel: parsed_tel,
                        gym_code: (gym_code? parseInt(gym_code, 16) : null),
                    })
                    .then(() => res.json({"message":  "ok"}))
                    .catch(e => {
                        console.error(e);
                        res.status(400).json({
                            "message": "유저등록1 오류발생",
                            "error": `${e}`,
                        })
                    })
                } else {
                    const customer = customers[0]

                    User.create({
                        id: id,
                        pw: hashedPw,
                        name: name,
                        tel: parsed_tel,
                        gym_code: (gym_code? parseInt(gym_code, 16) : null),
                        customer_id: customer.member_no,
                    })
                    .then(() => res.json({"message":  "ok"}))
                    .catch(e => {
                        console.error(e);
                        res.status(400).json({
                            "message": "유저등록2 오류발생",
                            "error": `${e}`,
                        })
                    })
                }
            })
            .catch(e => {
                console.error(e);
                res.status(400).json({
                    "message": "유저찾기 오류발생",
                    "error": `${e}`,
                })
            })
        }
    })
    .catch(e => {
        console.error(e);
        res.status(400).json({
            "message": "오류발생",
            "error": `${e}`,
        })
    })
})
router.route("/mobile/login")
.post(function(req, res) {
    const id = req.body.id;
    const pw = req.body.pw;

    User.findAll({
        where: {
            id: id
        }
    })
    .then(users => {
        if (users.length === 0) {
            Customer.findAll({
                where: {
                    member_no: id,
                    phone: {
                        [Op.like]: "%" + pw 
                    }
                }
            })
            .then(customers => {
                if (customers.length === 0) {
                    res.status(404).json({"message": "사용자가 없습니다."})
                } else {
                    const customer = customers[0]
                    res.json({
                        "name": customer.name,
                        "tel": customer.phone,
                        "registried_gym_code": customer.fitness_no.toString(16),
                        "force_update": true
                    })
                }
            })
        } else {
            const user = users[0]
            const hashedPw = crypto.createHash("sha512").update(pw + salt).digest("hex");
            if (user.pw === hashedPw) {
                res.json({
                    "name": user.name,
                    "tel": user.tel,
                    "registried_gym_code": (user.gym_code? user.gym_code.toString(16): null),
                    "force_update": false
                })
            } else {
                res.status(403).json({"message": "비밀번호가 다릅니다."})
            }
        }
    })
    .catch(e => {
        console.error(e);
        res.status(400).json({
            "message": "로그인 오류발생",
            "error": `${e}`,
        })
    })
})

router.route("/mobile/doubleCheck")
.post(function(req, res) {
    const target = req.body.target;
    const value = req.body.value;

    if (target === "id") {
        User.findAll({
            where: {
                id: value
            }
        })
        .then(users => {
            if (users.length === 0) {
                res.json({"result": false, "data": {}})
            } else {
                res.json({"result": true, "data": {}})
            }
        })
        .catch(e => {
            console.error(e);
            res.status(400).json({"message": "오류발생", "error": String(e)});
        })
    } else if (target === "tel") {
        const tel = value;
        const regex_tel = /^(010)?[\s\-\.]?(\d{4})[\s\-\.]?(\d{4})$/
    
        if (!tel || !String(tel).match(regex_tel)) {
            res.status(400).json({
                "message": "잘못된 번호",
            })
            return
        }
    
        const parsed_tel = "010" + String(tel).match(regex_tel)[2] + String(tel).match(regex_tel)[3]

        Customer.findAll({
            where: {
                phone: {
                    [Op.like]: "%" + parsed_tel + "%" 
                }
            }
        })
        .then(customers => {
            if (customers.length === 0) {
                res.json({"result": false, "data": {}})
            } else {
                const customer = customers[0]
                Manager.findAll({
                    where: {
                        fitness_no: customer.fitness_no,
                    }
                })
                .then(managers => {
                    const manager = managers[0]
                    res.json({
                        "result": true,
                        "data": {
                            "gym": manager.fitness_name,
                        }
                    })
                })
                .catch(e => {
                    console.error(e);
                    res.status(400).json({
                        "message": "더블체크 사용자 찾기 오류발생",
                        "error": `${e}`,
                    })
                });
            }
        })
        .catch(e => {
            console.error(e);
            res.status(400).json({
                "message": "더블체크 사용자 검색오류발생",
                "error": `${e}`,
            })
        });
    } else res.status(400).json({"message": "target값이 올바르지 않습니다."})
})

router.route("/mobile/user")
.put(function(req, res) {
    const id = req.body.id;
    const pw = req.body.pw;
    const name = req.body.name;
    const tel = req.body.tel;
    const gym_code = req.body.gym_code;

    User.findAll({
        where: {
            id: id
        }
    })
    .then(users => {
        if (users.length === 0) {
            res.status(404).json({"message": "사용자 없음"})
        } else {
            const user = users[0]
            
            if (pw) {
                const hashedPw = crypto.createHash("sha512").update(pw + salt).digest("hex");
                user.pw = hashedPw
            }
            if (name) {
                user.name = name
            }
            if (tel) {
                
                const regex_tel = /^(010)?[\s\-\.]?(\d{4})[\s\-\.]?(\d{4})$/
            
                if (!tel || !String(tel).match(regex_tel)) {
                    res.status(400).json({
                        "message": "잘못된 번호",
                    })
                    return
                }
            
                const parsed_tel = "010" + String(tel).match(regex_tel)[2] + String(tel).match(regex_tel)[3]
                user.tel = parsed_tel
            }
            if (gym_code) {
                user.gym_code = parseInt(gym_code, 16)
                // if (user.customer_id) {
                //     Customer.findAll({
                //         where: {
                //             member_no: user.customer_id
                //         }
                //     })
                //     .then(customers => {
                //         customers[0].fitness_no = parseInt(gym_code, 16)
                //     })
                // } 
            }
            
            res.json({
                "id": user.id,
                "pw": pw,
                "name": user.name,
                "tel": user.tel,
                "gym_code": (user.gym_code? user.gym_code.toString(16): null),
            })
        }
    })
    .catch(e => {
        console.error(e);
        res.status(400).json({
            "message": "사용자 정보 수정 오류발생",
            "error": `${e}`,
        })
    })
})

module.exports = router;