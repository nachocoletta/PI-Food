import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipeDetail } from '../actions/index.js'
import { useEffect } from "react";
import { useParams } from "react-router";
import './Detail.css'

export default function Detail(props){
    // console.log("Props", props)
    // const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipeDetail(props.match.match.params.id))
    },[dispatch]);

    const recipe = useSelector((state) => state.detail);
    console.log("Recipe", recipe)
    // console.log("Recipe steps: ", recipe.steps)
    return (
        <div className="detailContainer">
                <div>
                    <h1>{recipe.name}</h1>
                    <img src={recipe.img? recipe.img : recipe.image} alt=""/>
                    <h2>Summary</h2>
                    <p>{recipe.summary}</p>
                    <h2>HealthScore: {recipe.healthScore}</h2>
                </div> 
                
                <div>
                    <Link to = '/home'>
                        <button>Volver</button>
                    </Link>
                </div>
        </div>
    )
}