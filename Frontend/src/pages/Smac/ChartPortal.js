import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import React, { useState, useContext } from "react";
import ReactDom from "react-dom";
function ChartPortal({ seeChart, setSeeChart, options, seeAnn, setSeeAnn }) {

  if (!seeChart) return null;
  return ReactDom.createPortal(
    <div className="fixed top-0 bottom-0 left-0 right-0  z-10  bg-gradient-to-tr from-blue-500 via-transparent to-pink-500 flex justify-center items-center flex-col ">
      <div className=" ">
      <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={options}
      />
      </div>
      <button
        onClick={() => {
          setSeeAnn(!seeAnn);
        }}
        id="auto"
      >Hide Labels</button>
            <button
        onClick={() => {
          setSeeChart(!seeChart);
        }}
        id="auto"
      >
        Hide Chart
      </button>
      </div>,
    document.getElementById("portal")
  );
}

export default ChartPortal;
