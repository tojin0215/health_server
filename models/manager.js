module.exports = (sequelize, DataTypes) => {
    return sequelize.define('manager', {
        id : { type: DataTypes.STRING, allowNull: false },
        fitness_no: { type: DataTypes.INTEGER, allowNull: false, primaryKey:true, autoIncrement:true},
        password : { type: DataTypes.STRING, allowNull: false},
    },{
        timestamps:false
    });
}
