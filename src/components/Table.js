import React ,{ useContext,useState}from 'react'
import {CovidDataContext} from '../context/data.context'
import './Table.css'
import {STATE_NAMES} from '../statename'

const Table =(prop)=>{
  let data = useContext(CovidDataContext);
  if(!data){
      return null;
    }
    const getStateName = (id) =>{
      let statename = (STATE_NAMES[id])
      return statename
    }
     data = data.sort(function (a, b) {
      if (a.confirmed > b.confirmed) {
        return -1;
      }
      if (a.confirmed < b.confirmed) {
        return 1;
      }
      return 0;
    });
    
    

    return(
      <div className="table">
        <table>
        <thead>
          <tr>
            <th >state</th>
            <th>cases</th>
            <th>active</th>
            <th >recovered</th>
            <th>deaths</th>
          </tr>
        </thead>
        <tbody>
        {data.map(state=>{
        return(
          <tr key ={state.name}>
            <td>{getStateName(state.name)}</td>
            <td>{state.confirmed}</td>
            <td>{state.confirmed - state.recovered - state.deceased}</td>
            <td>{state.recovered}</td>
            <td>{state.deceased}</td>
          </tr>
        )
      }
      )}
        </tbody>
      </table></div>
    )

}
export default Table