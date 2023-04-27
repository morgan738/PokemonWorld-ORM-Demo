const express = require('express')
const router = express.Router()
const { Pokemon, Trainer } = require('../db')

router.get("/", async (req, res) => {
    try {
      const data = await Trainer.findAll()
      res.send(data);
    
    } catch (error) {
      res.status(500).send(`Something went wrong: ${error}`);
    }
  });
  
  router.get('/:id', async (req, res, next) => {
    const { id } = req.params
  
    try {
        const data = await Trainer.findByPk(id)
        
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(`Something went wrong: ${error}`);
    }
    
  })
  
  
  router.put('/addPokemon', async (req, res, next) => {
    const { trainerId, pokemonId } = req.body
  
    
    try {
        const trainer = await Trainer.findByPk(trainerId)
        const pokemon = await Pokemon.findByPk(pokemonId)
        
        await trainer.addPokemon(pokemon)
        res.status(200).send(trainer)
    } catch (error) {
        res.status(500).send(`Something went wrong: ${error}`);
    }
    
  })
  
  
  router.delete('/:id', async (req, res, next) => {
    const { id } = req.params
  
    try {
        const data = await Trainer.destroy({
            where: {id: id}
        })
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(`Something went wrong: ${error}`);
    }
    
  })
  
  
module.exports = router  