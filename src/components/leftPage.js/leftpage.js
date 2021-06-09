import React from 'react';
import ChartList  from  './charts/chart.list'
import MapSection from './mapsection'

function LeftPage() {
    return (
        <div className = 'left'>
            <MapSection/>
            <ChartList/>
        </div>
    )
}

export default LeftPage
