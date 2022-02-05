let express = require('express');
let router = express.Router();
var User = require('../models').User;
var Customer = require('../models').Customer;
var Manager = require('../models').Manager;

const sequelize = require("sequelize");
const Op = sequelize.Op;
const crypto = require('crypto');
const { addAbortSignal } = require('stream');

const salt = "Bdp6N2q)y6ncNgUft!s!jAxmGHy2bG%S";
const regex_tel = /^(010)?[\s\-\.]?(\d{4})[\s\-\.]?(\d{4})$/

const sendError = (req, res, message = "") => {
    return e => {
        console.error(e);
        res.status(400).json({"message": message, "error": `${e}`});
    }
}
const parseTel = tel => "010" + String(tel).match(regex_tel)[2] + String(tel).match(regex_tel)[3]
const createCustomerDataByApp = user => {return {
    fitness_no: user.gym_code,
    name: user.name,
    sex: 0, 
    start_date: new Date(),
    period: 0,
    phone: user.tel,
    solar_or_lunar: 1,
    address: "",
    join_route: "앱",
    in_charge: "",
    note: "앱 등록",
    resi_no: "000000"
}}

router.route('/mobile/signup')
    .post(function (req, res) {
        const {id, pw, name, tel, gym_code} = req.body;
        // const id = req.body.id;
        // const pw = req.body.pw;
        // const name = req.body.name;
        // const tel = req.body.tel;
        // const gym_code = req.body.gym_code;


        if (!tel || !String(tel).match(regex_tel)) {
            res.status(400).json({
                "message": "잘못된 번호",
                "tel": tel
            })
            return
        }

        const parsed_tel = parseTel(tel);
        const hashedPw = crypto.createHash("sha512").update(pw + salt).digest("hex");
        const user_data = {
            id: id,
            pw: hashedPw,
            name: name,
            tel: parsed_tel,
            gym_code: (gym_code ? parseInt(gym_code, 16) : null),
        }

        User.findAll({
            where: {
                id: id
            }
        })
            .then(users => {
                if (users.length !== 0) {
                    res.status(400).json({ "message": "사용자가 존재합니다." })
                } else {
                    Customer.findAll({
                        where: {
                            name: name,
                            phone: parsed_tel,
                        }
                    })
                        .then(customers => {
                            if (customers.length === 0) {
                                User.create(user_data)
                                    .then(user => {
                                        if (user_data.gym_code !== null) {
                                            Customer.create(createCustomerDataByApp(user_data))
                                            .then(customer => {
                                                console.log(customer)
                                                user.customer_id = customer.member_no;
                                                user.save();
                                                res.json({ "message": "ok" })
                                            })
                                        }
                                        else {
                                            res.json({ "message": "ok" })
                                        }
                                    })
                                    .catch(sendError(req, res, "유저등록-1 오류 발생"))
                            } else {
                                const customer = customers[0]

                                User.create({
                                    ...user_data,
                                    customer_id: customer.member_no,
                                })
                                    .then(() => res.json({ "message": "ok" }))
                                    .catch(sendError(req, res, "유저등록-2 오류 발생"))
                            }
                        })
                        .catch(sendError(req, res, "유저찾기 오류 발생"))
                }
            })
            .catch(sendError(req, res, "오류 발생"))
    })

