import React from "react";
import './Paginado.css'
 
export default function Paginado({recipesPerPage, allRecipes, paginado}){
    const pageNumbers = []
    
    for(let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className='paginado'>
                { pageNumbers &&
                  pageNumbers.map(number =>(
                    <li onClick={ () => paginado(number)} className='number' key={number}>
                        {number}
                    </li>
                ))}
            </ul>
        </nav>
    );
}