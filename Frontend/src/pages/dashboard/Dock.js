import React from 'react';
import Overview from "./icons/overview.svg";
import Life from "./icons/life.svg";
import Comms from "./icons/comms.svg";
import Prop from "./icons/prop.svg";
import Mech from "./icons/mech.svg";
import Power from "./icons/power.svg";
import Avionics from "./icons/avionics.svg";
import GNC from "./icons/gnc.svg";
import Thermal from "./icons/thermal.svg";
import Bars from './icons/Bars';
function Dock({setSeen, setclick}) {

    const bars = [
        { title: "Overview", icon: Overview },
        // { title: "Life", icon: Life },
        { title: "SMAC", icon: Comms },
        // { title: "Prop", icon: Prop },
        // { title: "Mech", icon: Mech },
        // { title: "Power", icon: Power },
        // { title: "Avionics", icon: Avionics },
        // { title: "GNC", icon: GNC },
        // { title: "Thermal", icon: Thermal },
      ];
      function handleClick(bar){
        setSeen(bar.title.toLowerCase())
        setclick(true)
      }
  return (
    <div class="flex  items-center justify-center pt-3 space-x-8">
    <div class="relative  flex px-5 pt-5 pb-4 bg-blue-900 rounded-full ">
      <svg
        class=" text-blue-900 absolute top-0 bottom-0 left-0 -translate-x-3/4"
        width="83"
        height="86"
        viewBox="0 0 83 86"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M64.3029 8.65669C68.8626 3.17225 75.6254 0 82.7578 0H83V86H0L64.3029 8.65669Z"
        />
      </svg>
      {bars.map((bar) => {
          return (<>
           <a href="#" onClick={()=>handleClick(bar)} class="flex object-scale-down text-white flex-col items-center px-4 group">
      <img  class='w-[50px] h-auto'src={bar.icon}/>
        <span class="text-gray-600 text-xxxs mt-1.5 group-hover:text-red">
          { bar.title }
        </span>
      </a>
      <svg
        class="  text-blue-900 absolute top-0 bottom-0 right-0 translate-x-3/4"
        width="83"
        height="86"
        viewBox="0 0 83 86"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path       
          d="M18.6971 8.65669C14.1374 3.17225 7.37457 0 0.242245 0H0V86H83L18.6971 8.65669Z"
        />
      </svg>
          </>
          )
      })}
    </div>
  </div>
  )}

export default Dock;
