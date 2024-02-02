const express = require('express');
const router = express.Router();

const pokemonsController = require('../controllers/pokemons');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', pokemonsController.getAll);
router.get('/:id', pokemonsController.getSingle);

router.post('/', isAuthenticated,validation.savePokemon, pokemonsController.createPokemon);

router.put('/:id', isAuthenticated,validation.savePokemon, pokemonsController.updatePokemon);

router.delete('/:id', isAuthenticated,pokemonsController.deletePokemon);
module.exports = router;