const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Empresa = sequelize.define('Empresa', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  NombreEmpresa: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  slug: {  
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  Estado: {
    type: DataTypes.ENUM('Activo', 'Inactivo'),
    defaultValue: 'Activo'
  },
  LogoEmpresa: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  SobreNosotros: {
    type: DataTypes.STRING(500), 
    allowNull: true
  }, 
  SliderImagenes: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  }
}, {
  tableName: 'empresas',
  timestamps: true
});

module.exports = Empresa;