const express = require('express');
const router = express.Router();

const pokemonsController = require('../controllers/pokemons');
const validation = require('../middleware/validate');

router.get('/', pokemonsController.getAll);
router.get('/:id', pokemonsController.getSingle);

router.post('/', validation.savePokemon, pokemonsController.createPokemon);

router.put('/:id', validation.savePokemon, pokemonsController.updatePokemon);

router.delete('/:id', pokemonsController.deletePokemon);
module.exports = router;