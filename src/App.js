import React,{useState} from "react"
import Map from "./components/maps/map"
import Table from './components/Table'
import './App.css';
import {CovidDataProvider} from './context/data.context'
import Card from './components/cards/cards'
import ChartList from './components/charts/chartlist'

function App() {
  const [currentState, setCurrentState] = useState("TT");
  const [caseType, setCaseType] = useState("active");


  const handleHover=(id)=>{
    setCurrentState(id)
  }
  const getCasetype=(e)=>{
    setCaseType(e.target.className.toLowerCase()||e.target.parentElement.className)
  
  }

  return (
    <CovidDataProvider>
      <div className="App">
        <nav>
          <h1>CORONA Tracker</h1>
          <div className="icon">
            <h1><a href="https://github.com/gajanandh/covid-19-tracker1.git">GitHub</a></h1>
            
          </div>
        </nav>
        <div className="mainpage">
          <div className='left'>
            <div className="cardlist" >
              <Card getCasetype ={getCasetype} className = {"confirmed"} currentState = {currentState}  casetype = {'confirmed'}/>
              <Card getCasetype ={getCasetype} className = {"active"} currentState = {currentState}  casetype = {'active'}/>
              <Card getCasetype ={getCasetype} className = {"recovered"} currentState = {currentState} casetype = {'recovered'}/>
              <Card getCasetype ={getCasetype} className = {"deceased"}currentState = {currentState} casetype = {'deceased'}/>
            </div>
            <Map handleHover ={handleHover} caseType = {caseType}/> 
            <ChartList/> 
          </div>
        <div className="right">
        <Table className = "table"/>
        </div>
      </div>
    
      </div>
    </CovidDataProvider>
  );
}

export default App;
