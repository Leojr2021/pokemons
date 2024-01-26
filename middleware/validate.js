const validator = require('../helpers/validate');

const savePokemon = (req, res, next) => {
  const validationRule = {
  
    pokemonname: 'required|string',
    type: 'required|string',
    HP: 'integer',
    Attack: 'integer',
    Defense: 'integer',
    speed: 'integer',
    image: 'required|string',
    pokedexNumber : 'integer'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  savePokemon
};
