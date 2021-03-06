import React, { useEffect, useState } from "react";
import astro from "../images/astro.png";
import { Link } from "react-router-dom";
import AOS from "aos";
import image from '../components/CrypsterAI.png'
AOS.init();
function Home() {
  const [load,setLoad] = useState(false)
  useEffect(() => {
    window.scrollTo(0,0)
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
    })
      
  }, []);
// const image = <img src="../images/m_3.png" onLoadedData={()=> {
//   setLoad(true);
// }}> </img>
  return (
    <div className="body-home text-white font-whole overflow-hidden">
      <div className="  mt-[10%] gap-y-5 relative flex flex-col h-screen items-center justify-start md:left-[10%] md:mt-0  z-10 ">
        <h1
          className=" text-[5rem] md:text-[12rem]  "
    
  
        >
          {" "}
          Welcome
        </h1>
        <h1
          className=" text-[3rem] md:text-[6rem]"
        
         
        >
          {" "}
          Crypto Trader{" "}
        </h1>
        <h1
          className="text-[2.5rem]  mt-[5rem] md:mt-0  text-white opacity-10 animate-pulse"

        >
          &#x21E9; Scroll Down &#x21E9;
        </h1>
      </div>
      <div className="paralax" >
        <div className="paralax-item p-item1"></div>
        <div className="paralax-item p-item2" ></div>
        <div className="paralax-item p-item3"></div>
        <div className="paralax-item p-item4 "></div>
      </div>

      <div className="contain text-white flex justify-center items-center ">
        <div className=" flex flex-col h-screen text-center ">
          <div
            className="content-header"
            
          >
            <h2 className=" text-[3rem] w-full">To your </h2>
            <h2 className=" text-[3.5rem] w-full uppercase font-bold">
              Destination
            </h2>
          </div>

          <div className=" content flex items-end justify-end  ">
            <div
              className="z-[2]"
           
            >
             <img src={image} className=' xs:w-[30rem] mt-[5rem] xs:mb-[5rem]'/>
            </div>
          </div>
          <div
            className=" flex  items-center justify-center start-button hover:cursor-pointer "
            data-aos="zoom-in-top"
            data-aos-duration="1000"
          >
            <div className="  bg-black border-white rounded-xl xs:text-[4rem] text-[2rem] p-2 hover:animate-none shadow-2xl animate-pulse  shadow-purple-500">
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

export default Home;
