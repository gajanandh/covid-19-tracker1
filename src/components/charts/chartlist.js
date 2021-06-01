import React ,{useEffect,useState}from 'react'
import {Line} from 'react-chartjs-2'

const ChartList = ()=>{
    const [data,setData]=useState([])
    const [casetype,setCaseType]=useState('confirmed')
    // const [lastdata,setlastdata] =useState(0)
    useEffect(()=>{
        const gettimedata = async()=>{
            const res =await  fetch('https://api.covid19india.org/v4/min/timeseries.min.json')
            const data  = await  res.json()
            const dataobj = Object.entries(data);
            const dateAndCases = Object.entries(dataobj[1].[1].dates) 
            let lastData=0;
            const final = dateAndCases.map(date=>{
                const newdata = {
                    x:date[0],
                    y:date[1].total.[casetype]- lastData
                }
                lastData = date[1].total.[casetype]
                return newdata
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
                  fill:{
                    target: 'origin',
                    above: 'rgba(255, 0, 0,.8)',   // Area will be red above the origin
                    below: 'rgb(0, 0, 255)'    // And blue below the origin
                  },
                    data : data
                }]
            }}
            option=  { {
                width:100,
                height:100,
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