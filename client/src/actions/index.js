 import axios from 'axios';
 import { GET_DIETS, GET_RECIPES, GET_RECIPES_BY_NAME,GET_RECIPES_BY_ID, FILTER_BY_DIET, FILTER_BY_HEALTHSCORE, FILTER_BY_RECIPENAME} from './types.js'


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

 export function getDiets() {
    return async function (dispatch){
        try{
            var json = await axios.get('http://localhost:3001/diets')
            // .then(response => { console.log("Response: ", response)})
            .catch(error => {console.log("Error: ", error)})
            return dispatch({
                type: GET_DIETS,
                payload: json.data
            })
        }catch (error){
            return dispatch({
                type: GET_DIETS,
                payload: [{error: "ERROR"}] })
        }
    }
 }

 export function postRecipe(payload) {
    
    return async function(dispatch){
        try {
            var json = axios.post('http://localhost:3001/recipes',payload)
            .catch(error => {console.log("Error: ", error)})
         //   console.log(json)
            return json;

        }catch(error){
            console.log(error)
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

 export function getRecipeDetail(id){
    return async function(dispatch){
        try {
            // console.log("entro aca") 
            var json = await axios.get(`http://localhost:3001/recipes/${id}`)
            .catch(error => {console.log("Error: ", error)})
            // console.log("Json. data: ", json.data)
            return dispatch({
                type: GET_RECIPES_BY_ID,
                payload: json.data
            })
        }catch(error){
            console.log(error)
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

 export function filterRecipeByName(payload){

    return {
        type: FILTER_BY_RECIPENAME,
        payload
    }
 }