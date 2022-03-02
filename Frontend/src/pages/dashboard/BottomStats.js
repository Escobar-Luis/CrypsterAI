import React from 'react'
import Stat from './Stat';

function BottomStats({shown, seen}) {
    if (shown && seen==='overview') {
    const bottomStats = [
        {
          title: "Loop A",
          value: "26.53",
          unit: "°C",
          gauge: 135,
        },
        {
          title: "Loop B",
          value: "20.00",
          unit: "°C",
          gauge: 180,
        },
        {
          title: "NET PWR 1",
          value: "0.00",
          unit: "W",
          gauge: 0,
        },
        {
          title: "NET PWR 2",
          value: "0.00",
          unit: "W",
          gauge: 0,
        },
      ];
      
    return (
        <div className="grid hidden grid-cols-4 gap-4 pt-4 col-start-4">
            {bottomStats.map((bs) => {
                return <Stat key={bs.title} c={bs} />
            })}
    
  </div>
    )}
    else if (seen==='smac'){return  <div>smac</div>}
else{
  return null
}}

export default BottomStats
