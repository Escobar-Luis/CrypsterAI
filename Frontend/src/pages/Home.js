import React, { useEffect } from "react";
import astro from "../images/astro.png";
import { Link } from "react-router-dom";

function Home() {
  useEffect(() => {
    window.addEventListener("scroll", function (e) {
      let s = this.scrollY;
      let w = this.outerWidth;
      let h = document.getElementsByClassName("paralax")[0].clientWidth;
      let h_b = document.getElementsByClassName("contain")[0].clientWidth;
      let p = (s / h) * 100;
      let p_b = (s / h_b) * 100;
      let opas = 1 - (1 / 100) * p_b;
      let z_1 = 1 + (w / 10000) * p_b;
      document.getElementsByClassName(
        "p-item4"
      )[0].style = `transform: scale(${z_1});opacity: ${opas}`;
      let z_2 = 1 + (w / 5000000) * p;
      document.getElementsByClassName(
        "p-item1"
      )[0].style = `transform: scale(${z_2})`;
      let hr = (w / 2000) * p_b;
      let z_3 = 1 + w * 0.000005 * p_b;
      document.getElementsByClassName(
        "p-item2"
      )[0].style = `transform: translate3d(${hr}px,0,0) scale(${z_3})`;
      let hr_2 = (w / 1500) * p_b;
      let z_4 = 1 + w * 0.00001 * p_b;
      document.getElementsByClassName(
        "p-item3"
      )[0].style = `transform: translate3d(${hr_2}px,0,0) scale(${z_4})`;
      let hr_3 = (w / 1000) * p_b;
      let z_5 = 1 + w * 0.00001 * p_b;
      document.getElementsByClassName(
        "start"
      )[0].style = `transform: translate3d(${hr_3}px,0,0) scale(${z_5})`;
    });
  }, []);
  return (
    <div className="body-home">
      <div className="paralax">
        <div className="paralax-item p-item1"></div>
        <div className="paralax-item p-item2"></div>
        <div className="paralax-item p-item3"></div>
        <div className="paralax-item p-item4 rounded-full"></div>
        {/* <div className="paralax-item p-item5"></div> */}
      </div>

      <div className="contain">
        <div className="content-header flex-row items-center">
          <h1 className="">Crypto Trader </h1>
          <h2 className="">Welcome to your destination</h2>
        </div>

        <div className="content z-10">
          <img src={astro} alt="astro" className=" -bottom-20 w-max" />
          <Link
            to="/register"
            className=" start  border text-white bg-black border-white rounded-full absolute p-2  ml-60 shadow-2xl animate-pulse shadow-blue-500"
          >
            Start
          </Link>
          <div className="flex flex-col">
            <p className=" t  text-white bg-gradient-to-l from-blue-500 to-transparent text-4xl border-white rounded-full absolute p-2 bottom-80 shadow-2xl ">
              Select Your Token - BackTest It - Implement In Your Trading
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
