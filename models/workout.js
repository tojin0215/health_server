module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'workout',
    {
      idw: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      fitness_no: { type: DataTypes.INTEGER, allowNull: false },
      workout: { type: DataTypes.STRING(128), allowNull: false },
      part: { type: DataTypes.INTEGER, allowNull: false },
      machine: { type: DataTypes.STRING(256), allowNull: false },
      default_set: { type: DataTypes.INTEGER, allowNull: false },
      //3세트
      default_count: { type: DataTypes.INTEGER, allowNull: false },
      //8회
      default_rest: { type: DataTypes.INTEGER, allowNull: false },
      //30초
      url: { type: DataTypes.STRING(256) },
    },
    {
      timestamps: false,
    }
  );
};
