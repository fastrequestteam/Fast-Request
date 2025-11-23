const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Empresa = require('./Empresa')

const Gaseosas = sequelize.define('Gaseosas', {

    nombreGaseosa: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    estadoGaseosa: {
        type: DataTypes.ENUM('activo', 'inactivo'),
        allowNull: false,
        defaultValue: 'activo'
    },
    precioGaseosa:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    EmpresaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'empresas',
            key: 'Id'
        }
    },
    Imagen: {
        type: DataTypes.STRING(500),
        allowNull: true
    }


}, {
    tableName: 'gaseosas',
    timestamps: true,


    defaultScope: {
        where: {
            estadoGaseosa: 'activo'
        }
    },

    scopes: {
        gaseosasInactivas: {
            where: {

            }
        },
        soloGaseosasInactivas: {
            where: {
                estadoGaseosa: 'inactivo'
            }
        }
    }

})


Empresa.hasMany(Gaseosas, {
    foreignKey: 'EmpresaId',
    sourceKey: 'Id'
});

Gaseosas.belongsTo(Empresa, {
    foreignKey: 'EmpresaId',
    targetKey: 'Id'
});


module.exports = Gaseosas