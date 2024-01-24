const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req,res) =>{
    //#swagger.tags=['Pokemons']
    const result = await mongodb.getDatabase().db().collection('pokedex').find();
    result.toArray().then((pokedex)=>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pokedex);
    });
};

const getSingle = async(req,res) =>{
     //#swagger.tags=['Pokemons']
    const pokemonId= new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('pokedex').find({ _id:pokemonId});
    result.toArray().then((pokedex)=>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pokedex[0]);
    });
};

const createPokemon = async (req, res) =>{  
     //#swagger.tags=['Pokemons']
    const pokemon = {
        
        pokemonname: req.body.pokemonname,
        type: req.body.type,
        HP: req.body.HP
    };
    const response = await mongodb.getDatabase().db().collection('pokedex').insertOne(pokemon);
    if(response.acknowledged){
        res.status(204).send();

    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the pokemon');
    }

};

const updatePokemon = async (req,res) =>{
     //#swagger.tags=['Pokemons']
    const pokemonId = new ObjectId(req.params.id);
    const pokemon = {
        
        pokemonname: req.body.pokemonname,
        type : req.body.type,
        HP : req.body.HP
    };
    const response = await mongodb.getDatabase().db().collection('pokedex').replaceOne({_id:pokemonId},pokemon);
    if(response.modifiedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the pokemon')
    }
}

const deletePokemon = async(req,res) => {
     //#swagger.tags=['Pokemons']
    const pokemonId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('pokedex').deleteOne({_id:pokemonId});
    if(response.deletedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the pokemon.');
    }
};



module.exports ={
    getAll,
    getSingle,
    createPokemon,
    updatePokemon,
    deletePokemon
};