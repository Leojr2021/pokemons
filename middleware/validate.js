const validator = require('../helpers/validate');

const savePokemon = (req, res, next) => {
  const validationRule = {
  
    pokemonname: 'required|string',
    type: 'required|string',
    HP: 'required|string',
    Attack: 'string',
    Defense: 'string',
    speed: 'string',
    image: 'required|string',
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
