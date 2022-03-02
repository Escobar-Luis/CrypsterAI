import React, { useState } from 'react';
import ReactDom from "react-dom";
import CryptoCardContainer from '../components/CryptoContainer';

function CryptoCardPortal({userPortfolio,openDash, setOpenDash, brolic, setshown, popout, setclick, setSeen, setoptimizerForm, setChartForm, chartForm,optimizerForm}) {
const [userSeeing, setUserSeeing] = useState('portfolio')
console.log(userSeeing)
    if (!openDash) return null;
    return ReactDom.createPortal( <div className='fixed top-0 bottom-0 left-0 right-0  z-10  bg-gradient-to-tr from-blue-500 via-transparent to-pink-500'>
        <div className=' flex justify-center gap-10 items-center hover:cursor-pointer  text-center text-black'>
            <div onClick={()=> setOpenDash(false)}>
            <h1 className='text-white rounded-full border border-black px-3 py-3 bg-black'>Exit</h1>
            </div>
            <div>
            <h1 onClick={()=> setUserSeeing('all')} className='text-white rounded-full border border-black px-3 py-3 bg-black'>All Tokens</h1>
            </div>
            <div>
            <h1 onClick={()=> setUserSeeing('portfolio')} className='text-white rounded-full border border-black px-3 py-3 bg-black'>Your Portfolio</h1>
            </div>
        </div>
      <CryptoCardContainer userSeeing={userSeeing} userPortfolio={userPortfolio} chartForm={chartForm} optimizerForm={optimizerForm} setChartForm={setChartForm} setoptimizerForm={setoptimizerForm} setSeen={setSeen} setclick={setclick} popout={popout} setshown={setshown} brolic={brolic} setOpenDash={setOpenDash} openDash={openDash}/>
  </div>,
      document.getElementById("portal"))
}

export default CryptoCardPortal;

