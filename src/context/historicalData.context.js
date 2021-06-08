

import React, { createContext, useState, useEffect } from "react";

export const TimeDataContext = createContext();

export function TimeDataProvider(props) {
const [data,setData]=useState();
  useEffect( ()=>{
    const gettimedata = async()=>{
        const res =await  fetch('https://api.covid19india.org/v4/min/timeseries.min.json')
        const data  = await  res.json()
        setData(data)   
    }
    gettimedata();
  },[]);


  return (
    <TimeDataContext.Provider value={data}>
      {props.children}
    </TimeDataContext.Provider>
  );
}
