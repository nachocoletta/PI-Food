import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";

export default function Home(){
    
    const dispatch = useDispatch();

    const allRecipes = useSelector((state) => state.recipes) // mapStateToProps

    useEffect( () => {
        dispatch(getRecipes()); 
    }, [dispatch])

    function handleClick(event){
        event.preventDefault(); // para que no recargue la pagina
        dispatch(getRecipes());
    }
    return (
        <div>
            <Link to= '/recipes'>Crear receta</Link>
            <h1>Titulo de la pagina</h1>
            <button onClick={e => {handleClick(e)}}>
                Volver a cargar todas las recetas
            </button>
            <div>
                <select>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
                <select>
                    {/* aca puedo hacer un map */}
                    <option value='vegan'>vegan</option>
                    <option value='paleolithic'>paleolithic</option>
                    <option value='pescatarian'>pescatarian</option>
                    <option value='dairy-free'>dairy free</option>
                    <option value='ketogenic'>ketogenic</option>
                    <option value='lacto-ovo-vegetarian'>lacto ovo vegetarian</option>
                    <option value='primal'>primal</option>
                    <option value='whole-30'>whole 30</option>
                    <option value='gluten-free'>gluten free</option>
                    <option value='vegetarian'>vegetarian</option>
                    <option value='fodmap-friendly'>fodmap friendly</option>
                    
                </select>
                <select>
                    <option></option>
                    <option></option>
                    <option></option>
                </select>
                {
                    allRecipes?.map(el => {
                        return(
                             
                                <Card
                                    key={el.id} 
                                    name={el.name} 
                                    image={el.image}
                                    diets={el.diets}
                                />
                            
                        )
                    } ) 
                       
                }
            </div>
        </div>

    )
        
    
}