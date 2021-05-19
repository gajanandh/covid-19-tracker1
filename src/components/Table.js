import React from 'react'
import './Table.css'

const Table =(prop)=>{

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
        {prop.state.map(state=>{
        return(
          <tr key ={state.state}>
            <td>{state.state}</td>
            <td>{state.cases}</td>
            <td>{state.recovered}</td>
            <td>{state.deaths}</td>
            <td>{state.active}</td>
          </tr>
        )
      }
      )}
        </tbody>
      </table>
    )

}
export default Table