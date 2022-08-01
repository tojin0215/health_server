module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'inbody',
    {
      num: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fitness_no: { type: DataTypes.INTEGER, allowNull: false },
      member_no: { type: DataTypes.INTEGER, allowNull: false }, // client idc
      inbody_no: { type: DataTypes.INTEGER, allowNull: false },
      height: { type: DataTypes.FLOAT, allowNull: false }, //키
      measurementDate: { type: DataTypes.DATE, allowNull: false }, // 측정날짜
      //체성분 분석
      bodyMoisture: { type: DataTypes.FLOAT, allowNull: false }, //체수분
      protein: { type: DataTypes.FLOAT, allowNull: false }, //단백질
      mineral: { type: DataTypes.FLOAT, allowNull: false }, //무기질
      bodyFat: { type: DataTypes.FLOAT, allowNull: false }, //체지방
      muscleMass: { type: DataTypes.FLOAT, allowNull: false }, //근육량
      bodyFatMass1: { type: DataTypes.FLOAT, allowNull: false }, //체지방량1
      weight: { type: DataTypes.FLOAT, allowNull: false }, //체중
      //골격근,지방
      skeletalMuscleMass: { type: DataTypes.FLOAT, allowNull: false }, //골격근량
      bodyFatMass2: { type: DataTypes.FLOAT, allowNull: false }, //체지방량2
      //비만진단
      BMI: { type: DataTypes.FLOAT, allowNull: false }, //BMI
      PercentBodyFat: { type: DataTypes.FLOAT, allowNull: false }, //체지방률
      //부위별 근육 발달(kg)
      // muscleLeftArm:{type:DataTypes.FLOAT, allowNull:false},//왼팔
      // muscleRightArm:{type:DataTypes.FLOAT, allowNull:false},//오른팔
      // muscleAbdomen:{type:DataTypes.FLOAT, allowNull:false},//복부
      // muscleLeftThigh:{type:DataTypes.FLOAT, allowNull:false},//왼허벅지
      // muscleRightThigh:{type:DataTypes.FLOAT, allowNull:false},//오른허벅지
      // //겉둘레(cm)
      // circumferenceChest:{type:DataTypes.FLOAT, allowNull:false},//가슴
      // circumferenceAbdomen:{type:DataTypes.FLOAT, allowNull:false},//복부
      // circumferenceRightArm:{type:DataTypes.FLOAT, allowNull:false},//오른팔
      // circumferenceLeftArm:{type:DataTypes.FLOAT, allowNull:false},//왼팔
      // circumferenceRightThigh:{type:DataTypes.FLOAT, allowNull:false},//오른허벅지
      // circumferencLeftThigh:{type:DataTypes.FLOAT, allowNull:false},//왼허벅지
      // circumferenceNeck:{type:DataTypes.FLOAT, allowNull:false},//목
      // circumferenceHip:{type:DataTypes.FLOAT, allowNull:false},//엉덩이
      // //신체균형
      // upperBodyBalance:{type:DataTypes.INTEGER, allowNull:false},//상체균형
      // lowerBodyBalance:{type:DataTypes.INTEGER, allowNull:false},//하체균형
      // verticalBalance:{type:DataTypes.INTEGER, allowNull:false},//상하균형
      // //부위별 체지방(kg)
      // bodyFatLeftArm:{type:DataTypes.FLOAT, allowNull:false},//왼팔
      // bodyFatRightArm:{type:DataTypes.FLOAT, allowNull:false},//오른팔
      // bodyFatAbdomen:{type:DataTypes.FLOAT, allowNull:false},//복부
      // bodyFatLeftThigh:{type:DataTypes.FLOAT, allowNull:false},//왼허벅지
      // bodyFatRightThigh:{type:DataTypes.FLOAT, allowNull:false},//오른허벅지
      // //??
      // visceralFat:{type:DataTypes.FLOAT, allowNull:false},//내장지방
      // PercentAbdominalFat:{type:DataTypes.FLOAT, allowNull:false},//복부지방률
      // PhysicalDevelopmentScore:{type:DataTypes.FLOAT, allowNull:false},//신체발달점수
      // restingMetabolicRate:{type:DataTypes.FLOAT, allowNull:false},//기초대사량
      // //평가
      // //edemaEvaluation:{type:DataTypes.INTEGER, allowNull:false},//부종평가
      // BMIEvaluation:{type:DataTypes.INTEGER, allowNull:false},//BMI평가
      // bodyFatPercentageEvaluation:{type:DataTypes.INTEGER, allowNull:false},//체지방률평가
      // weightControl:{type:DataTypes.FLOAT, allowNull:false},//체중조절
      // fatControl:{type:DataTypes.FLOAT, allowNull:false},//지방조절
      // muscleControl:{type:DataTypes.FLOAT, allowNull:false},//근육조절
    },
    {
      timestamps: false,
    }
  );
};
