import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import React, { useState, useContext } from "react";
import ReactDom from "react-dom";
function ChartPortal({ seeChart, setSeeChart, options, seeAnn, setSeeAnn, isClicked, setIsClicked }) {
  options.chart.height= '325'
  //For the detecter size function, instead of returning mobile return setAnn True()
  if (!seeChart) return null;
  return ReactDom.createPortal(
    <div className="portals fixed top-0 bottom-0 left-0 right-0  z-10  bg-gradient-to-tr from-blue-500 via-transparent to-pink-500 "> 
    <div className="flex flex-col justify-center items-center ">
      <div id='charts' className=" ">
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={options}
        />
      </div>
      <div className="flex items-center gap-5 justify-center ">
        <button className="border p-2 rounded-xl bg-black text-white"
          onClick={() => {
            setSeeAnn(!seeAnn);
          }}
          id="auto"
        >
                              {isClicked?"Show Labels" : "Hide labels"}

        </button>
        <button
        className="border p-2 rounded-xl bg-black text-white"
          onClick={() => {
            setSeeChart(!seeChart);
            setIsClicked(!isClicked)
          }}
          id="auto"
          >
          Hide Chart
        </button>
      </div>
          </div>
    </div>,
    document.getElementById("portal")
  );
}

export default ChartPortal;
