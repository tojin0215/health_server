module.exports = (sequelize, DataTypes) => {
    return sequelize.define('customerEnter', {
        customer_enter_no: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        fitness_no: {type: DataTypes.INTEGER, allowNull: false},
        customer_no: {type: DataTypes.INTEGER, allowNull: false},
        skey: {type:DataTypes.STRING(64), allowNull:false},
        created: {type:DataTypes.DATE, defaultValue: DataTypes.NOW},
        is_checked: {type: DataTypes.INTEGER},
    }, {
        timestamps: false,
    });
}
