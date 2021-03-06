import React ,{useContext}from 'react'
import './cards.css'
import CountUp from 'react-countup';
import {CovidDataContext} from '../../../context/data.context'


const Card = ({currentState,casetype,className,getCasetype})=>{
    const data = useContext(CovidDataContext);
    if(!data){
        return null;
      }
    let cases;
    
    const state = data.find(s=>s.name===currentState)
    if(casetype === 'active'){
         cases = state?state.confirmed-state.recovered-state.deceased:"____"
    }
    else{
        cases = state?state[casetype]:"____"
    }
    return(
        <div onClick={getCasetype}  className={`${className} card`}>
            <h2 className={casetype}>{casetype}</h2>
            <h4 className={casetype}><CountUp  start={0} end={cases} duration={.8} separator="," formattingFn={(num) => num.toLocaleString("en-IN")} /></h4>
            
        </div>       
           )
}
export default Card
