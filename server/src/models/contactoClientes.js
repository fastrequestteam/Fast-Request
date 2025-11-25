const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Empresa = require('./Empresa')

const contactoClientes = sequelize.define('contacto_clientes', {
    NombreCliente: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    CorreoElectronico: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    mensaje:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    EstadoMensaje: {
        type: DataTypes.ENUM('visto', 'archivado', 'pendiente'),
        allowNull: false,
        defaultValue: 'pendiente'
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
    tableName: 'contacto_clientes',
    timestamps: true,

    scopes: {
        soloMensajesArchivados: {
            where: { EstadoMensaje: 'archivado' }
        },

        soloMensajesVistos: {
            where: { EstadoMensaje: 'visto' }
        },

        soloMensajesPendientes: {
            where: { EstadoMensaje: 'pendiente' }
        }
    }

});


Empresa.hasMany(contactoClientes, {
    foreignKey: 'EmpresaId',
    sourceKey: 'Id'
});

contactoClientes.belongsTo(Empresa, {
    foreignKey: 'EmpresaId',
    targetKey: 'Id'
});

module.exports = contactoClientes;