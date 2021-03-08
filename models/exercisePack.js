module.exports = (sequelize, DataTypes) => {
    return sequelize.define('exercisePack', {
        exercise_pack_no: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        fitness_no: {type: DataTypes.INTEGER, allowNull: false},
        name: {type: DataTypes.STRING(64)},
        strength: {type: DataTypes.INTEGER, allowNull: false},
    }, {
        timestamps: false,
    });
}
