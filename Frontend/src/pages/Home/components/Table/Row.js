import React, {useState} from 'react'

function Row({r,chartForm, handleSelectedResult}) {
    const[select, setselect]=useState(false)
  return ( 
    <tr className={chartForm.sma1 === r.sma1 && chartForm.sma2 === r.sma2? 'bg-blue-500 hover:cursor-pointer  tracking-wider': 'hover:bg-blue-500 hover:cursor-pointer hover:animate-pulse '} onClick={() => handleSelectedResult(r)}>
    {Object.values(r).map((v) => {
      return (
        <td className="px-4 py-4 whitespace-nowrap">{v}</td>
      );
    })}
   </tr>

  )
}

export default Row