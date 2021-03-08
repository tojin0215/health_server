module.exports = (sequelize, DataTypes) => {
    return sequelize.define('exerciseLink', {
        exercise_link_no: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        exercise_no: {type: DataTypes.INTEGER, allowNull: false},
        exercise_pack_no: {type: DataTypes.INTEGER, allowNull: false},
        order_no: {type: DataTypes.INTEGER, allowNull: false},
        cnt: {type: DataTypes.INTEGER},
        sec: {type: DataTypes.INTEGER},
        rest: {type: DataTypes.INTEGER},
        setcnt: {type: DataTypes.INTEGER},
    }, {
        timestamps: false,
    });
}
