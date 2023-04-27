const express = require('express')
const router = express.Router()
const { Pokemon, Trainer } = require('../db')
//console.log(router)

router.get("/", async (req, res) => {
    try {
  
      const data = await Pokemon.findAll()
      console.log(data)
      res.send(data);
    
    } catch (error) {
      res.status(500).send(`Something went wrong: ${error}`);
     
    }
  });

router.get('/ash', async (req, res, next) => {
  try {
      const data = await Pokemon.findAll({
          where:{
              trainerId: 2,
              elementType: 'Rock'

          },
          include:[{
              model:Trainer
          }]
      })
    
      res.status(200).send(data)
  } catch (error) {
      res.status(500).send(`Something went wrong: ${error}`);
  }

})

  router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    console.log(typeof id)
    console.log(req.params)

  
    try {
        const data = await Pokemon.findByPk(id)
        console.log(data)
        if(data.isFavorite){
          console.log("your favorite has been viewed!")
          res.status(200).send(data)
        }else{
          res.status(200).send(data)
        }
    } catch (error) {
        //res.status(500).send(`Something went wrong: ${error}`);
        next(error)
    }
    
  })


router.post('/', async (req,res,next) => {
    console.log(req.body)
    const {name, elementType} = req.body
    try {
      const newPokemon = Pokemon.create({name: name, elementType:elementType})
      res.send(newPokemon)
    } catch (error) {
      next(error)
    }
  })
  


router.put('/addTrainer', async (req, res, next) => {
    const { trainerId, pokemonId } = req.body
    console.log(res)
   
    console.log(Pokemon)
    try {
        const trainer = await Trainer.findByPk(trainerId)
        const pokemon = await Pokemon.findByPk(pokemonId)
        
        await pokemon.setTrainer(trainer)
        res.status(200).send(pokemon)
    } catch (error) {
        res.status(500).send(`Something went wrong: ${error}`);
    }
    
  })




  router.delete('/:id', async (req, res, next) => {
    const { id } = req.params
  
    try {
        const data = await Pokemon.destroy({
            where: {id: id}
        })
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(`Something went wrong: ${error}`);
    }
    
  })





module.exports = router