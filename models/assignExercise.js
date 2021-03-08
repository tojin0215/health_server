module.exports = (sequelize, DataTypes) => {
    return sequelize.define('assignExercise', {
        assign_exercise_no: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        member_no: {type: DataTypes.INTEGER, allowNull: false},
        exercise_pack_no: {type: DataTypes.INTEGER, allowNull: false},
    }, {
        timestamps: true,
    });
}
