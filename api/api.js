const user = require('./user');
const sales = require('./sales');
const exercise = require('./exercise');
const exerciselink = require('./exerciselink');
const exercisepack = require('./exercisepack');
const manager = require('./manager');

//api 파일 생성할 때 마다 index에도 함께 추가
let routers = {
    user:user,
    sales:sales,
    exercise:exercise,
    exerciselink:exerciselink,
    exercisepack:exercisepack,
    manager:manager,
}

module.exports = routers;
