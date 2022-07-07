module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'manager',
    {
      id: { type: DataTypes.STRING(20), unique: true, allowNull: false },
      fitness_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      fitness_name: { type: DataTypes.STRING(20), allowNull: false },
      password: { type: DataTypes.STRING(200), allowNull: false },
      manager_name: { type: DataTypes.STRING(20), allowNull: false },
      business_number: { type: DataTypes.STRING(30), allowNull: true },
      business_phone: { type: DataTypes.STRING(32), allowNull: true },
      phone: { type: DataTypes.STRING(32), allowNull: true },
      salt: { type: DataTypes.STRING(40), allowNull: false },
      loginWhether: { type: DataTypes.INTEGER, allowNull: false },
      joinNo: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      timestamps: false,
    }
  );
};
