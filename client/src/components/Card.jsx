import React from "react";



export default function Card({ name, image, diets}){
    // console.log(steps[0] + " .....")
    // console.log(steps.length)
    // console.log(diets)
    return (
        <>
            <h3>{name}</h3>
            <img src={image} alt="imagen no encontrada" width="200px" height="250px" />
            <h2>diets</h2>
            <ul>{diets.map(e => { return <li key={e.name}> {e.name} </li> })}
            </ul>

            
        </>
    )
}