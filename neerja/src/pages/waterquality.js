import React from 'react'
import ResearchHeader from '../components/Research_header'
import FeatureWeightsChart from '../components/bar'
import WQICalculator from '../components/wqi'

export default function Waterquality() {
  return (
    <div>

        <ResearchHeader/>
        
            <FeatureWeightsChart/>
            <WQICalculator/>
        
    </div>
  )
}
