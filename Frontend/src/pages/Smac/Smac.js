import React, { useState, useContext } from "react";
import { gql, useMutation } from "@apollo/client";

import ParametersContainer from "./ParametersContainer";
import Parameter from "./Parameter";
import Chart from "./Chart";
import moment from "moment";
import AuthContext from "../../context/AuthContext";
import FreqParam from "./FreqParam";
import LengthParam from "./LengthParam";
import Parameters from "./Parameters";
import OptimizationContext from "../../context/OptimizationContext";
import LeftPane from "../dashboard/LeftPane";


function Smac({}) {
  let { setoptimizerForm, setChartForm, optimizerForm, loading, chartForm, onMobile } = useContext(OptimizationContext);


  
  function handleChange(e) {
    setoptimizerForm({
      ...optimizerForm,
      [e.target.name]: e.target.value.trim(),
    });
    setChartForm({ ...chartForm, [e.target.name]: e.target.value.trim() });
  }
  return (
    <div className="flex justify-center items-center ">
    <div className=" text-white ">
      {/* <Parameters/> */}
      <ParametersContainer>
        <Parameter icon="⏱️" name="Frequency" option="Daily"></Parameter>
        <FreqParam
          icon="📅"
          name="Start "
          option={ moment(optimizerForm.date, "YYYYMMDD").fromNow()
          }
        >
          <input
            className="text-black text-[0.6rem] "
            name="date"
            onChange={handleChange}
            type="Date"
            value={optimizerForm.date}
          ></input>
        </FreqParam>
        <LengthParam
          icon="📏"
          name="Max SMA"
          option={optimizerForm.length}
        >
          <input
            name="length"
            className="text-black text-[0.6rem]"
            onChange={handleChange}
            type="number"
            value={optimizerForm.length}
          ></input>
        </LengthParam>
      </ParametersContainer>
      {loading ? (
        <div class=" shadow rounded-md p-4 w-full h-[30rem]  animate-pusle">
          <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_m2igjaux.json"  speed="1"   loop  autoplay></lottie-player>
        </div>
      ) : (
        <Chart
        />)}
      
      {/* <div className="container flex justify-center">
        <div class=" border border-white  rounded-full p-5 ant-col ant-col-xs-24 ant-col-sm-8 ant-col-md-8 ant-col-lg-3">
          <div class="parameter-setting" tabindex="0" id="frequency">
            <div class="parameter-icon">
              <span
                class="emoji text-[50px]"
                role="img"
                aria-label=""
                aria-hidden="true"
                // style="margin:0 0.5rem 0 0;display:inline-block;vertical-align:middle"
              >
                ⏱️
              </span>
            </div>
            <div class="parameter-text">
              <p class="font-weight-bold">
                <span>Hourly</span>
              </p>
              <p class="font-size-12 text-grey">
                <i>Frequency</i>
              </p>
            </div>
          </div>
          <div
            class="parameter-setting-dropdown-wrapper d-none"
            tabindex="0"
            id="frequency"
          >
            <div class="ant-row frequency-dropdown">
              <div class="ant-col ant-col-24 frequency-option frequency-option-active">
                <button>Hourly</button>
              </div>
              <div class="ant-col ant-col-24 frequency-option ">
                <button disabled="">4 Hours</button>
              </div>
              <div class="ant-col ant-col-24 frequency-option ">
                <button disabled="">30 Minutes</button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
    </div>
  );
}

export default Smac;
