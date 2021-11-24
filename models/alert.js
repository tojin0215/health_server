module.exports = (sequelize, DataTypes) => {
    return sequelize.define('alert', {
        alert_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        fitness_no: {type: DataTypes.INTEGER, allowNull: false},
        member_no: {type: DataTypes.INTEGER, allowNull: false},
        text: {type: DataTypes.STRING(64)},
        confirm: {type: DataTypes.INTEGER, allowNull: false},
    }, {
        timestamps: true,
    });
}