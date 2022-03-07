import React from "react";
import Details from "./Details";
function Connections({ shown, seen }) {
  if (shown && seen === "sentiment") {
    const connections = [
      { name: "BlockChain", status: shown.links.blockchain_site[0] },
      { name: "Chat", status: shown.links.chat_url[0] },
      { name: "Site", status: shown.links.homepage[0] },
      { name: "Subreddit", status: shown.links.subreddit_url },
    ];
    return (
      <div className=" w-full  text-center ">
        <div className=" text-gray-600 uppercase border-b border-gray-600 text-xxl">
          Links
        </div>
        <div className="grid grid-cols-2 py-5 gap-5 place-items-center ">
          {connections.map((c) => {
            return <Details connection={c} key={c.name} />;
          })}
        </div>
      </div>
    );
  } else if (seen === "smac") {
    return <div>smac</div>;
  } else {
    return null;
  }
}

export default Connections;
