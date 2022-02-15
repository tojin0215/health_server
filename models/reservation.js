module.exports = (sequelize, DataTypes) => {
  return sequelize.define('reservation', {
    res_no: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.STRING(128), allowNull: false },
    exercise_name: { type: DataTypes.STRING(128), allowNull: false },
    fitness_no: { type: DataTypes.INTEGER, allowNull: false },
    customer_name: { type: DataTypes.STRING(64), allowNull: false },
    customer_id: { type: DataTypes.STRING(64), allowNull: true },
    isCancel: { type: DataTypes.STRING(256), allowNull: true },
    cancelComment: { type: DataTypes.STRING(256) },
    number_of_people: { type: DataTypes.STRING(45), allowNull: true },
    time: { type: DataTypes.STRING(45), allowNull: false },
    trainer: { type: DataTypes.STRING(128), allowNull: false },
    profile_id: { type: DataTypes.INTEGER, allowNull: true },
  }, {
    timestamps: false
  });
}