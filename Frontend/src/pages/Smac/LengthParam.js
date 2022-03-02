import React from 'react'

function LengthParam(props) {
  
    return (
        <>
      <div  onClick={() => props.setopenDos(!props.openDos)} className="hover:cursor-pointer flex items-center  border-l-2 p-3 w-auto rounded-full ">
        <a href="#" className="text-2xl">
          {props.icon}
        </a>
        <div className="flex  flex-col ml-3 items-start mx-[100px]">
      <h1 className="font-bold text-xl ">{props.option}</h1>
      <p className="w-max">{props.name}</p>
      </div>
      </div>
        <div className=" flex mr-2 items-center">
        {props.openDos && props.children}
        </div>
      </>
    );}

export default LengthParam