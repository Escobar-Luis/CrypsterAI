import React, { useState } from 'react'

function Tbody({results, handleSelectedResult}) {
    const[select, setselect]=useState(false)
  return (
    <tbody className="bg-black divide-y divide-white">
                  {results?.map((r, i) => {
                    return (
                      // <Row key={i} r={r} handleSelectedResult={handleSelectedResult}/>
                      <tr className={select? 'bg-blue-500 hover:cursor-pointer  tracking-wider': 'hover:bg-blue-500 hover:cursor-pointer hover:animate-pulse tracking-wider'} onClick={() => handleSelectedResult(r, setselect)}>
                        {Object.values(r).map((v) => {
                          return (
                            <td className="px-4 py-4 whitespace-nowrap">{v}</td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
  )
}

export default Tbody