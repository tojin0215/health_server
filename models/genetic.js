module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'genetic',
    {
      idg: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primatyKey: true,
        autoIncreament: true,
      },
      fitness_no: { type: DataTypes.INTEGER, allowNull: false },
      member_no: { type: DataTypes.INTEGER, allowNull: false }, // client idc
      measurementDate: { type: DataTypes.DATE, allowNull: false }, // 측정날짜, 입력한 날짜
      bmi: { type: DataTypes.INTEGER, allowNull: false }, //체질량지수
      cholesterol: { type: DataTypes.INTEGER, allowNull: false }, //콜레스테롤
      triglyceride: { type: DataTypes.INTEGER, allowNull: false }, //중성지방
      hypertension: { type: DataTypes.INTEGER, allowNull: false }, //혈압
      bloodsugar: { type: DataTypes.INTEGER, allowNull: false }, //혈당
      pigmentation: { type: DataTypes.INTEGER, allowNull: false }, //색소침착
      skinfold: { type: DataTypes.INTEGER, allowNull: false }, //피부노화
      dermis: { type: DataTypes.INTEGER, allowNull: false }, //피부탄력
      hairthick: { type: DataTypes.INTEGER, allowNull: false }, //모발굵기
      nohair: { type: DataTypes.INTEGER, allowNull: false }, //탈모
      vitaminc: { type: DataTypes.INTEGER, allowNull: false }, //비타민C
      caffeine: { type: DataTypes.INTEGER, allowNull: false }, //카페인대사
    },
    {
      timestamps: false,
    }
  );
};
