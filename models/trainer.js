module.exports = (sequelize, DataTypes) => {
  return sequelize.define("trainer", {
    idx: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    phone: { type: DataTypes.STRING(200), allowNull: false },
    birth: { type: DataTypes.STRING(200), allowNull: false },
    fitness_no: { type: DataTypes.INTEGER, allowNull: false },
    fitness_name: { type: DataTypes.STRING(20), allowNull: false },
    trainer_name: { type: DataTypes.STRING(20), allowNull: false },
    ment: { type: DataTypes.STRING(200), allowNull: false },
    history: { type: DataTypes.STRING(200), allowNull: false },
    sex: { type: DataTypes.BOOLEAN },
  });
};
//아이디가 phone
//비밀번호가 birth
