import React, { useState , useContext } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';
import { CovidDataContext} from '../../context/data.context'
import './Map.css'

const INDIA_TOPO_JSON = require('./india.topo.json');


const PROJECTION_CONFIG = {
  scale: 350,
  center: [82.5,22]
};


const DEFAULT_COLOR = '#EEE';
const geographyStyle = {
  default: {
    outline: 'none',
    stroke:"#000",
    strokeWidth:".5px",
  },
  hover: {
    fill: '#808080 ',
    transition: 'all 250ms',
    outline: 'none'
  },
  pressed: {
    outline: 'none'
  }
};



 function  Map({handleHover,caseType}) {
  const [tooltipContent, setTooltipContent] = useState('');
  const info = useContext(CovidDataContext)
  if(!info){
    return null;
  }

  // const getMax = () => {
  //   let max = 0;
  //   info.forEach(state=>{
  //     if (state.name !=="TT"&&state.confirmed>max) max = state.confirmed;
  //   })
  //   return max;
  // }
  const colorScale = () => {
    switch (caseType) {
      case "active": {
        // console.log(caseType)
        return colorScaleBlue;
      }
      case "recovered": {
        return colorScaleGreen;
      }
      case "deceased": {
        return colorScaleRed;
      }
      default: {
        return colorScaleRed;
      }
    }
  };
  const colorScaleBlue = scaleQuantile()
  .domain([0, 100000])
  .range([
    '#CCE5FF',
    '#99CCFF',
    '#66B2FF',
    '#3399FF',
    '#007FFF',
    '#0066CC',
    '#004C99',
    '#003366'
  ]);
  const colorScaleGreen = scaleQuantile()
  .domain([0, 1000000])
  .range([
    '#CCFF99',
    '#99FF99',
    '#B3FF66',
    '#99FF33',
    '#80FF00',
    '#66CC00',
    '#4D9900',
    '#336600'
  ]);
  const colorScaleRed = scaleQuantile()
  .domain([0, 10000])
  .range([
    '#ffebee',
    '#ffcdd2',
    '#ef9a9a',
    '#e57373',
    '#ef5350',
    '#f44336',
    '#e53935',
    '#d32f2f',
    '#c62828',
    '#b71c1c'
  ]);
  console.log(caseType)
  const getconfirmed = (id,casetype)=>{
    // console.log(id,casetype)
    let c = info.find(s=>s.name === id)
    return c[casetype]
  }
  
  const onMouseEnter = (geo) => {
    return () => {
      if (caseType === "active")
      {let cases = getconfirmed(geo.id,"confirmed")- getconfirmed(geo.id,"recovered")
      setTooltipContent(`${geo.properties.name}: ${cases}`)
      handleHover(geo.id)
      }
      else{
        let cases = getconfirmed(geo.id,caseType)
        setTooltipContent(`${geo.properties.name}: ${cases}`)
        handleHover(geo.id)
      }
      
    };
  };
  const onMouseLeave = () => {
    setTooltipContent('');
    handleHover("TT")
  };

  return (
    <div className="full-width-height container">
     
        <ReactTooltip>{tooltipContent}</ReactTooltip>
        <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          width={200}
          height={220}
          data-tip=""
        >
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                let c = info.find(s=>s.name === geo.id)
                // console.log(caseType)
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={c? colorScale()(c[caseType]) : DEFAULT_COLOR}
                    style={geographyStyle}
                    onMouseEnter={onMouseEnter(geo)}
                    onMouseLeave={onMouseLeave}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      
    </div>
  );
}

export default Map;
