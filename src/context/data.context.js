

import React, { createContext, useState, useEffect } from "react";

export const CovidDataContext = createContext();

export function CovidDataProvider(props) {
const [data,setData]=useState();
  useEffect( ()=>{
    const getdata = async()=>{
      const res = await fetch("	https://api.covid19india.org/v4/min/data.min.json");
      const json = await res.json()
      const data = Object.entries(json)

      let finaldata   = data.map((state)=>{
        return{name:state[0],
          confirmed:state[1].total.confirmed,
          recovered:state[1].total.recovered,
          active:state[1].total.confirmed-state[1].total.recovered-state[1].total.deceased,
          tested:state[1].total.tested,
          deceased:state[1].total.deceased,
          vaccinated:state[1].total.vaccinated
        }
      })
      setData(finaldata)
    }
    getdata();
  },[]);


  return (
    <CovidDataContext.Provider value={data}>
      {props.children}
    </CovidDataContext.Provider>
  );
}
