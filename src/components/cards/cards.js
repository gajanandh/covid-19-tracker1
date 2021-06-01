import React ,{useContext}from 'react'
import './cards.css'
import CountUp from 'react-countup';
import {CovidDataContext} from '../../context/data.context'


const Card = ({currentState,casetype,className,getCasetype})=>{
    const data = useContext(CovidDataContext);
    if(!data){
        return null;
      }
    let cases;
    
      console.log(getCasetype)
    const state = data.find(s=>s.name===currentState)
    if(casetype === 'active'){
         cases = state?state.confirmed-state.recovered:"na"
    }
    else{
        cases = state?state[casetype]:"____"
        // setPrevNum(cases)
    }
    return(
        <div onClick={getCasetype}  className={className}>
            <h2>{casetype}</h2>
            <h4><CountUp start={0} end={cases} duration={.8} separator="," formattingFn={(num) => num.toLocaleString("en-IN")} /></h4>
            
        </div>       
           )
}
export default Card
