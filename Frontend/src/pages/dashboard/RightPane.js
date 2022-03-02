import React, {useState} from "react";
import { gql, useMutation } from "@apollo/client";
function RightPane({ shown, shownmkt, seen}) {
  
  // console.log(form?.map((x) =>{console.log(x)}))
  if (shown && seen=="overview") {
    console.log(shown);
    
    const m = {
      athC: shown.market_data.ath_change_percentage.usd,
      capC: shown.market_data.market_cap_change_percentage_24h.usd,
      sD: shown.sentiment_votes_down_percentage,
      sU: shown.sentiment_votes_up_percentage,
      "24H": shown.market_data.price_change_percentage_24h,
      "7D": shown.market_data.price_change_percentage_7d,
      "1M": shown.market_data.price_change_percentage_30d,
      "1Y": shown.market_data.price_change_percentage_1y,
    };
    const ath = Math.abs(shown.market_data.ath_change_percentage.usd);
    const month = Math.abs(shown.market_data.price_change_percentage_30d);
    console.log(ath);

    return (
      <div className="w-64  space-y-8">
        <div className="hidden">{shown.symbol}</div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col space-y-2">
            <span className="text-xs text-white"> Bullish Social Sentiment </span>
            <div className="relative w-36 h-1.5">
              <div className="w-36 absolute left-0 top-0 rounded-full h-1.5 bg-gray-600/20"></div>
              <div
                className="absolute left-0 top-0 bg-green rounded-full h-1.5"
                style={{ width: `${shown.sentiment_votes_up_percentage}%` }}
              />
            </div>
          </div>
          <div className="pl-4 text-lg font-medium text-white whitespace-nowrap">
            {shown.sentiment_votes_up_percentage}%
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col space-y-2">
            <span className="text-xs text-white"> Bearish Social Sentiment </span>
            <div className="relative w-36 h-1.5">
              <div className="w-36 absolute left-0 top-0 rounded-full h-1.5 bg-gray-600/20"></div>
              <div
                className="absolute left-0 top-0 bg-red rounded-full h-1.5"
                style={{ width: `${shown.sentiment_votes_down_percentage}%` }}
              />
            </div>
          </div>
          <div className="pl-4 text-lg font-medium text-white whitespace-nowrap">
            {shown.sentiment_votes_down_percentage}%
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col space-y-2">
            <span className="text-xs text-white"> Change Since ATH </span>
            <div className="relative w-36 h-1.5">
              <div className="w-36 absolute left-0 top-0 rounded-full h-1.5 bg-gray-600/20"></div>
              <div
                className="absolute left-0 top-0 bg-red rounded-full h-1.5"
                style={{ width: `${ath}%` }}
              />
            </div>
          </div>
          <div className="pl-4 text-lg font-medium text-white whitespace-nowrap">
            {shown.market_data.ath_change_percentage.usd.toFixed(2)}%
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col space-y-2">
            <span className="text-xs text-white"> Change Past Month </span>
            <div className="relative w-36 h-1.5">
              <div className="w-36 absolute left-0 top-0 rounded-full h-1.5 bg-gray-600/20"></div>
              <div
                className="absolute left-0 top-0 bg-red rounded-full h-1.5"
                style={{ width: `${month}%` }}
              />
            </div>
          </div>
          <div className="pl-4 text-lg font-medium text-white whitespace-nowrap">
            {shown.market_data.price_change_percentage_30d.toFixed(2)}%
          </div>
        </div>
        
        
      </div>
    );
  }
  else if (seen==='smac'){return null}
  else {
    return null
  }
}

export default RightPane;
