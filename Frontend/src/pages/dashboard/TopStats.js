import React from "react";
import Stat from "./Stat";

function TopStats({ shown, seen }) {
  if (shown && seen==='overview') { 
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
      <div className="flex flex-col justify-center items-center space-x-4">
      {/* <div className="flex justify-center space-x-4"> */}
        {topStats.map((c) => {
          return <Stat shown={shown} key={c.title} c={c} />;
        })}
      </div>
    );
  } else if (seen==='smac'){ return <div>smac</div>;
  }
  else{
    return null
  }
}

export default TopStats;
