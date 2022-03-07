import React from "react";
import { RiAddCircleLine, RiAddLine, RiDeleteBin2Line } from "react-icons/ri";

function Wrapper({inPort, setOpen,  shown,  handleAdd, handleDelete}) {
  const site = document.getElementById("siteWrapper");
  const bodyTag = document.getElementsByTagName("body")[0];
  const mobileNavbar = document.getElementsByClassName("main-navbar")[0];

  
  return (
    <div class="mobile-navbar-header block md: bg-black rounded-lg">
      <div class="container mx-auto px-3 py-3 lg:px-0  flex items-center justify-between">
        <button
          id="burgerButton"
          onClick={() => {
            site.classList.remove("navbar-deactive-site-wrapper");
            site.classList.add("navbar-active-site-wrapper");
            bodyTag.classList.add("active-navbar-body");
            mobileNavbar.classList.remove("hidden");
          }}
          class="text-white bg-transparent hover:bg-space p-2 rounded-lg  border-2 border-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 fill-current"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className="flex flex-col">
          <span class="selecet-none font-black text-white text-2xl cursor-pointer">
            CrypsterAI
          </span>
          <sub className="text-[0.6rem] text-purple-400">
            {" "}
            By Luis Alfredo Escobar
          </sub>
        </div>
        <button
          onClick={() => setOpen(true)}
          id="searchButton"
          class="text-white bg-transparent hover:bg-black p-2 rounded-full border-2 border-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 block "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        {shown === null ? null : shown && inPort === 0 ? (
          <div
            onClick={handleAdd}
            className=" p-2  rounded-full shadow-xl shadow-black border-2 bg-transparent border-black-500 hover:bg-red-200"
          >
            <RiAddLine size={24} color={"white"} />
          </div>
        ) : (
          <div
            onClick={handleDelete}
            className=" p-2  rounded-full shadow-xl shadow-black border-2 bg-transparent border-black-500 hover:bg-red-200"
          >
            <RiDeleteBin2Line size={24} color={"white"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Wrapper;
