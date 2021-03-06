
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getDiets } from '../actions/index.js';
// import Diets from './Diets'
import "./RecipeCreate.css"
const { default: axios } = require('axios');

function validate(input){
    let errors = {};

    if(!input.name){
        errors.name = "Nombre requerido"
    } 
    if(!input.summary){
        errors.summary = "Summary requerido"
    }

    if(input.healthScore < 0){
        errors.healthScore = "HelthScore no puede ser menor que 0"
    }
    if(input.healthScore > 100){
        errors.healthScore = "HelthScore no puede ser mayora a 100"
    }
    // console.log(errors)
    return errors;
}

export default function RecipeCreate() {
   
    const dispatch = useDispatch();
    const allDiets = useSelector((state) => state.diets);
    // console.log("all diets:", allDiets);
    
    const initialState = {
        name: "",
        summary: "",
        healthScore: 0,
        dishTypes: "",
        steps: [""],
        image: "",
        diets: []
    }
    const [input, setInput] = useState(initialState);
    const [errors, setErrors] = useState({});
    // const [inputSteps, setInputSteps] = useState([""]);

    useEffect(() => {
      dispatch(getDiets())
    }, [dispatch])

    function handleChange(e){

        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log("Input: ",input);
    }

    function handleCheck(e){
        // console.log("arr prev: ", input.diets)
        // if(e.target.checked)
        if(!input[e.target.name].includes(e.target.value)){
             setInput({
                ...input,
                [e.target.name]: [...input[e.target.name], e.target.value]
            })
        }else {

            setInput({
                ...input,
                [e.target.name]: input[e.target.name].filter(element => element !== e.target.value)
            })
        }

    }
    function handleAddStep(e){
        // agrega un nuevo input al formulario
        // alert(e.target.value)
        // if (window.confirm("Do you really want add step?")) 
            
        setInput({
            ...input,
            steps: [...input.steps, ""]
        })
    }

    function handleChangeSteps(e){
        // tiene que capturar los datos del formularios y guardarlos en el estado del componente

        setInput( (prevState) => {
            let newState = {...prevState};

            newState.steps[e.target.name] = e.target.value;
            return newState;
            }
        )
       
    }

    function handleSubmit(e){
        e.preventDefault();

        try {
            axios.post('http://localhost:3001/recipes', input)
            .then((response) => {
                alert(response.data);
                setInput(initialState)
            })
            .catch(error => {console.log("Error: ", error)})
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Crea tu Receta</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Nombre: </label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={handleChange}
                    />
                    {errors.name && (<p className='error'>{errors.name}</p>)}
                </div>
                <div>
                    <label>Summary: </label>
                    <input
                        type="text"
                        value={input.summary}
                        name="summary"
                        onChange={handleChange}
                    />
                    {errors.summary && (<p className='error'>{errors.summary}</p>)}
                </div>
                <div>
                    <label>Healthscore: </label>
                    <input
                        type="text"
                        value={input.healthScore}
                        name="healthScore"
                        onChange={handleChange}
                    />
                     {errors.healthScore && (<p className='error'>{errors.healthScore}</p>)}
                </div>
                <div>
                    <label>Dishtypes: </label>
                    <input
                        type="text"
                        value={input.dishTypes}
                        name="dishTypes"
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <label>Image URL: </label>
                    <input
                        type="text"
                        value={input.image}
                        name="image"
                        onChange={handleChange}
                    />
                </div>

                <div>

                    {/* {
                        allDiets.map(el => {
                            return (
                                <Diets
                                    key={el.id}
                                    name={el.name}
                                />
                            )
                        })
                    } */}
                    <h3>Diets: </h3>

                            {allDiets.map((diet) => {
                                return (<div key={diet.id}>
                                            <label>{diet.name}</label>
                                            <input type="checkbox"
                                                    name="diets" 
                                                    value={diet.name}
                                                    onChange={e => handleCheck(e)}/>
                                        </div>)
                            })}

                   <div>
                    {
                        input.steps.map((element, index) => {
                            // console.log("element:" ,element)
                            return(<div key={`steps-${index}`}>
                                    <label>Paso {index+1}:</label>
                                    <input
                                        type="text"
                                        name={index}
                                        id={index}
                                        // value={element.name}
                                        value={element}
                                        onChange={e => handleChangeSteps(e)}
                                        // onChange={handleChangeInput}
                                    />
                                   </div>)
                        })
                    }
                    <button type="button" onClick={e => handleAddStep(e)}>Agregar paso</button>
                    </div>
                </div>
                <button type='submit' className="botonCrearReceta">Crear Receta</button>
            </form>
        </div>

    )
}
