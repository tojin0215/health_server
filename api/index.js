const customer = require('./customer');
const sales = require('./sales');
const exercise = require('./exercise');
const assignexercise = require('./assignexercise');
const exerciselink = require('./exerciselink');
const exercisepack = require('./exercisepack');
const manager = require('./manager');
const inbody = require('./inbody');
const customerenter = require('./customerenter');
const mobile = require('./mobile');
const alerts = require('./alerts');
const reservation = require('./reservation');
const reservationClass = require('./reservationClass');
const profile = require('./profiles');
const trainer = require('./trainer');
const client = require('./client');
const introduce = require('./introduce');
const workout = require('./workout');
const workoutAlloted = require('./workoutAlloted');
const workoutStage = require('./workoutStage');

//api 파일 생성할 때 마다 index에도 함께 추가
let routers = {
  customer: customer,
  sales: sales,
  customerenter: customerenter,
  exercise: exercise,
  assignexercise: assignexercise,
  exerciselink: exerciselink,
  exercisepack: exercisepack,
  manager: manager,
  inbody: inbody,
  mobile: mobile,
  alerts: alerts,
  reservation: reservation,
  reservationClass: reservationClass,
  profile: profile,
  trainer: trainer,
  client: client,
  introduce: introduce,
  workout: workout,
  workoutAlloted: workoutAlloted,
  workoutStage: workoutStage,
};

module.exports = routers;
