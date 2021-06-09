import React ,{useContext,useState} from 'react';
import Chart from './chart';
import { TimeDataContext } from '../../../context/historicalData.context'
import {STATE_NAMES} from '../../../statename'

 const ChartList = ()=>{
     const [selectedState,setSelectedState] = useState('TT')
    
    const data = useContext(TimeDataContext)
    if(!data)
    {
        return <h1 className = 'loader'>Loading...</h1>;
    }
    const handleClick = (e)=>{
        setSelectedState(e.target.value)
    }

    return(
        <div className="chartlist">
            <select name="State" id="State-id" defaultValue="TT" onChange ={handleClick}>
                {
                    Object.entries(STATE_NAMES).map(state=>(
                        <option value={state[0]}>{state[1]}</option>
                    ) )
                }
            </select>
            <h1>Confirmed</h1>
            <Chart 
                data ={data}
                casetype ={"confirmed"}
                state ={selectedState}
                backgroundColor = {'rgba(150,0,0,.5)'}
                color = {'red'}
            />
            <h1>Recovered</h1>
            <Chart 
                data ={data}
                casetype ={"recovered"}
                state ={selectedState}
                color = {'green'}
                backgroundColor = {'rgba(0,150,0,0.58)'}
            />
            <h1>Deceased</h1>
            <Chart 
                data ={data}
                casetype ={"deceased"}
                state ={selectedState}
                color = {'grey'}
                backgroundColor = {'rgba(80,80,80,.5)'}
            />
        </div>
        
    )
}

export default ChartList