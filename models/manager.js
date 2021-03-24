module.exports = (sequelize, DataTypes) => {
    return sequelize.define('manager', {
        id : { type: DataTypes.STRING(20), allowNull: false },
        fitness_no: { type: DataTypes.INTEGER, allowNull: false, primaryKey:true, autoIncrement:true},
        password : { type: DataTypes.STRING(20), allowNull: false},
        fitness_name:{ type: DataTypes.STRING(20), allowNull: false},
        manager_name:{ type: DataTypes.STRING(20), allowNull: false},
    },{
        timestamps:false
    });
}
