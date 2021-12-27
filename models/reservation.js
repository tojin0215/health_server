module.exports = (sequelize, DataTypes) => {
  return sequelize.define('reservation', {
    res_no: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATE, allowNull: false },
    time: { type: DataTypes.INTEGER, allowNull: false },
    exercise_name: { type: DataTypes.STRING(128), allowNull: false },
    customer_name: { type: DataTypes.STRING(64), allowNull: false },
    customer_id: { type: DataTypes.STRING(64), allowNull: true },
    isCancel: { type: DataTypes.STRING(256), allowNull: true },
    cancelComment: { type: DataTypes.STRING(256) },
  }, {
    timestamps: false
  });
}