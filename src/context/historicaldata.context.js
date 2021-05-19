
import React, { createContext, useState, useEffect } from "react";

export const HistoricalData = createContext();

export function HistoricalDataProvider(props) {

  // useEffect(() => {
  //   const getData = async () => {
  //     const res = await fetch("https://api.covid19india.org/v4/min/timeseries.min.json")
  //     const data =  res.json();
  //     console.log(res)
  //     setHistoricalData(data)
  //   };
  //   getData();
  //   console.log(historicalData)
    
  // }, []);

  return (
    <HistoricalData.Provider value={"jx nz "}>
      {props.children}
    </HistoricalData.Provider>
  );
}
