const express = require('express')
const app = express()
const port = 3000

const routers = require('./api/api')
var sequelize = require('./models').sequelize; // sequelize require

sequelize.sync(); 

var cors = require('cors')
var bodyParser = require('body-parser')

//도메인에게 XHR 요청 설정, 모든 api에 cors 허용함
app.use(cors())

//POST body 등을 편리하게 추출하기 위함
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))

//api routes
app.use(routers.user);
//app.use(routers.bible);
//app.use(routers.quotation);

app.listen(port, () => console.log(`API Server listening on port ${port}`))


process.on('uncaughtException', (err) => {
    console.error("Server uncaughtException : Catch");
    console.error(err);
    process.exit(1);
});
