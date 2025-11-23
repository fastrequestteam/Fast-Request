const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Empresa = require('./Empresa')

const TextosEditables = sequelize.define('textos_editables', {
    campo: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    valor: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    EmpresaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'empresas',
            key: 'Id'
        }
    },
}, {
    tableName: 'textos_editables',
    timestamps: true,

});


 Empresa.hasMany(TextosEditables, {
    foreignKey: 'EmpresaId',
    sourceKey: 'Id'
});

TextosEditables.belongsTo(Empresa, {
    foreignKey: 'EmpresaId',
    targetKey: 'Id'
}); 


module.exports = TextosEditables;