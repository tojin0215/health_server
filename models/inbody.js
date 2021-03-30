module.exports = (sequelize, DataTypes) => {
    return sequelize.define('inbody', {
    num :{
        type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        fitness_no : {type:DataTypes.INTEGER, allowNull:false},
        member_no:{type:DataTypes.INTEGER, allowNull:false}, // 성별, 나이, 이름은 customerDB와 연결
        height:{type:DataTypes.FLOAT, allowNull:false}, //키
        measurementDate:{type:DataTypes.DATE, allowNull:false}, // 측정날짜
        //체성분 분석
        bodyMoisture:{type:DataTypes.FLOAT, allowNull:false}, //체수분
        protein:{type:DataTypes.FLOAT, allowNull:false}, //단백질
        mineral:{type:DataTypes.FLOAT, allowNull:false}, //무기질
        bodyFat:{type:DataTypes.FLOAT, allowNull:false}, //체지방
        muscleMass:{type:DataTypes.FLOAT, allowNull:false}, //근육량
        bodyFatMass1:{type:DataTypes.FLOAT, allowNull:false}, //체지방량1
        weight:{type:DataTypes.FLOAT, allowNull:false}, //체중
        //골격근,지방
        skeletalMuscleMass:{type:DataTypes.FLOAT, allowNull:false}, //골격근량
        bodyFatMass2:{type:DataTypes.FLOAT, allowNull:false}, //체지방량2
        //비만진단
        BMI:{type:DataTypes.FLOAT, allowNull:false}, //BMI
        PercentBodyFat:{type:DataTypes.FLOAT, allowNull:false}, //체지방률
        //부위별 근육 발달

    },{
        timestamps:false
    });
}
