import { GET_RECIPES, GET_RECIPES_BY_NAME } from '../actions/types'

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
                recipes: action.payload
            }
        default:
            return state;
      }
}

export default rootReducer