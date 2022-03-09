import React, {useContext} from 'react'
import OptimizationContext from '../../context/OptimizationContext';
function LengthParam(props) {
  let { setopenDos, openDos} = useContext(OptimizationContext);
  
    return (
      <div className='grid grid-cols-1 border-l-2 rounded-full'>
      <div  onClick={() => setopenDos(!openDos)} className="hover:cursor-pointer flex  items-center   p-3 w-auto  gap-3 ">
      <div className="flex">
        <h1 className="text-sm">{props.icon}</h1>
      </div>
      <div className="flex  flex-col justify-start items-start mx-auto">
    <h1 className="font-bold text-xs ">{props.option}</h1>
    <p className="w-10 text-[0.6rem]">{props.name}</p>
    </div>
    </div>
      <div className=" w-10">
      {openDos && props.children}
      </div>
      </div>
    );}

export default LengthParam