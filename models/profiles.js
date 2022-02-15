module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user_profiles', {
        profile_id :{ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        profile_owner_id: { type: DataTypes.INTEGER, allowNull: true },
        profile_name : {type:DataTypes.STRING(50), allowNull:true},
        profile_phone: {type:DataTypes.STRING(50), allowNull:true},
        profile_age: {type:DataTypes.INTEGER, allowNull:true},
        profile_sex: {type:DataTypes.INTEGER, allowNull:true},
    }, {
      timestamps:false
    });
}