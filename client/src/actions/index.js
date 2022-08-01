 import axios from 'axios';
 import { GET_RECIPES, GET_RECIPES_BY_NAME, FILTER_BY_DIET, FILTER_BY_HEALTHSCORE} from './types.js'


 export function getRecipes(){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/recipes')
            // .then(response => { console.log("Response: ", response)})
            .catch(error => {console.log("Error: ", error)})
            return dispatch({
                type: GET_RECIPES,
                payload: json.data
            })
        }
        catch(err){
            // console.log(err)
            return dispatch({
                type: GET_RECIPES,
                payload: [{error: "ERROR"}] })
        }
    } 
 }

 export function getRecipesByName(name){
    return async function(dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            // .then(response => { console.log("Response: ", response)})
            .catch(error => {console.log("Error: ", error)})
            return dispatch({
                type: GET_RECIPES_BY_NAME,
                payload: json.data
            })
        }catch(error)
        {
            // console.log("entro por el error")
            return dispatch({
                type: GET_RECIPES_BY_NAME,
                payload: [{error: "ERROR"}] 
            })
        }   
    }
 }

 export function filterRecipesByDiet(payload){
    // console.log(payload)
    return {
        type: FILTER_BY_DIET,
        payload
    }
 }

 export function filterRecipeByHealtScore(payload){
    // console.log(payload);
    return {
        type: FILTER_BY_HEALTHSCORE,
        payload
    }
 }
