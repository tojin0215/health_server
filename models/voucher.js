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
      //횟수제(전체횟수)
      paidMembership: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: DataTypes.NULL,
      },
      //횟수제(남은횟수;차감됨)
      paidMembership2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: DataTypes.NULL,
      },
      //기간제(기간시작일)
      salesStart_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NULL,
      },
      //기간제(기간일수)
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
