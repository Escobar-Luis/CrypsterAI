import React, { useState } from "react";


function Parameter(props) {
  const [open, setOpen] = useState(false);
  
  return (
      <>
    <div  onClick={() => setOpen(!open)} className=" flex flex-col-2 items-center   p-3 w-fit rounded-full gap-2">
      <div className="flex">
        <h1 className="text-sm">{props.icon}</h1>
      </div>
      <div className="flex  flex-col justify-start items-start ">
    <h1 className="font-bold text-xs ">{props.option}</h1>
    <p className="w-10 text-[0.6rem]">{props.name}</p>
    </div>
    </div>
      <div className=" flex items-center">
      {open && props.children}
      </div>
      {/* <div className="flex  flex-col ml-3 items-start mx-[100px]">
    <h1 className="font-bold text-xl ">{props.option}</h1>
    <p className="w-max">{props.name}</p>
    </div>
    </div>
      <div className=" flex mr-2 items-center">
      {open && props.children}
      </div> */}
    </>
  );
}

export default Parameter;
