const routes = require('express').Router();



routes.use('/', require('./swagger'));
// routes.get('/', (req,res)=>{
//     //#swagger.tag=['Hello World']
//     res.send('Hello World');
// });

routes.use('/pokemons', require('./pokemons'))

module.exports = routes;