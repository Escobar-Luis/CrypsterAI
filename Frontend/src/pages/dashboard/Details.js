import React from "react";

function Details({ connection }) {
  return (
    <div className="text-xxs border-2 p-3 rounded-full w-[8rem]">
      <a href={connection.status}className=" hover:cursor-pointer font-bold text-white capitalize">{connection.name}  </a>
    </div>
  );
}

export default Details;
