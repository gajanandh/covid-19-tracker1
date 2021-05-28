import React,{useState,useEffect} from "react"
import Map from "./components/maps/map"
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Table from './components/Table'
import './App.css';
import {CovidDataProvider} from './context/data.context'
import Card from './components/cards/cards'
import ChartList from './components/charts/chartlist'

function App() {
  const [states,setStates]=useState([]);
  const [total,setTotal]=useState({});
  const [data,setData]=useState();
  const [currentState, setCurrentState] = useState("TT");

  const handleHover=(id)=>{
    setCurrentState(id)
    // console.log(currentState)
  }
  return (
    <CovidDataProvider>
      <div className="App">
        <div className="mainpage">
          <div className='left'>
            <div className="cardlist">
              <Card currentState = {currentState} casetype = {'active'}/>
              <Card currentState = {currentState} casetype = {'recovered'}/>
              <Card currentState = {currentState} casetype = {'deceased'}/>
            </div>
            <Map handleHover ={handleHover}/>  
          </div>
        <div className="right">
        <Table className = "table"/>
        </div>
      </div>
      <ChartList/>
      </div>
    </CovidDataProvider>
  );
}

export default App;
