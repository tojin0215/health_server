module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'customer',
    {
      member_no: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fitness_no: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING(10), allowNull: false },
      sex: { type: DataTypes.BOOLEAN },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW'),
      },
      period: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      phone: { type: DataTypes.STRING(32), allowNull: false },
      solar_or_lunar: { type: DataTypes.BOOLEAN },
      address: { type: DataTypes.STRING(100) },
      join_route: { type: DataTypes.STRING(30) },
      //uncollected :{ type:DataTypes.INTEGER },
      in_charge: { type: DataTypes.STRING(10) },
      note: { type: DataTypes.STRING(100) },
      resi_no: { type: DataTypes.STRING(30) },
      remained_membership: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );
};
