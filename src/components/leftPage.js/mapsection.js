import React,{useState} from 'react'
import Map from "./maps/map"
import Card from './cards/cards'
function MapSection() {
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
        <>
            <div className="cardlist" >
              <Card getCasetype ={getCasetype} className = {"confirmed"} currentState = {currentState}  casetype = {'confirmed'}/>
               <Card getCasetype ={getCasetype} className = {"active"} currentState = {currentState}  casetype = {'active'}/>
               <Card getCasetype ={getCasetype} className = {"recovered"} currentState = {currentState} casetype = {'recovered'}/>
               <Card getCasetype ={getCasetype} className = {"deceased"}currentState = {currentState} casetype = {'deceased'}/>
             </div>
             <Map handleHover ={handleHover} caseType = {caseType}/>
        </>
    )
}

export default MapSection
