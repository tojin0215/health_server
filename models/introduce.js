module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'introduce',
    {
      idi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primartKey: true,
        autoIncrement: true,
      },
      fitness_no: { type: DataTypes.INTEGER, allowNull: false },
      manager_name: { type: DataTypes.STRING(20), allowNull: false },
      picture: { type: DataTypes.STRING(100), allowNull: false },
      story: { type: DataTypes.STRING(200), allowNull: false },
    },
    {
      timestamps: false,
    }
  );
};
