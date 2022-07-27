const Sequelize = require('sequelize')
const db = require('../db/connect')

const Products = db.define('product', {
    name : {
        type : Sequelize.STRING,
        allowNull: false
    },

    price : {
        type : Sequelize.STRING,
        allowNull : false
    },

    image : {
        type : Sequelize.STRING,
        allowNull : false
    }

})


module.exports = Products