module.exports = (sequelize, DataTypes) => {
    return sequelize.define('exercise', {
        exercise_no: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        fitness_no: {type: DataTypes.INTEGER, allowNull: false},
        name: {type: DataTypes.STRING(64)},
        part: {type: DataTypes.INTEGER},
        machine: {type: DataTypes.STRING(128)},
        url: {type: DataTypes.STRING(256)},
        default_data_type: {type: DataTypes.INTEGER, allowNull: false},
        default_data: {type: DataTypes.INTEGER, allowNull: false},
        default_rest_second:  {type: DataTypes.INTEGER},
        default_set_count:  {type: DataTypes.INTEGER, allowNull: false},
        is_default: {type: DataTypes.INTEGER},
    }, {
        timestamps: false,
    });
}
