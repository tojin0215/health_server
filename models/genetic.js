module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'genetic',
    {
      idg: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      fitness_no: { type: DataTypes.INTEGER, allowNull: false },
      member_no: { type: DataTypes.INTEGER, allowNull: false }, // client idc
      measurementDate: { type: DataTypes.DATE, allowNull: false }, // 측정날짜, 입력한 날짜
      bmi1: { type: DataTypes.INTEGER, allowNull: false }, //체질량지수 위험
      bmi2: { type: DataTypes.INTEGER, allowNull: false }, //체질량지수 주의
      bmi3: { type: DataTypes.INTEGER, allowNull: false }, //체질량지수 양호
      cholesterol1: { type: DataTypes.INTEGER, allowNull: false }, //콜레스테롤 위험
      cholesterol2: { type: DataTypes.INTEGER, allowNull: false }, //콜레스테롤 주의
      cholesterol3: { type: DataTypes.INTEGER, allowNull: false }, //콜레스테롤 양호
      triglyceride1: { type: DataTypes.INTEGER, allowNull: false }, //중성지방 위험
      triglyceride2: { type: DataTypes.INTEGER, allowNull: false }, //중성지방 주의
      triglyceride3: { type: DataTypes.INTEGER, allowNull: false }, //중성지방 양호
      hypertension1: { type: DataTypes.INTEGER, allowNull: false }, //혈압 위험
      hypertension2: { type: DataTypes.INTEGER, allowNull: false }, //혈압 주의
      hypertension3: { type: DataTypes.INTEGER, allowNull: false }, //혈압 양호
      bloodsugar1: { type: DataTypes.INTEGER, allowNull: false }, //혈당 위험
      bloodsugar2: { type: DataTypes.INTEGER, allowNull: false }, //혈당 주의
      bloodsugar3: { type: DataTypes.INTEGER, allowNull: false }, //혈당 양호
      pigmentation1: { type: DataTypes.INTEGER, allowNull: false }, //색소침착 위험
      pigmentation2: { type: DataTypes.INTEGER, allowNull: false }, //색소침착 주의
      pigmentation3: { type: DataTypes.INTEGER, allowNull: false }, //색소침착 양호
      skinfold1: { type: DataTypes.INTEGER, allowNull: false }, //피부노화 위험
      skinfold2: { type: DataTypes.INTEGER, allowNull: false }, //피부노화 주의
      skinfold3: { type: DataTypes.INTEGER, allowNull: false }, //피부노화 양호
      dermis1: { type: DataTypes.INTEGER, allowNull: false }, //피부탄력 위험
      dermis2: { type: DataTypes.INTEGER, allowNull: false }, //피부탄력 주의
      dermis3: { type: DataTypes.INTEGER, allowNull: false }, //피부탄력 양호
      hairthick1: { type: DataTypes.INTEGER, allowNull: false }, //모발굵기 위험
      hairthick2: { type: DataTypes.INTEGER, allowNull: false }, //모발굵기 주의
      hairthick3: { type: DataTypes.INTEGER, allowNull: false }, //모발굵기 양호
      nohair1: { type: DataTypes.INTEGER, allowNull: false }, //탈모 위험
      nohair2: { type: DataTypes.INTEGER, allowNull: false }, //탈모 주의
      nohair3: { type: DataTypes.INTEGER, allowNull: false }, //탈모 양호
      vitaminc1: { type: DataTypes.INTEGER, allowNull: false }, //비타민C 위험
      vitaminc2: { type: DataTypes.INTEGER, allowNull: false }, //비타민C 주의
      vitaminc3: { type: DataTypes.INTEGER, allowNull: false }, //비타민C 양호
      caffeine1: { type: DataTypes.INTEGER, allowNull: false }, //카페인대사 위험
      caffeine2: { type: DataTypes.INTEGER, allowNull: false }, //카페인대사 주의
      caffeine3: { type: DataTypes.INTEGER, allowNull: false }, //카페인대사 양호
    },
    {
      timestamps: false,
    }
  );
};
