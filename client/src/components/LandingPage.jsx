import React from "react";
import { Link } from 'react-router-dom'
import './LandingPage.css'

export default function LandingPage(){
    return( 
        <div>
            <h1 className="titulo">Bienvenidos a Foods</h1>
            <Link to ='/home'>
                <button className="botonIngresar">Ingresar</button>
            </Link>
        </div>
    );
}