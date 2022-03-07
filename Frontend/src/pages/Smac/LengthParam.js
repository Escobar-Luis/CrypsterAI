import React from 'react'

function LengthParam(props) {
  
    return (
      <div className='grid grid-cols-1 border-l-2 rounded-full'>
      <div  onClick={() => props.setopenDos(!props.openDos)} className="hover:cursor-pointer flex  items-center   p-3 w-auto  gap-3 ">
      <div className="flex">
        <h1 className="text-sm">{props.icon}</h1>
      </div>
      <div className="flex  flex-col justify-start items-start mx-auto">
    <h1 className="font-bold text-sm ">{props.option}</h1>
    <p className="w-20">{props.name}</p>
    </div>
    </div>
      <div className=" w-10">
      {props.openDos && props.children}
      </div>
      </div>
    );}

export default LengthParam