'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Atividade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Atividade.belongsTo(models.TipoAtividade);
      Atividade.belongsTo(models.Relatorio);
    }
  };
  Atividade.init({
    name: DataTypes.STRING,
    tipoatividade: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'atividades',
  });
  return Atividade;
};