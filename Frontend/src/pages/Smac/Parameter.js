import React, { useState } from "react";


function Parameter(props) {
  const [open, setOpen] = useState(false);
  
  return (
      <>
    <div  onClick={() => setOpen(!open)} className=" flex items-center  border-l-2 p-3 w-auto rounded-full ">
      <a href="#" className="text-2xl">
        {props.icon}
      </a>
      <div className="flex  flex-col ml-3 items-start mx-[100px]">
    <h1 className="font-bold text-xl ">{props.option}</h1>
    <p className="w-max">{props.name}</p>
    </div>
    </div>
      <div className=" flex mr-2 items-center">
      {open && props.children}
      </div>
    </>
  );
}

export default Parameter;
