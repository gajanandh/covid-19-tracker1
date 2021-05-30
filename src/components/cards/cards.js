import React ,{useContext}from 'react'
import './cards.css'
import {CovidDataContext} from '../../context/data.context'


const Card = ({currentState,casetype})=>{
    const data = useContext(CovidDataContext);
    if(!data){
        return null;
      }
    let cases;

    const state = data.find(s=>s.name===currentState)
    if(casetype === 'active'){
         cases = state?state.confirmed-state.recovered:"na"
    }
    else{
        cases = state?state[casetype]:"____"
    }

    return(
        <div className="card">
            <h2>{casetype}</h2>
            <h4>{cases.toLocaleString('en-IN')}</h4>
            
        </div>       
           )
}
export default Card
