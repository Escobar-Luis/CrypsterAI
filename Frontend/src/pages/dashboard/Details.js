import React from "react";

function Details({ connection }) {
  return (
    <div className="flex justify-between text-xxxs">
      <a href={connection.status}className=" hover:cursor-pointer font-bold text-white capitalize">{connection.name}  </a>
    </div>
  );
}

export default Details;
