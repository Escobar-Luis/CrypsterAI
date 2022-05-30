import React, { useState, useContext } from "react";
import CryptoCard from "./CryptoCard";
import MoreInfo from "./MoreInfo";
import DashboardContext from "../../../../context/DashboardContext";
function CryptoContainer({
  userSeeing,

}) {
  let { userPortfolio, cryptoData } = useContext(DashboardContext);

  const [openMoreInfo, setOpenMoreInfo] = useState(false);
  const [more, setmore] = useState(null);
  const [search, setsearch] = useState("");

  const portfolioVisibleCryptos = userPortfolio?.filter((c) => {
    return c.id.includes(search.toLowerCase());
  });

  const notInPortfolio = cryptoData?.filter((c) => {
    return !userPortfolio?.some((f) => {
      return f.id === c.id;
    });
  });
  const allVisibleCryptos = notInPortfolio?.filter((c) => {
    return c.id.includes(search.toLowerCase());
  });

  return (
    // <div className='container-full flex items-center'>
    <div>
      <div className="flex justify-center ">
        <input
          className={
            openMoreInfo
              ? "hidden"
              : "mt-5 p-3 rounded-full shadow-xl shadow-black border border-blue-500"
          }
          type="search"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          placeholder="Search..."
        ></input>
      </div>
      <div
        className={
          openMoreInfo
            ? " blur-lg  grid grid-cols-2 md:grid-cols-6 mx-5 items-center justify-around gap-7 overflow-y-auto rounded-3xl h-screen"
            : "  rounded-3xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 px-5  items-center justify-evenly gap-5 overflow-y-scroll  pt-10 pb-[6rem] h-screen"
        }
      >
        {userSeeing === "portfolio"
          ? portfolioVisibleCryptos?.map((c) => {
              return (
                <CryptoCard
                  key={c.id}
                  crypto={c}
                 
                  setOpen={setOpenMoreInfo}
                  setmore={setmore}
                />
              );
            })
          : allVisibleCryptos?.map((c) => {
              return (
                <CryptoCard
                  key={c.id}
                  crypto={c}
                
                  setOpen={setOpenMoreInfo}
                  setmore={setmore}
                />
              );
            })}
        <MoreInfo

          open={openMoreInfo}
          key={more ? more.name : null}
          onClose={() => setOpenMoreInfo(false)}
          more={more}
        />
      </div>
    </div>
  );
}

export default CryptoContainer;
