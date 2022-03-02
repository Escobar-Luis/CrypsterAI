import React, { useState, useContext } from "react";
import { gql, useMutation } from "@apollo/client";

import ParametersContainer from "./ParametersContainer";
import Parameter from "./Parameter";
import Chart from "./Chart";
import moment from 'moment'
import AuthContext from "../../context/AuthContext";
import FreqParam from "./FreqParam";
import LengthParam from "./LengthParam";
function Smac({ shown, handleOptimizer, setclick, selctedResultSma2, selctedResultSma1, setChartForm , chartForm, setoptimizerForm, optimizerForm, c, su, sd, d, chartClick, results, setSeen}) {
const[open,setopen]=useState(false)
const[openDos,setopenDos]=useState(false)

  const CREATE_SMAC = gql`
    mutation smac($date: String!, $length: Int!, $ticker: String!) {
      smaOptimizer(date: $date, length: $length, ticker: $ticker) {
        res
      }
    }
  `;
  const [smaOptimizer, { loading, data }] = useMutation(CREATE_SMAC, {
    update: (proxy, mutationResult) => {
      const x = mutationResult.data.smaOptimizer.res
      console.log(x)
      const y=x[0]
      setChartForm({...chartForm, sma1: y.sma1, sma2: y.sma2})
      handleOptimizer(x)
      chartClick()
     
      setclick(false)

      setSeen('smac')
    },
  });
  function handleClick() {
    console.log('click')
    if (optimizerForm.date ==='Pick A Date'){
      alert('Invalid Date')
    }
    else if (optimizerForm.length === 'Pick A Length'){
      alert('Invalid Length')
    }
    else{
      setopenDos(false)
      setopen(false)
    smaOptimizer({
      variables: {
        date: optimizerForm.date,
        length: optimizerForm.length,
        ticker: optimizerForm.ticker==="ICP-USD"? 'ISP-USD' :optimizerForm.ticker,
        // ticker: optimizerForm.ticker
      },
    });
    }}
  function handleEnter(cdd){
    return cdd
  }
  function handleChange(e) {
    setoptimizerForm({
      ...optimizerForm,
      [e.target.name]: e.target.value.trim(),
    });
    setChartForm({...chartForm,
      [e.target.name]: e.target.value.trim(),})
  }
  return (
    <div className=" text-white ">
      <ParametersContainer>
        {/* <Parameter icon='yello'/> */}
        {/* <Parameter icon='hello'/>*/}
        <Parameter icon="⏱️" name='Frequency' option='Daily'>
        </Parameter>
        <FreqParam  open={open} setopen={setopen} icon="📅" name='Start Of Trading Period' option={optimizerForm.date==='Pick A Date'? optimizerForm.date:moment(optimizerForm.date, "YYYYMMDD").fromNow()}>
        <input className="text-black" name="date" onChange={handleChange} type="Date" value={optimizerForm.date}></input>
        </FreqParam>
        <LengthParam  openDos={openDos} setopenDos={setopenDos} icon="📏" name='Max SMA' option={optimizerForm.length}>
        <input name="length" className="text-black" onChange={handleChange} type="number" value={optimizerForm.length}></input>
        </LengthParam>
        
      </ParametersContainer>
      { loading? <div class="border border-blue-300 shadow rounded-md p-4 w-full h-screen bg-blue-500 animate-pusle">
  <div class="animate-pulse flex space-x-4">
    <div class="rounded-full bg-slate-700 h-10 w-10"></div>
    <div class="flex-1 space-y-6 py-1">
      <div class="h-2 bg-slate-700 rounded"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-3 gap-4">
          <div class="h-2 bg-slate-700 rounded col-span-2"></div>
          <div class="h-2 bg-slate-700 rounded col-span-1"></div>
        </div>
        <div class="h-2 bg-slate-700 rounded"></div>
      </div>
    </div>
  </div>
</div>

:
      <Chart loading={loading} results={results} chartClick={chartClick} c={c} su={su} sd={sd} d={d} chartForm={chartForm}  setChartForm={setChartForm} selctedResultSma2={selctedResultSma2} selctedResultSma1={selctedResultSma1} shown={shown} s={handleClick}/>}
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
  );
}

export default Smac;
