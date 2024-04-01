const { DataTypes } = require('sequelize')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('sql10695813', 'sql10695813', 'hvNSZXiuxS', {
  host: 'sql10.freesqldatabase.com',
  port: 3306,
  dialect: 'mysql'
})

const Notas = sequelize.define('Notas', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  content: { type: DataTypes.STRING(50) },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  important: { type: DataTypes.BOOLEAN }
}, {
  freezeTableName: true,
  timestamps: false
})

sequelize.authenticate()
  .then(() => {
    console.log('Conectados')
  })
  .catch(error => {
    console.log('Erorr es: ' + error)
  })

module.exports = { sequelize, Notas }
