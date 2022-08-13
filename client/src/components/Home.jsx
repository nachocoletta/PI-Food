import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes, getRecipesByName, filterRecipesByDiet, filterRecipeByHealtScore, filterRecipeByName} from "../actions";
import { NavLink } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import './Home.css'

export default function Home(){


    const [recipe, setRecipe] = useState('');
    const [error, setError] = useState('');
    const [orden, setOrden] = useState('');
    
    const dispatch = useDispatch();
    
    const allRecipes = useSelector((state) => state.recipes) // mapStateToProps
    // console.log('ALL RECIPES ES... ', allRecipes)
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipe = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const paginado = (pageNumber) => { 
        setCurrentPage(pageNumber)
    }
    
    useEffect( () => {
        dispatch(getRecipes()); 
        setCurrentPage(1);
    }, [dispatch])
    // console.log("allRecipes: ", allRecipes);
    // return true;

    function handleClick(event){
        event.preventDefault(); // para que no recargue la pagina
        setCurrentPage(1);
        dispatch(getRecipes());
        setRecipe('');
       
    }

    // function searchRecipe(name){
    //     // console.log("Name: ", name);
    //     // alert("entro")
    //     setCurrentPage(1)
    //     dispatch(getRecipesByName(name));
    //     setRecipe('')
        
    // }

    function handleInput(e){
        
        if(!/^[A-Za-z\s]+$/.test(e.target.value)) {
            setError('La receta no puede contener caracteres especiales o numeros');
        }
        else {
            setError('');
            // searchRecipe(value);
        }
        // alert(e.target.value)
        setRecipe(e.target.value);
    }

    function handleSumbit(e){
        e.preventDefault();
        // console.log(e)
        setCurrentPage(1)
        dispatch(getRecipesByName(recipe))
        // alert('A name was submitted: ');

    }

    function handleFilterRecipe(e){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterRecipesByDiet(e.target.value))
    }

    function handleFilterRecipeByHealthScore(e){
        // console.log('e.target.value: ', e.target.value)
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterRecipeByHealtScore(e.target.value))
        setOrden(`Ordenado ${e.target.value}`)
        if(orden === 'asd')
            console.log(orden)
    }

    function handleFilterRecipeByName(e) {
        e.preventDefault();

        dispatch(filterRecipeByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }
    return (
        <div className="homeContainer">
            {/* <h1 className="mainTitle">FOODS</h1> */}
            <NavLink style={{textDecoration: "none", 
                             color: "green", 
                             fontFamily: "cursive", 
                             fontSize: "35px",
                             padding: "15px"}} to= '/recipes'>Crear receta</NavLink>
            <form onSubmit={handleSumbit}>
                <input type='text'  
                    //    value={recipe} 
                       className={error && 'danger'} 
                       placeholder="Buscar recetas..." 
                    //    onBlur={e => {searchRecipe(e.target.value)}}
                       onChange={handleInput}
                >
                </input>
                <button type="submit" >Enviar</button>
                <div>
                    <p>    {!error ? null : <span style={{color:"red"}}>{error}</span>} </p>
                </div>
            </form>
            <button style={{padding: "15px", margin: "20px"}}
                onClick={e => {handleClick(e)}}>
                    Recargar Recetas
            </button>
            <div>
                <select onChange={e => handleFilterRecipeByName(e)}>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                </select>
                <select onChange={e => handleFilterRecipe(e)}>
                    <option defaultValue={true} value ='all'>All Diets</option>
                    <option value='dairy free'>dairy free</option>
                    <option value='fodmap friendly'>fodmap friendly</option>
                    <option value='gluten free'>gluten free</option>
                    <option value='ketogenic'>ketogenic</option>
                    <option value='lacto ovo vegetarian'>lacto ovo vegetarian</option>
                    <option value='paleolithic'>paleolithic</option>
                    <option value='pescatarian'>pescatarian</option>
                    <option value='primal'>primal</option>
                    <option value='vegan'>vegan</option>
                    <option value='vegetarian'>vegetarian</option>
                    <option value='whole 30'>whole 30</option>
                    
                </select>
                <select onChange={e => handleFilterRecipeByHealthScore(e)}>
                    <option defaultValue={true} value={0}>Selecionar Health Score</option>
                    <option value='min'>Menos Saludable</option>
                    <option value='max'>Mas Saludable</option>
                </select>
            </div>
                <Paginado 
                          recipesPerPage={recipesPerPage}
                          allRecipes={allRecipes.length}
                          paginado={paginado}
                />
                {/* https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif */}
                
                <div className="cardsContainer">
                {
                     allRecipes.length === 0 ?  <img className="loading" style={{opacity: 0.7}} src="https://i.stack.imgur.com/hzk6C.gif" alt="imagen"/> 
                     : (
                        // <img src="https://i.stack.imgur.com/hzk6C.gif" alt="imagen"/>
                        // console.log(allRecipes.length)
                        currentRecipe.map(el => {
                            if(el.error){
                                return( <h2>No se encontraron recetas</h2> )
                            }
                            return(
                                <NavLink style={{textDecoration: "none"}} key={el.id} to={`/recipes/${el.id}`}>
                                        <Card
                                            id={el.id}
                                            
                                            name= {el.name} 
                                            image={el.image}
                                            diets={el.diets}
                                            healthScore={el.healthScore}
                                        />
                                </NavLink>
                                
                            )
                        } ) 
                     ) 
                    }
                </div>
                <Paginado recipesPerPage={recipesPerPage}
                          allRecipes={allRecipes.length}
                          paginado={paginado}
                />
              
            
        </div>

    )
        
    
}