router.route("/mobile/login")
    .post(function (req, res) {
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
                                res.status(404).json({ "message": "사용자가 없습니다." })
                            } else {
                                const customer = customers[0]
                                res.json({
                                    "name": customer.name,
                                    "tel": customer.phone,
                                    "registried_gym_code": customer.fitness_no.toString(16),
                                    "force_update": true,
                                    "customer_id": customer.member_no
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
                            "registried_gym_code": (user.gym_code ? user.gym_code.toString(16) : null),
                            "force_update": false,
                            "customer_id": user.customer_id
                        })
                    } else {
                        res.status(403).json({ "message": "비밀번호가 다릅니다." })
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
    //manager get 가져옴
    .get(function (req, res) {
        let type = req.query.type;
        //123
        if (type === "session") {
            console.log("Session: ");

            if (req.session.loginInfo) {
                res.json({ info: req.session.loginInfo });
            }
            else {
                return res.status(401).json({
                    error: "THERE IS NO LOGIN DATA",
                    code: 1
                });
            }
        }
        else if (type === "all") { // 전체 리스트
            console.log('들어오니')
            Manager.findAll({
                where: {
                    fitness_no: {
                        [Op.gt]: 1
                    }
                }
            })
                .then((managers) => {
                    res.json(managers);
                })
                .catch((err) => {
                    console.error(err);
                    next(err);
                });
        }
        else if (type === "search0") { //헬스장이름검색
            Manager.findAll({
                where: {
                    fitness_no: {
                        [Op.gt]: 1
                    },
                    fitness_name: {
                        [Op.like]: "%" + req.query.search + "%"
                    }
                }
            })
                .then((managers) => {
                    res.json(managers);
                })
                .catch((err) => {
                    console.error(err);
                    next(err);
                });
        }
        else if (type === "search1") { //담당자이름
            Manager.findAll({
                where: {
                    fitness_no: {
                        [Op.gt]: 1
                    },
                    manager_name: {
                        [Op.like]: "%" + req.query.search + "%"
                    }
                }
            })
                .then((managers) => {
                    res.json(managers);
                })
                .catch((err) => {
                    console.error(err);
                    next(err);
                });
        }
        else if (type === "search2") { //아이디
            Manager.findAll({
                where: {
                    fitness_no: {
                        [Op.gt]: 1
                    },
                    id: {
                        [Op.like]: "%" + req.query.search + "%"
                    }
                }
            })
                .then((managers) => {
                    res.json(managers);
                })
                .catch((err) => {
                    console.error(err);
                    next(err);
                });
        }
        else if (type === "search3") { //전화번호
            Manager.findAll({
                where: {
                    fitness_no: {
                        [Op.gt]: 1
                    },
                    phone: {
                        [Op.like]: "%" + req.query.search + "%"
                    }
                }
            })
                .then((managers) => {
                    res.json(managers);
                })
                .catch((err) => {
                    console.error(err);
                    next(err);
                });
        }
    })
    //manager delete 가져옴
    .delete(function (req, res) {
        let type = req.query.type;

        if (type === "session") {
            req.session.destroy(err => { if (err) throw err; });
            return res.json({ sucess: true });
        }
        else if (type === "delete") {
            Manager.destroy({
                where: { fitness_no: req.query.fn }
            })
                .then((result) => {
                    res.send('Delete the fitnessCenter');
                })
                .catch((err) => {
                    console.error(err);
                    next(err);
                });
        }
    });

router.route("/mobile/doubleCheck")
    .post(function (req, res) {
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
                        res.json({ "result": false, "data": {} })
                    } else {
                        res.json({ "result": true, "data": {} })
                    }
                })
                .catch(e => {
                    console.error(e);
                    res.status(400).json({ "message": "오류발생", "error": String(e) });
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
                        res.json({ "result": false, "data": {} })
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
        } else res.status(400).json({ "message": "target값이 올바르지 않습니다." })
    })

router.route("/mobile/user")
.get(function(req, res) {
    const id = req.query.id;
    const pw = req.query.pw;
    User.findAll({
        where: {
            id: id
        }
    })
        .then(users => {
            if (users.length === 0) {
                res.status(404).json({ "message": "사용자 없음" })
            } else {
                const user = users[0]
                const hashedPw = crypto.createHash("sha512").update(pw + salt).digest("hex");
                    if (user.pw === hashedPw) {
                        res.json({
                            "name": user.name,
                            "tel": user.tel,
                            "registried_gym_code": (user.gym_code ? user.gym_code.toString(16) : null),
                            "force_update": false,
                            "customer_id": user.customer_id
                        })
                    } else {
                        res.status(403).json({ "message": "비밀번호가 다릅니다." })
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
    .put(function (req, res) {
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
                    res.status(404).json({ "message": "사용자 없음" })
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

                        if (user.customer_id) {
                            Customer.findAll({
                                where: {
                                    member_no: user.customer_id
                                }
                            })
                            .then(customers => {
                                customers[0].fitness_no = parseInt(gym_code, 16)
                                customers[0].save();
                            })
                        }
                        else {
                            Customer.findAll({
                                where: {
                                    phone: user.tel
                                }
                            })
                            .then(customers => {
                                if (customers.length > 0) {
                                    console.log(user);
                                    user.customer_id = customers[0].member_no;
                                    customers[0].fitness_no = parseInt(gym_code, 16)
                                    console.log(user);
                                    user.save();
                                    customers[0].save();
                                    console.log(user);
                                }
                                else {
                                    Customer.create({
                                        fitness_no: parseInt(gym_code, 16),
                                        name: user.name,
                                        sex: 0, 
                                        start_date: new Date(),
                                        period: 0,
                                        phone: user.tel,
                                        solar_or_lunar: 1,
                                        address: "",
                                        join_route: "앱",
                                        in_charge: "",
                                        note: "앱 등록",
                                        resi_no: "000000"
                                    }).then(() => {
                                        Customer.findAll({
                                            where: {
                                                phone: user.tel
                                            }
                                        })
                                        .then(customers => {
                                            if (customers.length > 0) {
                                                user.customer_id = customers[0].member_no;
                                                user.save();
                                            }
                                        })
                                    })
                                }
                            })
                        }
                    }
                    else if (gym_code === null) {
                        user.gym_code = null;

                        if (user.customer_id) {
                            Customer.findAll({
                                where: {
                                    member_no: user.customer_id
                                }
                            })
                            .then(customers => {
                                customers[0].fitness_no = -1
                                customers[0].save();
                            })
                        }
                    }

                    res.json({
                        "id": user.id,
                        "pw": pw,
                        "name": user.name,
                        "tel": user.tel,
                        "gym_code": (user.gym_code ? user.gym_code.toString(16) : null),
                        "customer_id": user.customer_id,
                    })

                    user.save();
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