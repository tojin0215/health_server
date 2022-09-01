module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'workoutAlloted',
    {
      idwa: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      fitness_no: { type: DataTypes.INTEGER, allowNull: false },
      client_no: { type: DataTypes.INTEGER, allowNull: false },
      //idc
      workout: { type: DataTypes.STRING(128), allowNull: false },
      region: { type: DataTypes.STRING(128), allowNull: false },
      machine: { type: DataTypes.STRING(256), allowNull: false },
      default_set: { type: DataTypes.INTEGER, allowNull: false },
      default_count: { type: DataTypes.INTEGER, allowNull: false },
      default_rest: { type: DataTypes.INTEGER, allowNull: false },
      url: { type: DataTypes.STRING(256) },
      workoutA_date: { type: DataTypes.STRING(128), allowNull: false },
      completed: { type: DataTypes.INTEGER, allowNull: false, default: 0 },
    },
    {
      timestamps: false,
    }
  );
};
