module.exports = (sequelize, DataTypes) => {
    return sequelize.define('assignExercise', {
        assign_exercise_no: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        exercise_no: {type: DataTypes.INTEGER, allowNull: false},
        fitness_no: {type: DataTypes.INTEGER, allowNull: false},
        member_no: {type: DataTypes.INTEGER, allowNull: false},
        group_no: {type: DataTypes.INTEGER, allowNull: false},
        name: {type: DataTypes.STRING(64)},
        part: {type: DataTypes.INTEGER},
        machine: {type: DataTypes.STRING(128)},
        url: {type: DataTypes.STRING(256)},
        data_type: {type: DataTypes.INTEGER, allowNull: false},
        data: {type: DataTypes.INTEGER, allowNull: false},
        rest_second:  {type: DataTypes.INTEGER},
        set_count:  {type: DataTypes.INTEGER, allowNull: false},
        completed:  {type: DataTypes.INTEGER, allowNull: false, default: 0},
    }, {
        timestamps: true,
    });
}