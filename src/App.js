import React,{useState,useEffect} from "react"
import Map from "./components/maps/map"
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Table from './components/Table'
import './App.css';
import Card from './components/cards/cards'
import ChartList from './components/charts/chartlist'

function App() {
  const [states,setStates]=useState([]);
  const [total,setToatal]=useState({});
  useEffect( ()=>{
    const getdata = async()=>{
      const res = await fetch("https://disease.sh/v3/covid-19/gov/IN");
      const data = await res.json()
      const stt  = data.states.map(state=>{
        return(state)
      })
      setToatal(data.total)
      setStates(stt)
    }
    getdata();
  },[]);

  return (
    <div className="App">
      <div className="mainpage">
        <div className='left'>
          <Map/>  
          <div className="cardlist">
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      <div className="right">
      <Table className = "table" state = {states}/>
      </div>
    </div>
    <ChartList/>
    </div>
  );
}

export default App;
