const passport = require('passport');

const routes = require('express').Router();



routes.use('/', require('./swagger'));
// routes.get('/', (req,res)=>{
//     //#swagger.tag=['Hello World']
//     res.send('Hello World');
// });

routes.use('/pokemons', require('./pokemons'))

routes.get('/login',passport.authenticate('github'),(req,res)=>{});

routes.get('logout', function(req,res,next){
    req.logout(function(err){
        req.redirect('/');
    });
});



module.exports = routes;