import React ,{ useContext}from 'react'
import {CovidDataContext} from '../context/data.context'
import './Table.css'

const Table =(prop)=>{
  const data = useContext(CovidDataContext);
  if(!data){
      return null;
    }


    return(
        <table>
        <thead>
          <tr>
            <th >state</th>
            <th>cases</th>
            <th>recovered</th>
            <th>deaths</th>
            <th>active</th>
          </tr>
        </thead>
        <tbody>
        {data.map(state=>{
        return(
          <tr key ={state.name}>
            <td>{state.name}</td>
            <td>{state.confirmed}</td>
            <td>{state.recovered}</td>
            <td>{state.deceased}</td>
            <td>{state.vaccinated}</td>
          </tr>
        )
      }
      )}
        </tbody>
      </table>
    )

}
export default Table