import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavItem from "./NavItem";
import { RiCloseFill } from "react-icons/ri";
import AuthContext from '../../../../context/AuthContext'

function Navbar() {
  const site = document.getElementById("siteWrapper");
  const bodyTag = document.getElementsByTagName("body")[0];
  const mobileNavbar = document.getElementsByClassName("main-navbar")[0];
  function removeDeactiveClass() {
    setTimeout(() => {
      site.classList.remove("navbar-deactive-site-wrapper");
      mobileNavbar.classList.add("hidden");
    }, 500);
  }
  let{name} = useContext(AuthContext)

  return (
    <div class=" main-navbar bg-space h-screen md:h-[5rem] text-gray-100 py-6 md:py-3   w-screen hidden md:w-1/5 ">
      <div class="container text-left mx-auto md:mx-1 px-5 ">
        <div class="select-none flex flex-col justify-between md:justify-start md:items-start ">
          <div class=" logo flex justify-start md:justify-between items-center font-black text-2xl select-none cursor-pointer w-full text-left gap-5 relative">
            <div
              id="closeButton"
              onClick={() => {
                site.classList.remove("navbar-active-site-wrapper");
                site.classList.add("navbar-deactive-site-wrapper");
                bodyTag.classList.remove("active-navbar-body");
                removeDeactiveClass();
              }}
              class="border rounded-full select-none p-2  "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                fill="white"
                viewBox="0 0 24 24"
                className="h-[1rem] w-[1rem]"
              >
                <path
                  d="M11 0.7H13V23.3H11z"
                  transform="rotate(-45.001 12 12)"
                ></path>
                <path
                  d="M0.7 11H23.3V13H0.7z"
                  transform="rotate(-45.001 12 12)"
                ></path>
              </svg>
            </div>
            <span class="selecet-none text-[2rem]">CrypsterAI</span>
          </div>
          <div class="navbar order-1 ">
            <ul class="flex flex-col ">
              <NavItem />
            </ul>
            <div></div>
          </div>
          <div class="flex  space-x-3 p-[8px] cursor-pointer group order-0 mt-8 md:mt-0">
            <div class="group flex flex-col   space-y-3 md:space-y-0 relative">
              <div class="order-1 md:order-0 flex flex-col w-full md:space-x-2 mt-8 md:mt-0 mr-2 py-3">
                <span class="block  font-thin md:px-5 lg:px-0 text-[2rem]">
                  Hello,
                </span>
                <span class="block pr-2 whitespace-nowrap text-[2rem] capitalize">
                  {name}
                </span>
              </div>
              {/* <img
                src="./images/user.jpeg"
                class="order-0 md:order-1 w-16 md:w-8 rounded-full block"
                alt="user image"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
