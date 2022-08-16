module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'voucher',
    {
      num: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      fitness_no: { type: DataTypes.INTEGER, allowNull: false },
      client_name: { type: DataTypes.STRING(20), allowNull: false },
      kind: { type: DataTypes.STRING(32), allowNull: false },
      //kind=Sales.exerciseName
      paymentDate: { type: DataTypes.DATE, allowNull: false },
      paidMembership: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: DataTypes.NULL,
      },
      salesStart_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NULL,
      },
      salesDays: {
        type: DataTypes.STRING(128),
        allowNull: false,
        defaultValue: DataTypes.NULL,
      },
    },
    {
      timestamps: false,
    }
  );
};
