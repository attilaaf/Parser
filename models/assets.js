'use strict'

var ColoredCoinsDataTypes = require('./coloredCoinsDataTypes')

module.exports = function (sequelize, DataTypes) {
  var Assets = sequelize.define('assets', {
    assetId: {
      type: ColoredCoinsDataTypes.ASSETID,
      primaryKey: true
    },
    divisibility: {
      type: 'SMALLINT',
      allowNull: false
    },
    lockStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    aggregationPolicy: {
      type: DataTypes.ENUM('aggregatable', 'hybrid', 'dispersed'),
      allowNull: false
    }
  },
  {
    classMethods: {
      associate: function (models) {
        Assets.hasMany(models.assetsoutputs, { foreignKey: 'assetId', as: 'assetsoutputs', constraints: false })
        Assets.belongsToMany(models.transactions, { as: 'transactions', through: models.assetstransactions, foreignKey: 'assetId', otherKey: 'txid' })
        Assets.belongsToMany(models.assetsaddresses, { as: 'addresses', through: models.assetsaddresses, foreignKey: 'assetId', otherKey: 'address', constraints: false }) // constraints = false because not every asset is neseccarily held by an address
      }
    },
    timestamps: false
  })

  return Assets
}