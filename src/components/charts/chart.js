import React from 'react'
import {Line} from 'react-chartjs-2'

const Chart = ({data,casetype,state,backgroundColor,color})=>{

    const buildChartdata= ()=>{

        const stt =  Object.entries(data[state].dates)
            let final =  stt.map(date=>{
              let newData ={
                    x:date[0],
                    y:date[1].delta?date[1].delta[casetype]||0:0
                }
                return(newData)
            })
            return(final)
    }

  const options ={
    legend: {
      display: false,
    },
    elements: {},
    tooltips: {
      mode: "index",
      intersect: false,
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "YY-MM-DD",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
  };
    
    return(
        
        <div>
           <div className="chart">
            <Line
            data = {{
                datasets:[{
                  label:`${casetype}`,
                  backgroundColor:backgroundColor,
                  borderColor:color,
                  data : buildChartdata(),
                  fill:"start"
                }]
            }}
            options=  { options }
            />
          </div> 
        </div>  
    )
}
export default Chart