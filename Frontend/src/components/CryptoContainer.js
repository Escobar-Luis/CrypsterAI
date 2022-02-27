import React, { useState,useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import CryptoCard from "./CryptoCard";
import MoreInfo from "./MoreInfo";

function CryptoCardContainer({ openDash, setOpenDash, brolic, setshown, popout, setclick, setSeen, setoptimizerForm, setChartForm, chartForm,optimizerForm}) {
//   let {name} =useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const [more, setmore] = useState(null);
  const [search, setsearch] = useState("");
  // console.log(more);
  // console.log(search);
  const [cryptoData, setCryptoData] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
    )
      .then((r) => r.json())
      .then((d) => setCryptoData(d))
      .catch((e) => console.log(e));

    let interval = setInterval(() => {
      fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
      )
        .then((r) => r.json())
        .then((d) => setCryptoData(d))
        .catch((e) => console.log(e));
    }, 10000);
    return ()=>clearInterval(interval)

  }, []);

  const visibleCryptos = cryptoData?.filter((c) => {
    return c.id.includes(search.toLowerCase());
  });

const history= useNavigate()
  function logout() {
    // const response = axiosInstance.post('user/logout/blacklist/', {
    //   refresh_token: localStorage.getItem('refresh_token'),
    // })
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token');
    // axiosInstance.defaults.headers["Authorization"] = null
    history('/login')

  }
  // console.log(cryptoData)
  // console.log(visibleCryptos[0])

  return (
    // <div className='container-full flex items-center'>
    <div className="bg-gradient-to-r from-slate-800 via-purple-800 to-slate-800 h-screen overflow-hidden ">
    {/* <div className=" flex justify-center">
      <button onClick={logout} className="mt-5 p-3 rounded-full shadow-xl shadow-black border bg-yellow-500 border-blue-500 hover:bg-yellow-200">Logout</button>
    </div> */}
    <div className="flex justify-center ">
        <input
          className={
            open
              ? "hidden"
              : openDash? "mt-5 p-3 rounded-full shadow-xl shadow-black border border-blue-500" : " p-3 rounded-full shadow-xl shadow-black border border-blue-500"
          }
          type="search"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          placeholder="Search..."
        ></input>
      </div>
      <div
        className={
          open
            ? " blur-lg  grid grid-cols-1 md:grid-cols-6 mx-5 items-center justify-around gap-7 overflow-y-auto rounded-3xl h-screen"
            : "  rounded-3xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 px-5 items-center justify-evenly gap-5 overflow-y-scroll  pt-10 pb-[6rem] h-screen"
        }
      >
        {cryptoData == null
          ? null
          : visibleCryptos.map((c) => {
              return (
                <CryptoCard
                  key={c.id}
                  crypto={c}
                  open={open}
                  setOpen={setOpen}
                  setmore={setmore}
                />
              );
            })}
        <MoreInfo chartForm={chartForm} optimizerForm={optimizerForm} setChartForm={setChartForm} setoptimizerForm={setoptimizerForm} setSeen={setSeen} setclick={setclick} popout={popout} setshown={setshown} brolic={brolic} setOpen={setOpen} setOpenDash={setOpenDash} openDash={openDash}key={more? more.name: null} open={open} onClose={() => setOpen(false)} more={more} />
      </div>
    </div>
  );
}

export default CryptoCardContainer;
