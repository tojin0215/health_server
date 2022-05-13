const path = require("path");
const Sequelize = require("sequelize");
const fs = require("fs");

const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "..", "config", "config.json"))[
  env
];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.Customer = require("./customer")(sequelize, Sequelize); //회원
db.CustomerEnter = require("./customerEnter")(sequelize, Sequelize); //회원 입장
db.Exercise = require("./exercise")(sequelize, Sequelize); //운동
db.AssignExercise = require("./assignExercise")(sequelize, Sequelize); //운동 배정
db.ExerciseLink = require("./exerciseLink")(sequelize, Sequelize); //운동 링크
db.ExercisePack = require("./exercisePack")(sequelize, Sequelize); //운동 묶음
db.Sales = require("./sales")(sequelize, Sequelize); //매출
db.Manager = require("./manager")(sequelize, Sequelize); //매니저(로그인정보)
db.Inbody = require("./inbody")(sequelize, Sequelize); //인바디정보
db.User = require("./user")(sequelize, Sequelize); // 모바일 접속 사용자
db.Alert = require("./alert")(sequelize, Sequelize); // 안내창
db.Reservation = require("./reservation")(sequelize, Sequelize); // 예약
db.ReservationClass = require("./reservationClass")(sequelize, Sequelize); // 예약 운동
db.Profile = require("./profiles")(sequelize, Sequelize); // 프로필
db.Trainer = require("./trainer")(sequelize, Sequelize); // 강사

module.exports = db;
