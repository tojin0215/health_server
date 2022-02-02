module.exports = (sequelize, DataTypes) => {
    return sequelize.define('sales', {
        num: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        fitness_no: { type: DataTypes.INTEGER, allowNull: false },
        member_no: { type: DataTypes.INTEGER, allowNull: false },
        exerciseName: { type: DataTypes.STRING(32), allowNull: false },
        exercisePrice: { type: DataTypes.INTEGER, allowNull: false },
        //locker : {type:DataTypes.INTEGER},
        lockerPrice: { type: DataTypes.INTEGER },
        //sportswear : {type:DataTypes.INTEGER},
        sportswearPrice: { type: DataTypes.INTEGER },
        paymentTools: { type: DataTypes.STRING(32), allowNull: false },
        paymentDate: { type: DataTypes.DATE, allowNull: false },
        paidMembership: { type: DataTypes.INTEGER },
    }, {
        timestamps: false
    });
}
