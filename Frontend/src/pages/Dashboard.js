import React, { useState, useEffect, useContext } from "react";
import LeftPane from "./dashboard/LeftPane";

import { useNavigate } from "react-router-dom";

import { gql, useQuery, useMutation } from "@apollo/client";
import AuthContext from "../context/AuthContext";
import Dock from "./dashboard/Dock";
import CryptoCardPortal from "./CryptoCardPortal";
import Smac from "./Smac/Smac";
import Navbar from "../components/Navbar";
import Wrapper from "../components/Wrapper";
import Title from "../components/Title";
import DashboardContext from "../context/DashboardContext";
import Markets from "./dashboard/Markets";
import Sentiment from "./dashboard/sentiment/Sentiment";
import OptimizationContext from "../context/OptimizationContext";

function Dashboard() {
  let { shown, seen, openDash, setCryptoData } = useContext(DashboardContext);
  let { results } = useContext(OptimizationContext);

  const [click, setclick] = useState(true);

  /**------------------------------------------------------------------------
   *                         Get All Coin Data From API
   *------------------------------------------------------------------------**/

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
    return () => clearInterval(interval);
  }, []);

  // function brolic(c) {
  //   fetch(
  //     `https://api.coingecko.com/api/v3/coins/${c.id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false`
  //   )
  //     .then((r) => r.json())
  //     .then((d) => {
  //       setshown(d);
  //       setChartForm({ ...chartForm, ticker: `${d.symbol.toUpperCase()}-USD` });
  //       setoptimizerForm({
  //         ...optimizerForm,
  //         ticker: `${d.symbol.toUpperCase()}-USD`,
  //       });
  //       setResults(null);
  //       setc(null);
  //     })
  //     .catch((e) => console.log(e));
  // }

  return (
    <div
      className={
        openDash
          ? "h-screen w-screen overflow-hidden  bg-auto bg-center bg-no-repeat blur-lg bg-space  min-h-screen px-3  font-sans border-blue-900 border-b-16"
          : "z-3 h-screen w-screen  bg-space   bg-center bg-no-repeat sm:w-full sm:min-h-screen overflow-clip  font-sans sm:bg-cover border-blue-900 "
      }
    >
      <Navbar />
      <div id="siteWrapper" class="site-wrapper  rounded-full ">
        <Wrapper />

        <Title shown={shown} />

        {/* <div className="flex items-start mt-4 "> */}
          
          <div className=" flex flex-col  relative">
            {/* <div className="flex w-full flex-col px-16 pt-6 relative"> */}
            {shown === null ? null : seen === "market" ? (
              <Markets shown={shown} />
            ) : seen === "sentiment" ? (
              <Sentiment shown={shown} />
            ) : seen === "optimizer" ? (
              <>
                <Smac />
                {/* <Dock setclick={setclick} setSeen={setSeen} /> */}
              </>
            ) : (
              <></>
            )}
          </div>

          <div className="flex justify-between ">
            <div className="flex items-center w-80">
              {seen === "smac" && results ? (
                <button
                  onClick={() => setclick(false)}
                  className={
                    click === false
                      ? "relative z-10 px-8 py-6 text-sm font-bold uppercase bg-white rounded"
                      : "relative -translate-x-1 px-8 py-4 border rounded text-white text-sm font-bold border-gray-600/50 bg-opacity-[0.1] uppercase"
                  }
                >
                  Results
                </button>
              ) : null}
              {/* <button
            onClick={() => setclick(true)}
            className={
              click === false
                ? "relative -translate-x-1 px-8 py-4 border rounded text-white text-sm font-bold border-gray-600/50 bg-opacity-[0.1] uppercase"
                : "relative z-10 px-8 py-6 text-sm font-bold uppercase bg-white rounded"
            }
          >
            Portfolio
          </button> */}
            </div>

            {/* <div className="flex items-center justify-end space-x-5 w-80 ">
            <span className="tracking-wider text-gray-600 text-xxs whitespace-nowrap">
              Luis Alfredo Escobar
            </span> */}
            {/* <button
              onClick={() => setOpen(true)}
              className="px-4 py-4 border rounded text-white text-sm font-bold border-gray-600/50 bg-gray-900 bg-opacity-[0.1] uppercase"
            >
              Add More Tokens
            </button> */}
            {/* </div> */}
          </div>

          <CryptoCardPortal />
        </div>
      </div>
      //{" "}
    // </div>
  );
}

export default Dashboard;
