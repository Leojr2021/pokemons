const express = require('express');
const router = express.Router();

const pokemonsController = require('../controllers/pokemons');

router.get('/', pokemonsController.getAll);
router.get('/:id', pokemonsController.getSingle);

router.post('/', pokemonsController.createPokemon);

router.put('/:id', pokemonsController.updatePokemon);

router.delete('/:id', pokemonsController.deletePokemon);
module.exports = router;