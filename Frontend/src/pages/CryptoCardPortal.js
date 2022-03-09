import React, { useState, useContext } from "react";
import ReactDom from "react-dom";
import CryptoContainer from "../components/CryptoContainer";
import DashboardContext from "../context/DashboardContext";
function CryptoCardPortal({

}) {
  const [userSeeing, setUserSeeing] = useState("all");
  let { openDash, setOpenDash } = useContext(DashboardContext);
  if (!openDash) return null;
  return ReactDom.createPortal(
    <div className="fixed top-0 bottom-0 left-0 right-0  z-10  bg-gradient-to-tr from-blue-500 via-transparent to-pink-500">
      <div className=" flex justify-center gap-10 items-center hover:cursor-pointer  text-center text-black">
        <div onClick={() => setOpenDash(false)}>
          <h1 className="text-white rounded-full border w-[7rem] border-black px-3 py-3 bg-black">
            Exit
          </h1>
        </div>
        <div>
          <h1
            onClick={() => setUserSeeing("all")}
            className="text-white w-[7rem] rounded-full border border-black px-3 py-3 bg-black"
          >
            All
          </h1>
        </div>
        <div>
          <h1
            onClick={() => setUserSeeing("portfolio")}
            className="text-white w-[7rem] rounded-full border border-black px-3 py-3 bg-black"
          >
            Portfolio
          </h1>
        </div>
      </div>
      <CryptoContainer
        userSeeing={userSeeing}
 
      />
    </div>,
    document.getElementById("portal")
  );
}

export default CryptoCardPortal;
