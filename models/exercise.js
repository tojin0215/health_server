module.exports = (sequelize, DataTypes) => {
    return sequelize.define('exercise', {
        exercise_no: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        fitness_no: {type: DataTypes.INTEGER, allowNull: false},
        name: {type: DataTypes.STRING(64)},
        part: {type: DataTypes.INTEGER},
        machine: {type: DataTypes.STRING(128)},
        url: {type: DataTypes.STRING(256)},
    }, {
        timestamps: false,
    });
}
