const Sequelize = require('sequelize')
const db = require('./db')

const Pokemon = db.define('pokemon', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    elementType: {
        type: Sequelize.STRING
    },
    isFavorite: {
        type: Sequelize.VIRTUAL,
        get(){
            return this.name == "Tyranitar"
        }
    }
    
})



Pokemon.beforeCreate(async (pokemon) => {
    // console.log("hook console.log --> ", pokemon)
    if(pokemon.elementType == "Normal"){
        throw new Error("No normal pokemon allowed!")
    }
})

module.exports = Pokemon

