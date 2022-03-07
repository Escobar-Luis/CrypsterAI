import React, { useEffect, useState } from "react";
import Stat from "./Stat";

function TopStats({ shown, seen }) {
  // const [close, setClose] = useState(null)
  // useEffect(() => {
  //   fetch(`https://api.coingecko.com/api/v3/coins/${shown?.id}/ohlc?vs_currency=usd&days=365`)
  //   .then(r=>r.json())
  //   .then((d) => {
  //     console.log(d)
  //   })
  // }, [shown])
  function currencyParser(labelValue) {
    return Math.abs(Number(labelValue)) >= 1.0e12
      ? (Math.abs(Number(labelValue)) / 1.0e12).toFixed(2) + "T"
      : Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
      : Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
      : Math.abs(Number(labelValue)) >= 1.0e3
      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
      : Math.abs(Number(labelValue));
  }
  if (shown && seen === "sentiment") {
    const topStats = [
      {
        title: "CoinGecko Score",
        value: shown.coingecko_score,
        unit: "psia",
        gauge: shown.coingecko_score,
      },
      {
        title: "Community score",
        value: shown.community_score,
        unit: "°C",
        gauge: shown.community_score,
      },
      {
        title: "Developer Score",
        value: shown.developer_score,
        unit: "psia",
        gauge: shown.developer_score,
      },
      {
        title: "Liquidity Score",
        value: shown.liquidity_score,
        unit: "mmHg",
        gauge: shown.liquidity_score,
      },
    ];
    return (
      <div className=" grid grid-cols-2  gap-4 place-items-center">
        {/* <div className="flex justify-center space-x-4"> */}
        {topStats.map((c) => {
          return <Stat shown={shown} key={c.title} c={c} />;
        })}
      </div>
    );
  } else if (seen === "smac") {
    return <div>smac</div>;
  } else if (seen === "market" && shown) {
    return (
      <div className="text-white text-[1.1rem]">
        <div className="flex flex-col justifiy-center items-center  ">
          <div className="rank-price flex flex-col gap-3 w-screen h-full ">
            <h1 className=" text-center text-[1rem] border-b-2">
              Market Cap Rank: <span>{shown?.market_cap_rank}</span>
            </h1>
            <div className="flex space-x-5 ">
              <div className="flex flex-col ">
                <h1>Current Price:</h1>
                <div className="text-[2rem]">
                  ${shown?.market_data.current_price.usd.toLocaleString()}
                </div>
              </div>

              <div className="flex flex-col border rounded-xl  text-[0.8rem] h-fit p-3">
                <h1>24H% Change</h1>
                <div className={shown?.market_data.price_change_percentage_24h >0 ? 'text-green-400': 'text-red-400'}>
                  {shown?.market_data.price_change_percentage_24h.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          <div className="border rank-price grid grid-cols-2 items-center gap-5 text-center p-3 w-screen ">
            <div>
              <h1>24H Low</h1>${shown?.market_data.low_24h.usd.toLocaleString()}
            </div>
            <div>
              <h1>24H High</h1>$
              {shown?.market_data.high_24h.usd.toLocaleString()}
            </div>
            <div>
              <h1>Total Market Cap</h1>$
              {shown?.market_data.market_cap.usd.toLocaleString()}
            </div>

            <div>
              <h1>Total Volume</h1>$
              {shown?.market_data.total_volume.usd.toLocaleString()}
            </div>
          </div>

          <div className=" text-center rank-price w-screen ">
            <h1>% Changes</h1>
            <div className="grid grid-cols-2 items-center gap-5 border-t-2">
              <div>
                <h1>Past Week:</h1>
                <div className={shown?.market_data.price_change_percentage_7d >0 ? 'text-green-400': 'text-red-400'}>
                  {shown?.market_data.price_change_percentage_7d.toFixed(2)}%
                </div>
              </div>
              <div>
                <h1>Past Month:</h1>
                <div className={shown?.market_data.price_change_percentage_30d >0 ? 'text-green-400': 'text-red-400'}>
                  {shown?.market_data.price_change_percentage_30d.toFixed(2)}%
                </div>
              </div>
              <div >
                <h1>Past 6 Months:</h1>
                <div className={shown?.market_data.price_change_percentage_200d >0 ? 'text-green-400': 'text-red-400'}>
                  {shown?.market_data.price_change_percentage_200d.toFixed(2)}%
                </div>
              </div>

              <div>
                <h1>Past Year:</h1>
                <div className={shown?.market_data.price_change_percentage_1y >0 ? 'text-green-400': 'text-red-400'}>
                  {shown?.market_data.price_change_percentage_1y.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default TopStats;
