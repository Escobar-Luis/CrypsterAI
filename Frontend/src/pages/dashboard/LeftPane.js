import React, { useState, useContext } from "react";
import Table from "./Table";
import DashboardContext from "../../context/DashboardContext";
import OptimizationContext from "../../context/OptimizationContext";
function LeftPane({}) {
  let { seen } = useContext(DashboardContext);
  let { s, handleSelectedResult, results, chartForm } =
    useContext(OptimizationContext);

  const [search, setsearch] = useState("");

  const visibleCryptos = s?.filter((c) => {
    return c.name.includes(search.toLowerCase());
  });
  // if (click === true) {
  // return <div className="w-[30rem] space-y-6 h-[35rem] overflow-scroll mb-2">
  //   <div className="flex justify-center">
  //   <input
  //       className= "mt-5 p-3 rounded-full shadow-xl shadow-black border border-blue-500"
  //       type="search"
  //       value={search}
  //       onChange={(e) => setsearch(e.target.value)}
  //       placeholder="Search..."
  //     ></input>
  //     </div>
  //     {a!== null? a.map((c) => {
  //      return visibleCryptos?.map((pc) => {
  //         if (c.id === pc.name) {
  //             return (
  //               <div
  //                 key={c.id}
  //                 onClick={() => brolic(c)}
  //                 className=" p-4 hover:animate-bounce border-2 rounded-full border-black flex items-center"
  //               >
  //                 <svg
  //                   className={
  //                     shown && shown.id === c.id
  // ? "w-6 h-6 fill-green-500"
  //                       : "w-6 h-6 fill-current"
  //                   }
  // :className="getIconColor(pane.status)"
  //   viewBox="0 0 24 24"
  //   xmlns="http://www.w3.org/2000/svg"
  // >
  //   <path
  //     fillRule="evenodd"
  //     clipRule="evenodd"
  //     d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM17.6647 10.1879C18.0446 9.78705 18.0276 9.15411 17.6268 8.77419C17.2259 8.39428 16.593 8.41125 16.2131 8.8121L10.8574 14.463L8.81882 12.3121C8.43891 11.9112 7.80597 11.8943 7.40512 12.2742C7.00427 12.6541 6.9873 13.287 7.36721 13.6879L10.1315 16.6046C10.3204 16.8038 10.5828 16.9167 10.8574 16.9167C11.1319 16.9167 11.3943 16.8038 11.5832 16.6046L17.6647 10.1879Z"
  //   />
  // </svg>
  // <div className="  flex flex-row ml-3 items-center  ">
  //   <span className="text-xs font-bold text-gray-600 uppercase whitespace-nowrap">
  //     {c.symbol}
  //   </span>
  //   <span className="mr-3">
  {
    /* // :className="getLabelColor(pane.status)"> */
  }
  {
    /* <img className="ml-3 rounded h-6 w-6 " src={c.image} />
                      </span>
                      <span className="text-s capitalize  ml-3 text-gray-600">
                        {" "}
                        {c.id}
                      </span>
                    </div>
                  </div>
                );
              }
            else{return null}})})
            : null}
            </div>} */
  }
  if (seen === "optimizer") {
    return (
      <div className="res h-screen w-fit mt-3 mx-auto sm:mx-0   sm:w-auto  sm:h-screen  ">
        <Table
          chartForm={chartForm}
          handleSelectedResult={handleSelectedResult}
          results={results}
        />
        {/* {
        a!== null? a.map((c) => {
        return (
          <div
            key={c.id}
            onClick={() => brolic(c)}
            className=" p-4 hover:animate-bounce border-2 rounded-full border-black flex items-center"
          >
            <svg
              className={
                shown && shown.id === c.id
                  ? "w-6 h-6 fill-green-500"
                  : "w-6 h-6 fill-current"
              }
              // :className="getIconColor(pane.status)"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM17.6647 10.1879C18.0446 9.78705 18.0276 9.15411 17.6268 8.77419C17.2259 8.39428 16.593 8.41125 16.2131 8.8121L10.8574 14.463L8.81882 12.3121C8.43891 11.9112 7.80597 11.8943 7.40512 12.2742C7.00427 12.6541 6.9873 13.287 7.36721 13.6879L10.1315 16.6046C10.3204 16.8038 10.5828 16.9167 10.8574 16.9167C11.1319 16.9167 11.3943 16.8038 11.5832 16.6046L17.6647 10.1879Z"
              />
            </svg>
            <div className="  flex flex-row ml-3 items-center  ">
              <span className="text-xs font-bold text-gray-600 uppercase whitespace-nowrap">
                {c.symbol}
              </span>
              <span className="mr-3"> */}
        {/* // :className="getLabelColor(pane.status)"> */}
        {/* <img className="ml-3 rounded h-6 w-6 " src={c.image} />
              </span>
              <span className="text-s capitalize  ml-3 text-gray-600">
                {" "}
                {c.id}
              </span> */}
        {/* </div>
          </div>
          
        ); */}
        {/* }) */}
        {/* :null} */}
      </div>
    );
  } else {
    return null;
  }
}

export default LeftPane;
