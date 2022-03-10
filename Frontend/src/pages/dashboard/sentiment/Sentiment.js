import React from "react";
import Stat from "./Stat";

function Sentiment({ shown }) {
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
  const votes = [
    {
      title: "Bullish Social Sentiment",
      percent: shown.sentiment_votes_up_percentage,
    },
    {
      title: "Bearish Social Sentiment",
      percent: shown.sentiment_votes_down_percentage,
    },
  ];

  const connections = [
    { name: "BlockChain", status: shown.links.blockchain_site[0] },
    { name: "Chat", status: shown.links.chat_url[0] },
    { name: "Site", status: shown.links.homepage[0] },
    { name: "Subreddit", status: shown.links.subreddit_url },
  ];
  return (
    <>
      <div className=" grid grid-cols-2  gap-4 place-items-center">
        {/* <div className="flex justify-center space-x-4"> */}
        {topStats.map((c) => {
          return <Stat key={c.title} c={c} />;
        })}
      </div>
      <div className="grid grid-cols-2 py-3 gap-5 place-items-center w-full">
        {votes.map((v) => {
          return (
            <div className="flex justify-between items-center w-fit border-black border-2 rounded-xl p-2">
              <div className="grid grid-cols-1 space-y-2 ">
                <span className="text-xs text-white w-full">{v.title}</span>
                <div className=" text-sm font-medium text-white whitespace-nowrap">
                  <div className="relative w-[6rem] h-1.5  ">
                    {/* <div className="relative w-36 h-1.5"> */}
                    <div className="w-[6rem] absolute left-0 top-0 rounded-full h-1.5  bg-gray-600/20"></div>
                    {/* <div className="w-36 absolute left-0 top-0 rounded-full h-1.5 bg-gray-600/20"></div> */}
                    <div
                      className={`absolute left-0 top-0 ${
                        v.title.includes("Bullish")
                          ? "bg-green-500"
                          : "bg-red-500"
                      } rounded-full h-1.5`}
                      style={{
                        width: `${v.percent}%`,
                      }}
                    />
                  </div>
                  {/* <div className="pl-4 text-lg font-medium text-white whitespace-nowrap"> */}
                  {v.percent}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className=" w-full  text-center ">
        <div className=" text-gray-600 uppercase border-b border-gray-600 text-xxl">
          Links
        </div>
        <div className="grid grid-cols-2 py-5 gap-5 place-items-center ">
          {connections.map((c) => {
            return (
              <div className="text-xxs border-2 p-3 rounded-full w-[8rem]">
                <a
                  href={c.status}
                  className=" hover:cursor-pointer font-bold text-white capitalize"
                >
                  {c.name}{" "}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Sentiment;
