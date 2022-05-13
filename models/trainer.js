module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "trainer",
    {
      idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      phone: { type: DataTypes.STRING(40), allowNull: false },
      birth: { type: DataTypes.STRING(40), allowNull: false },
      ment: { type: DataTypes.STRING(400), allowNull: true },
      history: { type: DataTypes.STRING(400), allowNull: true },
      sex: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      timestamps: false,
    }
  );
};
