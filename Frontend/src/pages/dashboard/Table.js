import React, {useState} from "react";
import Row from "./Row";
import Tbody from "./Tbody";

function Table({ chartForm, results, handleSelectedResult }) {
  const[select, setselect]=useState(false)
  // console.log(Object.keys(results[0]).map((n) => console.log(n)))
  if (!results) {
    return null;
  }
  return (
    <>
      {/* global search and filter */}
      {/* table */}
      <div className="mt-2  flex flex-col rounded-full">
        <div className="-my-2  ">
          <div className="py-1 align-middle inline-block text-white ">
            <div className="shadow  border-b border-white sm:rounded-lg">
              <table className="w-max divide-y divide-white">
                <thead className="bg-gray-50">
                  <tr>
                    {results
                      ? Object.keys(results[0]).map((n) => {
                          return (
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-white uppercase bg-black tracking-wider"
                            >
                              {n}
                            </th>
                          );
                        })
                      : null}

                  </tr>
                </thead>
                {/* <Tbody results={results} handleSelectedResult={}/>*/}
                <tbody className="bg-black divide-y divide-white"> 
                  {results?.map((r, i) => {
                    return (
                      <Row chartForm={chartForm} key={i} r={r} handleSelectedResult={handleSelectedResult}/>
                      // <tr className={select? 'bg-blue-500 hover:cursor-pointer  tracking-wider': 'hover:bg-blue-500 hover:cursor-pointer hover:animate-pulse tracking-wider'} onClick={() => handleSelectedResult(r, setselect)}>
                      //   {Object.values(r).map((v) => {
                      //     return (
                      //       <td className="px-4 py-4 whitespace-nowrap">{v}</td>
                      //     );
                      //   })}
                      // </tr>
                    );
                  })}
                </tbody> 
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
    </>
  );
}

export default Table;
