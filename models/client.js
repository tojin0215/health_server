module.exports = (sequelize, DataTypes) => {
  return sequelize.define('client', {
    idc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fitness_no: { type: DataTypes.INTEGER, allowNull: false },
    fitness_name: { type: DataTypes.STRING(20), allowNull: false },
    client_name: { type: DataTypes.STRING(20), allowNull: false },
    phone: { type: DataTypes.STRING(40), allowNull: false },
    birth: { type: DataTypes.STRING(40), allowNull: false },
    sex: { type: DataTypes.INTEGER, allowNull: false },
    join_route: { type: DataTypes.STRING(30), allowNull: false },
    adress: { type: DataTypes.STRING(300), allowNull: false },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('NOW'),
    },
  });
};
