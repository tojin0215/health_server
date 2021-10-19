module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        idx :{ type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        id: { type: DataTypes.STRING(50), allowNull: false },
        pw : {type:DataTypes.STRING(128), allowNull:false},
        name: {type:DataTypes.STRING(128), allowNull:false},
        tel: {type:DataTypes.STRING(128), allowNull:false},
        gym_code: {type:DataTypes.STRING(128), allowNull:false},
        customer_id: { type: DataTypes.INTEGER, allowNull: true },
    },{
      timestamps:false
    });
}