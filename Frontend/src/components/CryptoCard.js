import React, { useState } from "react";
// import MoreInfo from "./MoreInfo";

function CryptoCard({ crypto ,open, setOpen, setmore}) {

    const[click,setclick]=useState(false)
  const [hover, setHover] = useState(false);
  function masInformation() {
    fetch(`https://api.coingecko.com/api/v3/coins/${crypto.id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false`)
    .then((r) => r.json())
    .then((d) => {
        setmore(d)
        setOpen(true)
        setclick(false)
        console.log('hola')
        })
    .catch((e) => console.log(e));
  }

  return (
    <div
    
      onMouseEnter={() => setHover(!hover)}
      onMouseLeave={() => setHover(!hover)}
      onClick={masInformation}
    //   className={hover ? 'animate-bounce' : "animate-none "}
    className="cursor-pointer transition ease-in-out delay-150  bg-transparent hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-500 shadow-2xl rounded-2xl "
    >
      <div
        className="  flex flex-col items-around justify-center w-50 p-3
            relative z-10 
            bg-gradient bg-gradient-to-br from-gray-300 to-transparent  
            bg-opacity-20  rounded-md shadow-md card"
      >
        <img
          src={crypto.image}
          className= {hover ? '  brightness-125 mx-auto col-span-2 h-20 w-20 mt-3 p-1 mb-3 rounded border bg-inherit border-white shadow-2xl animate-bounce' : " mx-auto col-span-2 h-20 w-20 mt-3 p-1 mb-3 rounded border bg-inherit border-white shadow-2xl animate-none "} 
        />
<h1 className={crypto.id.length> 12? " underline underline-offset-2 decoration-wavy text-left col-span-3 text-sm font-semibold mb-3":" mb-3 underline underline-offset-2 decoration-wavy text-left col-span-3 text-xl font-semibold"}>
          {crypto.id.toUpperCase()}
        </h1>
        <p
          className={
              crypto.price_change_percentage_24h > 0
              ? "text-right font-bold text-green-400 text-xl mb-3 rounded bg-gradient-to-r from-green-400 via-violet-800 to-transparent"
              : " text-right font-bold text-red-400 text-xl mb-3  rounded bg-gradient-to-r from-red-400 via-violet-800 to-transparent"
            }
        >
          % {crypto.price_change_percentage_24h?.toFixed(2)}
        </p>
        <p className={crypto.current_price.length>9 ?"text-sm mb-3 font-bold":"text-lg mb-3 font-bold" }>
          <span className="text-lg text-slate-900 ">PRICE: <span className="text-green-400">$</span></span>{" "}
          {crypto.current_price > 1
            ? crypto.current_price.toLocaleString()
            : crypto.current_price < 0.001
            ? crypto.current_price.toFixed(9)
            : crypto.current_price.toFixed(2)}
        </p>
<p className={hover? " border-4 border-double ml-auto font-bold text-xl  bg-gradient-to-r from-slate-300 to-transparent h-fit w-fit p-2 rounded-full mb-3 shadow-lg shadow-orange-300" :"border-4 border-double ml-auto font-bold text-xl  bg-gradient-to-r from-slate-300 to-transparent h-fit w-fit p-2 rounded-full mb-3 shadow-lg shadow-slate-500"}>
          {crypto.symbol.toUpperCase()}
        </p>
        {hover? <h1 className="font-bold animate-pulse text-center border-2 border-black border-dotted  bg-gradient-to-r from-violet-500 via-slate-300 to-violet-500 rounded-full p-1 ">More Info?</h1>: null}
            

      </div>
      
    </div>
  );
  //   return (
  //     <div className="border border-black bg-white bg-gradient-to-b from-blue-300 to-cyan-500 rounded hover:animate-pulse  ">

  //       <img className="mx-auto h-20 w-20 mt-3 p-3  bg-black rounded border border-white shadow-2xl hover:animate-bounce" src={crypto.image} alt="pic" />
  //       <p className="font-bold text-black text-center">{crypto.symbol.toUpperCase()}</p>
  //       <p className="font-bold text-black  text-center">$ {crypto.current_price > 1? crypto.current_price.toLocaleString() : crypto.current_price < 0.001 ? crypto.current_price.toFixed(9) : crypto.current_price.toFixed(2)}</p>
  //       <p className={crypto.price_change_percentage_24h > 0 ? 'text-center font-bold text-green-400':' text-center font-bold text-red-400'}>% {crypto.price_change_percentage_24h?.toFixed(2)}</p>
  //     </div>
  //   );
}

export default CryptoCard;
