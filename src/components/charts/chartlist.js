import React ,{useEffect,useState}from 'react'
import {Line} from 'react-chartjs-2'

const ChartList = ()=>{
    const [data,setData]=useState([])
    const [casetype,setCaseType]=useState('confirmed')
    useEffect(()=>{
        const gettimedata = async()=>{
            const res =await  fetch('https://api.covid19india.org/v4/min/timeseries.min.json')
            const data  = await  res.json()
            const dataobj = Object.entries(data);
            const dateAndCases = Object.entries(dataobj[1].[1].dates)
            
            const final = dateAndCases.map(date=>{
                return{
                    x:date[0],
                    y:date[1].total.[casetype]
                }
            })
            setData(final)
        }
        gettimedata();
    },[casetype])
    const handleCaseType = (e)=>{
        setCaseType(e.target.value)
    }
    return(
        <div>
            <select name="datatype" id="casetype" defaultValue ="confirmed" onChange ={handleCaseType}>
                <option value="recovered">cases</option>
                <option value="confirmed" >confirmed</option>
                <option value="deceased">deaths</option>
            </select>

            
            <Line
            data = {{
                datasets:[{
                    data : data
                }]
            }}
            option=  { {
                width:400,
                height:400,
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
              }}
            
            />

        </div>
    )
}
export default ChartList