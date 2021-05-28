import React, { useState , useContext } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';
import { CovidDataContext} from '../../context/data.context'
import './Map.css'

const INDIA_TOPO_JSON = require('./india.topo.json');


const PROJECTION_CONFIG = {
  scale: 350,
  center: [80,20]
};


const DEFAULT_COLOR = '#EEE';
const geographyStyle = {
  default: {
    outline: 'none'
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



 function  Map({handleHover}) {
  const [tooltipContent, setTooltipContent] = useState('');
  const info = useContext(CovidDataContext)
  if(!info){
    return null;
  }
  const getMax = () => {
    let max = 0;
    info.forEach(state=>{
      if (state.name !=="TT"&&state.confirmed>max) max = state.confirmed;
    })
    return max;
  }
  
  const colorScale = scaleQuantile()
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
      let cases = getconfirmed(geo.id,"confirmed")- getconfirmed(geo.id,"recovered")
      setTooltipContent(`${geo.properties.name}: ${cases}`)
      handleHover(geo.id)
      
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
                let _id = geo.id
                let c = info.find(s=>s.name === geo.id)
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={c? colorScale(c.confirmed) : DEFAULT_COLOR}
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