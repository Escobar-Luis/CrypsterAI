import React, {useContext} from 'react'
import OptimizationContext from '../../../../../../../context/OptimizationContext';
function FreqParam(props) {
  let { setopen, open} = useContext(OptimizationContext);

  
    return (
        <div className='grid grid-cols-1'>
      <div  onClick={() => setopen(!open)} className="hover:cursor-pointer flex  items-center  border-l-2 p-3 w-auto rounded-full gap-3 ">
      <div className="flex">
        <h1 className="text-sm">{props.icon}</h1>
      </div>
      <div className="flex  flex-col justify-start items-start ">
    <h1 className="font-bold text-xs ">{props.option}</h1>
    <p className="w-10 text-[0.6rem]">{props.name}</p>
    </div>
    </div>
      <div className=" flex justify-center items-center ml-5">
      {open && props.children}
      </div>
      </div>
    );}

export default FreqParam