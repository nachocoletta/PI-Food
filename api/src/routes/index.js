const { default: axios } = require('axios');
const { Router } = require('express');
const { format } = require('morgan');
const { Op } = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// const { getAll, getRecipesFromDB } = require('../utils/getRecipes'); 

const { Recipe, Diet } = require('../db.js')
const { APIKEY } = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.get('/', (req, res) => {
//     res.send('Hola');
// });

const getApiInfo = async () => {
    let recipesArray = [];
    // const api = await axios.get(`   https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true&number=100`)
    const apiURL = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true&number=100`);
    const apiInfo = await apiURL.data.map( u => axios.get(u.url));

    // const apiInfo = await apiURL.data.map(r => {
    //     return {

    //     }
    // })
    let results = axios.all(apiInfo)
    .then( recipe => { recipe.map( r => {
        recipesArray.push({
            name: recipe.title,
                summary: recipe.summary, 
                healthScore: recipe.healthScore,
                image: recipe.image,
                id: recipe.id,
                steps: recipe.analyzedInstructions[0]?.steps.map(el => {
                    return {
                        number: el.number,
                        step: el.step
                    }
                }),
                diets: recipe.diets.map(r => r.diet)
        })
    })
    return recipesArray;
    })
    return results;
}

const getDbInfo = async () => {
    
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'], through: {attributes: []},
        }
    })
}

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dBInfo = await getDbInfo();
    const concatInfo = apiInfo.concat(dBInfo);

    return concatInfo;
}


router.get('/recipes', async (req, res) => {

    const { name } = req.query;
    const allRecipes = await getAllRecipes();
    
    if(name){
        let nameRecipes = allRecipes.filter(r => r.name.toLowerCase().includes(name.toLowerCase()));
        nameRecipes.length ? res.status(200).send(nameRecipes) : 
                                res.status(404).send('Receta no encontrada');
    }else 
    {
        res.status(200).send(allRecipes);
    }

    //     const formatData = await api.data.results.map( (recipe) => {
    //         const obj = {
    //             name: recipe.title,
    //             summary: recipe.summary, 
    //             healthScore: recipe.healthScore,
    //             image: recipe.image,
    //             id: recipe.id,
    //             steps: recipe.analyzedInstructions[0]?.steps.map(el => {
    //                 return {
    //                     number: el.number,
    //                     step: el.step
    //                 }
    //             }),
    //             diets: recipe.diets.map(r => r.diet)     
    //         }
            
    //         return obj;
    //     });

    //     const db = await Recipe.findAll({
    //         where: {
    //             name: { [Op.substring]: name }
    //         }   
    //     });
        
    //     const joinApiDB = [...formatData, ...db];

    //     if(joinApiDB.length === 0)
    //         return res.status(404).send("No se encontro receta alguna");
    //     return res.json(joinApiDB);
    // }catch(error){
    //     console.log(error);
    // }


})


// (imagen, nombre, tipo de plato y tipo de dieta)
// Resumen del plato
// Nivel de "comida saludable" (health score)
// Paso a paso
router.get('/recipes/:idReceta', async (req, res) => {

    const { idReceta } = req.params;
    
    // console.log("PARAMETROS ", idReceta);
    // https://api.spoonacular.com/recipes/{id}/information
    if(!idReceta) 
        return res.status(400).json({msg: "Id inexistente"});

 
    const api = await axios(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${APIKEY}`) ; 
    

    // console.log(api.data);
    // return true;
    const formatData = await api.data.results.map( (receta) => {
        const obj = {
            image: receta.image,
            name: receta.name,
            dishTypes: receta.dishTypes,
            diets: receta.diets.map(r => r.diet),
            summary: receta.summary,
            healthScore: receta.healthScore,
            steps: receta.analyzedInstructions[0]?.steps.map(el => {
                return {
                    number: el.number,
                    step: el.step
                }
            })    
        }
        return obj;
    });


        // const receta = await receta.findByPk(idReceta, {include: [{model: Diet}]});
    const recipeDB = await Recipe.findByPk(idReceta);
    // res.send(receta); 
    

    const joinApiDB = [...formatData, ...recipeDB];

    


    if(joinApiDB.length === 0)
        return res.status(404).send("No se encontro receta por Id buscada");
    return res.json(joinApiDB);

})




router.get('/diets',  (req,res) => {
    
    let dietsApi = [
        {name:'gluten free'}, 
        {name:'dairy free'}, 
        {name:'lacto ovo vegetarian'}, 
        {name:'vegan'}, 
        {name:'paleolithic'}, 
        {name:'primal'}, 
        {name:'whole 30'},
        {name:'pescatarian'},
        {name:'ketogenic'},
        {name:'fodmap friendly'},
        {name:'vegetarian'}
    ];


    // ...dietsApi[index].name
    for(let index in dietsApi){
        // console.log(dietsApi[index].name);
        Diet.findOrCreate(
            {
                where: {
                    name: dietsApi[index].name
                }
            }
        )
    }
        // console.log(`${index}: ${dietsApi[index].name}`)
    
    // await Diet.bulkCreate(dietsApi);  
    res.send('Dietas ingresadas a la base de datos');
    
});


router.post('/recipes', async (req, res) => { 

    const { name, summary, healthScore, puntuation , steps, image, diet } = req.body;

    // if(!name || !summary || !healthScore || !puntuation || !steps)
    //    return res.status(400).json({msg: 'Faltan datos'});
    
    try {
        const newRecipe = await Recipe.create({name, summary, healthScore, puntuation , steps, image})
        const newDiet = await Diet.findAll({
            where: {
                name: diet
            } 
        })
        // console.log("Prototipo: ", newRecipe.__proto__);
        newRecipe.addDiet(newDiet);
        res.send('Receta creada exitosamente');
    }catch(error){
        console.log(error);
    }
   
});



module.exports = router;


// https://api.spoonacular.com/recipes/complexSearch?apiKey=d4b24429f44b4506a61c0e7213cb4cc4&addRecipeInformation=true&number=100
// GET https://api.spoonacular.com/recipes/complexSearch
// Para obtener mayor información sobre las recetas, como por ejemplo el tipo de dieta deben agregar 
// el flag &addRecipeInformation=true a este endpoint
// Para los tipos de dieta deben tener en cuenta las propiedades vegetarian, vegan, glutenFree 
// por un lado y también analizar las que se incluyan dentro de la propiedad diets
// GET https://api.spoonacular.com/recipes/{id}/information