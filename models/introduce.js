module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'introduce',
    {
      idi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      fitness_no: { type: DataTypes.INTEGER, allowNull: false },
      post_title: { type: DataTypes.STRING(40), allowNull: false },
      manager_name: { type: DataTypes.STRING(20), allowNull: false },
      picture: { type: DataTypes.STRING(100), allowNull: true },
      story: { type: DataTypes.STRING(10000), allowNull: false },
    },
    {
      timestamps: false,
    }
  );
};
