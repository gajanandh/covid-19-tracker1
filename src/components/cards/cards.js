import React ,{useContext}from 'react'
import './cards.css'
import {HistoricalData} from '../../context/historicaldata.context'


const Card = ()=>{
    const historicaldata = useContext(HistoricalData);
    console.log(historicaldata)

    return(
       <h4>hello{historicaldata}</h4>
    )
}
export default Card