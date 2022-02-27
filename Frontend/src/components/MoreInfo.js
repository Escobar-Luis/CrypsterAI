import React, { useEffect, useState, useContext } from "react";
import ReactDom from "react-dom";

import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import AuthContext from "../context/AuthContext";
function MoreInfo({ more, open, onClose, setOpenDash, setOpen, brolic, setshown, openDash, popout, setclick, setSeen, setoptimizerForm, setChartForm, chartForm,optimizerForm }) {
  const history = useNavigate();
  let { user, refetch, handlefirst} = useContext(AuthContext);
  const [formData, setFormData] = useState(
    more && user
      ? {
          name: more.id,
          user: user.pk,
        }
      : null
  );
  console.log(more?.name)
  const CREATE_TOKEN = gql`
    mutation token(
      $name: String!
      $userId: Int!
    ) {
      createToken(
        name: $name
        userId: $userId
      ) {
        token
      }
    }
  `;


  const [createToken, { loading }] = useMutation(CREATE_TOKEN, {
    update: (proxy, mutationResult) => {
      console.log(mutationResult);
    },
  });
  function handleClick() {
    Object.freeze();
    console.log(formData);
    if (
      user?.tokenSet.filter((c) => {
        return more ? c.name === more.id : null
      }).length > 0
    ) {
       return alert("Coin already in Portfolio"), setOpen(false)
    }
    createToken({
      variables: {
        name: formData.name,
        userId: formData.user,
      },
    })
    refetch()
    handlefirst(more)
    history("/dashboard");
    setOpenDash(false)
    popout(more)
    setclick(true)
    setSeen('overview')
    setChartForm({...chartForm, ticker: `${more.symbol.toUpperCase()}-USD`})
    setoptimizerForm({...optimizerForm, ticker: `${more.symbol.toUpperCase()}-USD`})
    
  }
  if (!open) return null;

  return ReactDom.createPortal(
    <div className="fixed top-0 bottom-0 left-0 right-0  z-10  bg-gradient-to-tr from-blue-500 via-transparent to-pink-500 rounded-full flex items-center justify-center ">
      {/* the w-1/2 makes the page breakinto an even boxe that cuts down the middle to the left but the mx-auto makes the box go straight in the center, the relative makes the next circle designs be able to add absoolute positioning on it */}

      {/* /**================================================================================================
       *                                         BOX WRAPPER : START
       *================================================================================================***/}
      <div className="box-wrapper border border-gray-300 rounded-xl w-full h- sm:w-5/6  p-10 relative ">
        {/* right white circle */}
        <div className=" circle w-6 h-6 border border-gray-100 rounded-full absolute left-0 top-0"></div>

        {/* /**========================================================================
         *                       circle within a square to the right: Start
         *========================================================================** */}
        <div
          className=" hover:cursor-pointer  square rounded w-10 h-10 border border-gray-100  absolute right-0 top-0"
          onClick={onClose}
        >
          {/* since circle is within square div, the absolute element will apply to the parent square div and not the whole box */}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full hover:animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          {/* the left-6 moves the element 6 spaces away from the left, and top-4 moves the element 4 spaces from the top, andborder-4 makes the outline thicker */}
        </div>
        {/* /**========================================================================
         *                       circle within a square to the right: FINISH
         *========================================================================** */}

        {/* /**========================================================================
         *                           BOX CONTENT: START
         *========================================================================** */}

        {/* flex here allows me to split the card display into two section by giving each div a width of 1/2, shadow theme-1 gives shadow to whole box and theme-2 makes the left side appear as overlapping, overflow hidden makes the sharp edges to left rounded */}
        <div className="card w-full h-full rounded-2xl bg-gray-100 flex flex-wrap shadow-theme-1  ">
          {/* /**======================
           *    SECTION left siide of card
           *========================**/}
          {/* transform scale-105 allows the left card to actually overflow the right side giving the overflow effect and is why we break the card into 2 sections */}
          <div className="left-side w-1/2  bg-gradient-to-bl from-purple-500 to-blue-500 shadow-theme-2 rounded-2xl transform scale-105 ">
            {/* /**======================
             *    SECTION logo
             *========================** */}
            <div className="logo absolute left-2 top-0 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mt-3 h-32 w-32 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                />
              </svg>
            </div>
            {/* /**======================
             *    SECTION number
             *========================** */}
            <div className=" sm:mt-0 big-number absolute -right-8 sm:-right-12 top-10">
              <span
                className={
                  more.market_cap_rank < 10
                    ? "text-10xl sm:text-30xl text-shadow   font-bold leading-none pt-sans bg-gradient-to-bl from-purple-400 to-blue-400 text-transparent bg-clip-text"
                    : more.market_cap_rank < 100
                    ? "text-10xl sm:text-25xl text-shadow   font-bold leading-none pt-sans bg-gradient-to-bl from-purple-400 to-blue-400 text-transparent bg-clip-text"
                    : "text-10xl sm:text-18xl text-shadow   font-bold leading-none pt-sans bg-gradient-to-bl from-purple-400 to-blue-400 text-transparent bg-clip-text"
                }
              >
                {more.market_cap_rank}
              </span>
            </div>
            {/* /**======================
             *    SECTION symbol
             *========================** */}
            <div className=" symbol absolute bottom-5 left-5">
              <img
                className="rounded-full border-4 border-black transform hover:-rotate-45 hover:scale-125 transition-all duration-500 animate-pulse"
                src={more.image.large}
                alt="symbol"
              />

              <div className="plus rounded-full bg-purple-500 text-white absolute -top-2 left-2 p-2 cursor-pointer transform hover:scale-125 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10  "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div className="plus rounded-full bg-purple-500 text-white absolute -bottom-2 right-2 p-2 cursor-pointer transform hover:scale-125 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10  "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            </div>

            {/* <div className="class w-full absolute left-0 bottom-12 flex justify-center space-x-3">
              <span className="w-4 h-4 bg-white hover:bg-white rounded-full block cursor-pointer"></span>
              <span className="w-4 h-4 bg-gray-300 hover:bg-white rounded-full block cursor-pointer"></span>
              <span className="w-4 h-4 bg-gray-300 hover:bg-white rounded-full block cursor-pointer"></span>
            </div> */}
          </div>
          {/* /**======================
           *    SECTION right siide of card
           *========================**/}
          <div className="right-side w-1/2 py-6 pr-6 pl-20">
            <h1 className="flex justify-end damion text-4xl font-extrabold mb-5">
              {more.id.toUpperCase()}
            </h1>

            <div className="price-para">
              <span className="price font-bold text-3xl  text-gray-700">
                {more.symbol.toUpperCase()}
              </span>
              <p className="text-lg mt-5 text-gray-700">
                {more.description.en.substr(0, 300)}...
              </p>
            </div>
            <div className="filter flex  mt-5 ">
              <div className="inner text-xl text-gray-600">
                <div className="category flex ">
                  <div className=" mt-33 rounded mr-4">
                    <div className=" rounded-xl text-3xl text-black bg-gradient-to-tr from-purple-500 to-transparent shadow-2xl shadow-blue-400 font-bold  text-center p-1  ">
                      ECO-SYSTEM
                      <div className=" p-1 mt-2 flex items-center justify-around space-x-2 ">
                        {more.categories?.slice(0, 3).map((c) => {
                          if (c === null) {
                            return null;
                          }
                          return (
                            <label className="  cursor-text text-sm hover:text-orange-300 border-2 border-black rounded bg-blue-400 p-1">
                              <span className="text-center">{c}</span>
                              <input
                                type="radio"
                                name="category"
                                className="hidden"
                              />
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="buy-now mt-10 flex justify-center items-center w-full">
              <button
                onClick={handleClick}
                className=" flex justify-center bg-pink-500 hover:bg-orange-500 transition-all text-white p-1   rounded-full uppercase animate-bounce"
              >
                <span className="my-auto p-2">Add To Portfolio </span>
                <span className="h-10 w-10 p-1 my-auto bg-purple-500  block  rounded-full  ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* /**========================================================================
       *                           BOX WRAPPER: FINISH
       *========================================================================** */}
    </div>,
    document.getElementById("portal")
  );
}

export default MoreInfo;
