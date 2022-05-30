import React from 'react'

function Title({shown}) {
  return (
    <div className="flex justify-center items-center gap-3 pb-1">
          <h1 className="relative text-2xl text-white font-semibold text-center uppercase">
            {shown ? `${shown.id}` : ""}
          </h1>

          {shown ? (
            <div className="flex justify-center ">
              <img
                className=" shadow-2xl shadow-blue rounded-full w-[3rem] h-[3rem]  bg-black  "
                // className="shadow-2xl shadow-blue  w-[20rem] h-[20rem] rounded-full  bg-black  "
                src={shown ? shown.image.large : null}
                alt=""
              />
            </div>
          ) : (
            <h1 className="font-bold text-center text-white text-[5rem] animate-pulse mt-3">
              {/* <h1 className="font-bold text-white text-[100px] animate-bounce mt-3"> */}
              Select Token
            </h1>
          )}
        </div>
  )
}

export default Title