import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import image from "../../assets/CrypsterAI.png";
AOS.init();
function Landing() {
  useEffect(() => {
    window.scrollTo(0, 0);
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
    <div className="body-home overflow-hidden font-whole text-white">
      <div className="  relative z-10 mt-[10%] flex h-screen flex-col items-center justify-start gap-y-5 md:left-[10%]  md:mt-0 ">
        <h1 className=" text-[5rem] md:text-[12rem]  "> Welcome</h1>
        <h1 className=" text-[3rem] md:text-[6rem]"> Crypto Trader </h1>
        <h1 className="mt-[5rem]  animate-pulse text-[2.5rem]  text-white opacity-10 md:mt-0">
          &#x21E9; Scroll Down &#x21E9;
        </h1>
      </div>
      <div className="paralax">
        <div className="paralax-item p-item1"></div>
        <div className="paralax-item p-item2"></div>
        <div className="paralax-item p-item3"></div>
        <div className="paralax-item p-item4 "></div>
      </div>

      <div className="contain flex items-center justify-center text-white ">
        <div className=" flex h-screen flex-col text-center ">
          <div className="content-header">
            <h2 className=" w-full text-[3rem]">To your </h2>
            <h2 className=" w-full text-[3.5rem] font-bold uppercase">
              Destination
            </h2>
          </div>

          <div className=" content flex items-end justify-end  ">
            <div className="z-[2]">
              <img
                src={image}
                className=" mt-[5rem] xs:mb-[5rem] xs:w-[30rem]"
              />
            </div>
          </div>
          <div
            className=" start-button  flex items-center justify-center hover:cursor-pointer "
            data-aos="zoom-in-top"
            data-aos-duration="1000"
          >
            <div className="  animate-pulse rounded-xl border-white bg-black p-2 text-[2rem] shadow-2xl shadow-purple-500 hover:animate-none  xs:text-[4rem]">
              <Link to="/login" className="">
                Start
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
