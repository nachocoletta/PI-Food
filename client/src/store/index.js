import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from 'redux-thunk'
import rootReducer from "../reducer"


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// import { applyMiddleware, createStore } from 'redux'
// import thunk from 'redux-thunk'
// import reducer from '../reducer/index'
// import { composeWithDevTools } from 'redux-devtools-extension'

// const store = createStore(reducer, composeWithDevTools(
//   applyMiddleware(thunk)))

// export default store

