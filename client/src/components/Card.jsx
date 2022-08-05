import React from "react";
import './Card.css'



export default function Card({ name, image, diets, healthScore, id}){
    // console.log(steps[0] + " .....")
    // console.log(steps.length)
    // console.log(diets)
    return (
        <div className="card" key={id}>
            <div className="name">
            <h3>{name}</h3>
            </div>
            <img src={image} alt="imagen no encontrada" width="200px" height="250px" />
            <h2 className="centered">Diets</h2>
            <div className="diets">
                <ul>{diets.map(e => { return <li key={e.name}> {e.name} </li> })}
                </ul>
            </div>
            <h3 className="centered">Healthscore: {healthScore}</h3>
            
        </div>
    )
}