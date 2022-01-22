module.exports = (sequelize, DataTypes) => {
  return sequelize.define('reservationClass', {
    no: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    exercise_class: { type: DataTypes.STRING(128), allowNull: false },
    fitness_no: { type: DataTypes.INTEGER, allowNull: false },
    number_of_people: { type: DataTypes.STRING(45) },
    time: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    timestamps: false
  });
}