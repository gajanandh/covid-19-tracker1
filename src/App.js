import React,{useState} from "react"
import Map from "./components/maps/map"
import Table from './components/Table'
import './App.css';
import {CovidDataProvider} from './context/data.context'
import {TimeDataProvider} from './context/historicalData.context'
import Card from './components/cards/cards'
import ChartList from './components/charts/chart.list'

function App() {
  const [currentState, setCurrentState] = useState("TT");
  const [caseType, setCaseType] = useState("active");


  const handleHover=(id)=>{
    setCurrentState(id)
  }
  const getCasetype=(e)=>{
    e.stopPropagation()
    if(e.target.tagName === "SPAN"){
      setCaseType(e.target.parentElement.className.toLowerCase())
    }
    if(e.target.tagName === 'H2'){
      setCaseType(e.target.className.toLowerCase())
    }
    if(e.target.tagName === 'DIV'){
      setCaseType(e.target.children[1].className.toLowerCase())
    }
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
            <TimeDataProvider>
              <ChartList/>  
            </TimeDataProvider>
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
