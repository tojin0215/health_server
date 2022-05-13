module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "manager",
    {
      id: { type: DataTypes.STRING(20), unique: true, allowNull: false },
      fitness_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      password: { type: DataTypes.STRING(200), allowNull: false },
      manager_name: { type: DataTypes.STRING(20), allowNull: false },
      buisiness_number: { type: DataTypes.STRING(30), allowNull: false },
      buisiness_phone: { type: DataTypes.STRING(32), allowNull: false },
      phone: { type: DataTypes.STRING(32), allowNull: false },
      permit: { type: DataTypes.INTEGER, allowNull: false },
      salt: { type: DataTypes.STRING(40), allowNull: false },
      agree: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      timestamps: false,
    }
  );
};
