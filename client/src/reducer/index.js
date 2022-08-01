import { FILTER_BY_DIET, GET_RECIPES, GET_RECIPES_BY_NAME, FILTER_BY_HEALTHSCORE } from '../actions/types'

const initialState = {
    recipes: [],
    recipes2: []
}

function rootReducer(state = initialState, action) {
    switch(action.type){
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                recipes2: action.payload
            }
        case GET_RECIPES_BY_NAME:
            return {
                ...state,
                recipes: action.payload,
                recipes2: action.payload
            }
        case FILTER_BY_DIET:
            const allRecipes = state.recipes;
            const allRecipes2 = state.recipes2;
            // console.log("allRecipes2: ", allRecipes2);
            // const arrayDePrueba = allRecipes.filter(el => el.diets.find(element => element.name === action.payload))
            // console.log("arrayDePrueba: ", arrayDePrueba)
            // console.log("allRecipes: ", allRecipes);
            const dietsFiltered = action.payload === 'all' ? allRecipes2 : allRecipes.filter(el => el.diets.find(element => element.name === action.payload))
            // console.log("dietsFiltered: ", dietsFiltered);
            // console.log("action.payload: ", action.payload);
            return {
                ...state,
                recipes: dietsFiltered,
                recipes2: allRecipes
            }
        case FILTER_BY_HEALTHSCORE:
            const allRecipesSorted = state.recipes;
            const recipesFiltered = action.payload === 'min' ? allRecipesSorted.sort(function (a,b){
                if(a.healthScore > b.healthScore) return 1;
                if(a.healthScore < b.healthScore) return -1;
                return 0;
            }) : allRecipesSorted.sort(function (a,b){
                if(a.healthScore > b.healthScore) return -1;
                if(a.healthScore < b.healthScore) return 1;
                return 0;
            })
            // console.log('allRecipesSorted: ', allRecipesSorted);
            // console.log('recipesFiltered: ', recipesFiltered);
            return {
                ...state,
                recipes: recipesFiltered,
                recipes2: allRecipesSorted

            }
        default:
            return state;
      }
}

export default rootReducer