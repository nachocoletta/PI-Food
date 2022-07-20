const { default: axios } = require('axios');
const { Router } = require('express');
const { format } = require('morgan');
const { Op } = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// const { getAll, getRecipesFromDB } = require('../utils/getRecipes'); 

const { Recipe } = require('../db.js')
const { APIKEY } = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.get('/', (req, res) => {
//     res.send('Hola');
// });

router.get('/recipes', async (req, res) => {
    try {
        const { name } = req.query;
        // console.log(name);
        const api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true&number=100&query=${name}`)

        const formatData = api.data.results.map( (recipe) => {
            const obj = {
                name: recipe.title,
                summary: recipe.summary,
                healthScore: recipe.healthScore,
                image: recipe.image        
            }
            return obj;
        });

        const db = await Recipe.findAll({
            where: {
                name: { [Op.substring]: name }
            } 
        });
        
        const joinApiDB = [...formatData, ...db];
        return res.json(joinApiDB);
    }catch(error){
        console.log(error);
    }

    // if(name){
    //     var recipes = await getAll(name);
    //     // console.log(recipes.results.length)
    //     console.log(recipes.results);
    //     // if(recipes.length === 0){
    //     //     return res.send('No se encontraron recetas');
    //     // }
    //     return res.json(recipes.results);
    // }
    // else 
    //     return res.status(404).send(`No se encuentra el ingrediente indicado`)

})

router.get('/recipes/:idReceta', (req, res) => {
// findbyPK
})

router.get('/diets', async (req,res) => {

});

router.post('/recipes', (req, res) => { 
    res.send('Dado de alta');
})
module.exports = router;


// https://api.spoonacular.com/recipes/complexSearch?apiKey=d4b24429f44b4506a61c0e7213cb4cc4&addRecipeInformation=true&number=100
// GET https://api.spoonacular.com/recipes/complexSearch
// Para obtener mayor información sobre las recetas, como por ejemplo el tipo de dieta deben agregar 
// el flag &addRecipeInformation=true a este endpoint
// Para los tipos de dieta deben tener en cuenta las propiedades vegetarian, vegan, glutenFree 
// por un lado y también analizar las que se incluyan dentro de la propiedad diets
// GET https://api.spoonacular.com/recipes/{id}/information