const { json } = require("body-parser");
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Pokemons']
  // const result = await mongodb.getDatabase().db().collection("pokedex").find();
  // result.toArray().then((pokedex)=>{
  //     res.setHeader('Content-Type', 'application/json');
  //     res.status(200).json(pokedex);
  // });
  // result.toArray((err, pokedex) => {
  //   if (err) {
  //     res.status(400).json({ message: err });
  //   }
  //   res.setHeader("Content-Type", "application/json");
  //   res.status(200).json(pokedex);
  // });

  try {
    const result = await mongodb.getDatabase().db().collection("pokedex").find();

    // Convert the result to an array
    const pokedex = await result.toArray();

    // Set the response header to indicate JSON content
    res.setHeader('Content-Type', 'application/json');
    
    // Send the response with the retrieved pokedex array
    res.status(200).json(pokedex);
  } catch (error) {
    // Handle errors by sending a 500 Internal Server Error response
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// const getSingle = async (req, res) => {
//   //#swagger.tags=['Pokemons']
//   if (!ObjectId.isValid(req.params.id)) {
//     res.status(400).json("Must use a valid pokemon ID.");
//   }
//   const pokemonId = new ObjectId(req.params.id);
//   const result = await mongodb
//     .getDatabase()
//     .db()
//     .collection("pokedex")
//     .find({ _id: pokemonId });
//   // result.toArray().then((pokedex)=>{
//   //     res.setHeader('Content-Type', 'application/json');
//   //     res.status(200).json(pokedex[0]);
//   // });
//   result.toArray((err, pokedex) => {
//     if (err) {
//       res.status(400).json({ message: err });
//     }
//     res.setHeader("Content-Type", "application/json");
//     res.status(200).json(pokedex[0]);
//   });
// };

const getSingle = async (req, res) => {
  //#swagger.tags=['Pokemons']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid pokemon ID.");
    return;
  }

  const pokemonId = new ObjectId(req.params.id);

  try {
    const result = await mongodb.getDatabase().db().collection("pokedex").find({ _id: pokemonId });

    // Convert the result to an array
    const pokedex = await result.toArray();

    if (pokedex.length === 0) {
      // If no matching Pokemon found, send a 404 Not Found response
      res.status(404).json({ message: "Pokemon not found" });
      return;
    }

    // Set the response header to indicate JSON content
    res.setHeader("Content-Type", "application/json");
    
    // Send the response with the retrieved Pokemon
    res.status(200).json(pokedex[0]);
  } catch (error) {
    // Handle errors by sending a 500 Internal Server Error response
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const createPokemon = async (req, res) => {
  //#swagger.tags=['Pokemons']
  const pokemon = {
    name: req.body.name,
    type: req.body.type,
    HP: req.body.HP,
    Attack: req.body.Attack,
    Defense: req.body.Defense,
    speed: req.body.speed,
    image: req.body.image,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("pokedex")
    .insertOne(pokemon);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while creating the pokemon");
  }
};

const updatePokemon = async (req, res) => {
  //#swagger.tags=['Pokemons']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid pokemon ID.");
  }
  const pokemonId = new ObjectId(req.params.id);
  const pokemon = {
    name: req.body.name,
    type: req.body.type,
    HP: req.body.HP,
    Attack: req.body.Attack,
    Defense: req.body.Defense,
    speed: req.body.speed,
    image: req.body.image,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("pokedex")
    .replaceOne({ _id: pokemonId }, pokemon);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the pokemon");
  }
};

const deletePokemon = async (req, res) => {
  //#swagger.tags=['Pokemons']
  const pokemonId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("pokedex")
    .deleteOne({ _id: pokemonId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while deleting the pokemon.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createPokemon,
  updatePokemon,
  deletePokemon,
};
