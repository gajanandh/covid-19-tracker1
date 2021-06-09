import React from "react"
import LeftPage from './components/leftPage.js/leftpage'
import RightPage from './components/rightpage/RightPage'
import './App.css';
import {CovidDataProvider} from './context/data.context'
import {TimeDataProvider} from './context/historicalData.context'

function App() {

return(
  <CovidDataProvider>
    <TimeDataProvider>
      <div className="App">
            <nav>
              <h1>CORONA Tracker</h1>
              <div className="icon">
                  <h1><a href="https://github.com/gajanandh/covid-19-tracker1.git"><img src="GitHub-Mark-120px-plus.png" alt="" /></a></h1>
                </div>
              </nav>
          <div className="mainpage">
            <LeftPage/>
            <RightPage/>
            </div>
      </div>
    </TimeDataProvider>
  </CovidDataProvider>
)
}

export default App;
