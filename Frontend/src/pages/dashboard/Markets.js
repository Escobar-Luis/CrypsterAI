import React from 'react'

function Markets({shown}) {
  return (
    <div className="text-white text-[0.85rem] xs:text-[1.1rem]">
        <div className="flex flex-col justifiy-center items-center  ">
          <div className="rank-price flex flex-col gap-3 w-screen h-full  ">
            <h1 className=" text-center text-[1rem] border-b-2">
              Market Cap Rank: <span>{shown?.market_cap_rank}</span>
            </h1>
            <div className="flex space-x-5 sm:items-center sm:justify-center text-center">
              <div className="flex flex-col ">
                <h1>Current Price:</h1>
                <div className="text-[2rem] xs:text-[2.4rem]">
                  ${shown?.market_data.current_price.usd.toLocaleString()}
                </div>
              </div>

              <div className="flex flex-col border rounded-xl text-[1rem] xs:text-[1.1rem] h-fit p-3">
                <h1 className="w-max">24H% Change</h1>
                <div className={shown?.market_data.price_change_percentage_24h >0 ? 'text-green-400': 'text-red-400'}>
                  {shown?.market_data.price_change_percentage_24h.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          <div className="rank-price text-center w-full">
                <h1>Key Stats:</h1>
          <div className=" border-t-2 grid grid-cols-2 items-center gap-5 text-center p-3 ">
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
  )
}

export default Markets