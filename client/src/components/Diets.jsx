import React from "react";
import './Diets.css'
import { useState } from 'react';
import { useSelector } from "react-redux";

export default function Diets({ name }) {
    // const allDiets2 = useSelector((state) => state.diets);

    //const [checkedState, setCheckedState] = useState(new Array(allDiets2.length).fill(true))
    // console.log("checkedState: ", checkedState)
    // console.log("allDiets en Diets: ", allDiets2)

    function handleChangeCheck(e){
        // e.preventDefault();


    }
    
    return (
        <div className="dietCheckbox">
            <span>{name}</span>
            <input 
                type="checkbox"
                name={name}
                value={name}
                // checked={false}
                // readOnly={false}
                // onClick={e => handleChangeCheck(e)}
                onChange={e => handleChangeCheck(e)}
            />
        </div>
    )

}

// function Card({ name, image, diets, healthScore}){
//     // console.log(steps[0] + " .....")
//     // console.log(steps.length)
//     // console.log(diets)
//     return (
//         <div className="card">
//             <h3>{name}</h3>
//             <img src={image} alt="imagen no encontrada" width="200px" height="250px" />
//             <h2>Diets</h2>
//             <ul>{diets.map(e => { return <li key={e.name}> {e.name} </li> })}
//             </ul>
//             <h3>Healthscore: {healthScore}</h3>
            
//         </div>
//     )
// }