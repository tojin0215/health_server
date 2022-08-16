module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'reservationClass',
    {
      no: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      exercise_class: { type: DataTypes.STRING(128), allowNull: false },
      fitness_no: { type: DataTypes.INTEGER, allowNull: false },
      number_of_people: { type: DataTypes.STRING(45) },
      hour: { type: DataTypes.INTEGER, allowNull: false },
      minute: { type: DataTypes.INTEGER, allowNull: false },
      trainer: { type: DataTypes.STRING(128), allowNull: false },
      class_date: { type: DataTypes.STRING(128), allowNull: false },
      kind: { type: DataTypes.STRING(32), allowNull: false },
      //kind=Sales.exerciseName
    },
    {
      timestamps: false,
    }
  );
};
