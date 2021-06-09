import React, { useState , useContext } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';
import { CovidDataContext} from '../../../context/data.context'
import './Map.css'

const INDIA_TOPO_JSON = require('./india.topo.json');


const PROJECTION_CONFIG = {
  scale: 300,
  center: [82.5,18]
};


const DEFAULT_COLOR = '#EEE';
const geographyStyle = {
  default: {
    outline: 'none',
    stroke:"#000",
    strokeWidth:".2px",
  },
  hover: {
    fill: '#808080 ',
    transition: 'all 250ms',
    outline: 'none'
  },
  pressed: {
    fill: '#808080 ',
    transition: 'all 250ms',
    outline: 'none'
  }
};



 function  Map({handleHover,caseType}) {
  const [tooltipContent, setTooltipContent] = useState('');
  const info = useContext(CovidDataContext)
  if(!info){
    return null;
  }
  const getMax = () => {
    let max = 0;
    info.forEach(state=>{
      if (state.name !=="TT"&&state[caseType]>max) max = state[caseType];
    })
    return max;
  }

  const colorScale = () => {
    switch (caseType) {
      case "active": {
        return colorScaleBlue;
      }
      case "recovered": {
        return colorScaleGreen;
      }
      case "deceased": {
        return colorScaleRed;
      }
      case "confirmed":{
          return colorScaleRed1
      }
      default: {
        return colorScaleRed;
      }
    }
  };
  const colorScaleBlue = scaleQuantile()
  .domain([0, getMax()])
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
  .domain([0, getMax()])
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
  .domain([0, getMax()])
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
  const colorScaleRed1 = scaleQuantile()
  .domain([0, getMax()])
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
  const getconfirmed = (id,casetype)=>{
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
    <div className="map-container container">
     
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
