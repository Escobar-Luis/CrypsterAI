import React, { useState, useEffect, useContext } from "react";
import LeftPane from "./dashboard/LeftPane";
import jwt_decode from "jwt-decode";
import RightPane from "./dashboard/RightPane";
import { useNavigate } from "react-router-dom";
import TopStats from "./dashboard/TopStats";
import BottomStats from "./dashboard/BottomStats";
import Connections from "./dashboard/Connections";
import { gql, useQuery, useMutation } from "@apollo/client";
import AuthContext from "../context/AuthContext";
import Dock from "./dashboard/Dock";
import CryptoCardPortal from "./CryptoCardPortal";
import Smac from "./Smac/Smac";
import moment from "moment";
import { RiDeleteBin2Line } from "react-icons/ri";

function Dashboard() {
  let { user, refetch, first } = useContext(AuthContext);
  const [p, setp] = useState([]);
  const [seen, setSeen] = useState("overview");
  const [cryptoData, setCryptoData] = useState(null);
  const [shown, setshown] = useState(first ? first : null);
  const [shownmkt, setshownmkt] = useState(null);
  const [click, setclick] = useState(true);
  const [results, setResults] = useState(null);
  const [selctedResultSma1, setselctedResultSma1] = useState(null);
  const [selctedResultSma2, setselctedResultSma2] = useState(null);
  const [c, setc] = useState(null);
  const [su, setsu] = useState(null);
  const [sd, setsd] = useState(null);
  const [d, setd] = useState(null);

  // Functionlity for seeing All API Coins & Their coins in Portfolio
  const [open, setOpen] = useState(false);
  let userC = user?.tokenSet;
  let userPortfolio = userC
    ?.map((x) => {
      let matchingCoin = cryptoData?.find((c) => c.id === x.name);
      if (matchingCoin) {
        return matchingCoin;
      }
    })
    .filter((matchingCoin) => matchingCoin);
  

  const CREATE_CHART = gql`
    mutation chart($date: String!, $sma1: Int!, $sma2: Int!, $ticker: String!) {
      smaVisual(date: $date, sma1: $sma1, sma2: $sma2, ticker: $ticker) {
        res
      }
    }
  `;
  function chartClick() {
    smaVisual({
      variables: {
        date: chartForm.date,
        sma1: chartForm.sma1,
        sma2: chartForm.sma2,
        ticker: chartForm.ticker === "ICP-USD" ? "ISP-USD" : chartForm.ticker,
      },
    });
  }
  const [smaVisual, {}] = useMutation(CREATE_CHART, {
    update: (proxy, mutationResult) => {
      console.log(chartForm);
      const x = mutationResult.data.smaVisual.res;
      const all = x.map((day) => {
        return Object.assign({}, day, { date: new Date(day.date).getTime() });
      });
      const c = x.map((day) => {
        return [new Date(day.date).getTime(), day.close];
        // return [day.close, Highcharts.parseDate(day.date)]
      });
      const smau = x.map((day) => {
        return [new Date(day.date).getTime(), day.sma1];
      });
      const smad = x.map((day) => {
        return [new Date(day.date).getTime(), day.sma2];
      });
      setc(c);
      setsu(smau);
      setsd(smad);
      setd(all);
    },
  });

  const [chartForm, setChartForm] = useState({
    date: moment(),
    sma1: 12,
    sma2: 29,
    ticker: "",
  });
  const [optimizerForm, setoptimizerForm] = useState({
    date: "Pick A Date",
    length: "Pick A Length",
    ticker: "",
  });
  console.log(optimizerForm);

  function brolic(c) {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${c.id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false`
    )
      .then((r) => r.json())
      .then((d) => {
        setshown(d);
        setChartForm({ ...chartForm, ticker: `${d.symbol.toUpperCase()}-USD` });
        setoptimizerForm({
          ...optimizerForm,
          ticker: `${d.symbol.toUpperCase()}-USD`,
        });
        setResults(null);
        setc(null);
      })
      .catch((e) => console.log(e));
  }
  function handleSelectedResult(obj) {
    setChartForm({ ...chartForm, sma1: obj.sma1, sma2: obj.sma2 });
    chartClick();
  }
  function handleOptimizer(r) {
    setResults(r);
  }
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
    )
      .then((r) => r.json())
      .then((d) => {
        setCryptoData(d);
      })
      .catch((e) => console.log(e));
  }, []);
  const history = useNavigate();

  function logout() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    history("/login");
  }

  const DELETE_TOKEN = gql`
    mutation delete($id: Int!) {
      deleteToken(id: $id) {
        ok
      }
    }
  `;

  const [deleteToken, { data }] = useMutation(DELETE_TOKEN, {
    update: (proxy, mutationResult) => {
      setResults(null);
      setc(null);
      setSeen("overview");
      setclick(true);
      console.log(mutationResult);
    },
  });
  const CREATE_TOKEN = gql`
    mutation token($name: String!, $userId: Int!) {
      createToken(name: $name, userId: $userId) {
        token
      }
    }
  `;
  function popout(c) {
    setshown(c);
  }
  const [createToken, {}] = useMutation(CREATE_TOKEN, {
    update: (proxy, mutationResult) => {
      console.log(mutationResult);
    },
  });

  function handleDelete() {
    const token = userC?.filter((c) => c.name === shown.id);
    console.log(token);
    if (!token) {
      return alert("Make an Account");
    }
    if (token.length === 0) {
      return alert("Not in portfolio");
    }

    deleteToken({
      variables: {
        id: token[0].id,
      },
    });
    refetch();
    setshown(null);
  }
  function handleAdd() {
    if (
      user?.tokenSet.filter((c) => {
        return shown ? c.name === shown.id : null;
      }).length > 0
    ) {
      return alert("Coin already in Portfolio");
    }
    createToken({
      variables: {
        name: shown.id,
        userId: user.pk,
      },
    });
    refetch();
    setclick(true);
  }

  let inPort = userC?.filter((c) => shown?.id === c?.name).length;

  const site = document.getElementById("siteWrapper");
  const bodyTag = document.getElementsByTagName("body")[0];
  const mobileNavbar = document.getElementsByClassName("main-navbar")[0];

  function removeDeactiveClass() {
    setTimeout(() => {
      site.classList.remove("navbar-deactive-site-wrapper");
      mobileNavbar.classList.add("hidden");
    }, 500);
  }
  function handleSeen(e) {
    setSeen(e.target.innerText.toLowerCase());
  }
  console.log(seen);

  return (
    <div
      className={
        open
          ? "h-screen w-screen overflow-hidden  bg-auto bg-center bg-no-repeat blur-lg bg-space  min-h-screen px-3  font-sans border-blue-900 border-b-16"
          : " h-screen w-screen  bg-space bg-cover bg-center bg-no-repeat sm:w-full sm:min-h-screen overflow-hidden  font-sans sm:bg-cover border-blue-900 "
      }
    >
      {/* <div className=" pointer-events-none bg-gradient-to-b from-black/30 to-transparent" /> */}
      <div className=" justify-center items-center ">
        {/* <div className="flex justify-end items-end "> */}
      </div>
      <div class=" md:block main-navbar bg-space h-screen md:h-[5rem] text-gray-100 py-6 md:py-0  md:static w-screen hidden">
        <div class="container mx-auto px-5 lg:px-0">
          <div class="select-none flex flex-col md:flex-row justify-between md:items-start">
            <div class=" logo font-black text-2xl select-none cursor-pointer w-full text-center md:text-left relative">
              <span
                id="closeButton"
                onClick={() => {
                  site.classList.remove("navbar-active-site-wrapper");
                  site.classList.add("navbar-deactive-site-wrapper");
                  bodyTag.classList.remove("active-navbar-body");
                  removeDeactiveClass();
                }}
                class="inline-block md:hidden select-none rotate-45 absolute left-5 -top-3 font-thin text-6xl"
              >
                +
              </span>
              <span class="selecet-none">CrypsterAI</span>
            </div>
            <div class="navbar order-1 md:order-0">
              <ul class="flex flex-col md:flex-row md:items-center md:space-x-2">
                <li name="overview" onClick={handleSeen}>
                  <a
                    href="#"
                    class="block font-medium text-gray-200 p-3 hover:bg-black hover:bg-opacity-25 transition-all duration-200 flex md:inline-block items-center space-x-2 md:space-x-0"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 block md:hidden"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                    </span>
                    <span>Overview</span>
                  </a>
                </li>
                <li name="portfolio" onClick={handleSeen}>
                  <a
                    href="#"
                    class="block font-medium text-gray-200 p-3 hover:bg-red hover:bg-opacity-25 transition-all duration-200 flex md:inline-block items-center space-x-2 md:space-x-0"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 block md:hidden"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </span>
                    <span>Portfolio</span>
                  </a>
                </li>
                <li name="news" onClick={handleSeen}>
                  <a
                    href="#"
                    class="block font-medium text-gray-200 p-3 hover:bg-black hover:bg-opacity-25 transition-all duration-200 flex md:inline-block items-center space-x-2 md:space-x-0"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 block md:hidden"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </span>
                    <span>News</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block font-medium text-gray-200 p-3 hover:bg-black hover:bg-opacity-25 transition-all duration-200 flex md:inline-block items-center space-x-2 md:space-x-0"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 block md:hidden"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                    </span>
                    <span>Optimization</span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="flex md:hidden space-x-3 p-[8px] cursor-pointer group order-0 md:order-1 mt-8 md:mt-0">
              <div class="group flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 relative">
                <div class="order-1 md:order-0 flex flex-col md:flex-row md:items-center w-full md:space-x-2 mt-8 md:mt-0 mr-2">
                  <span class="block md:hidden font-thin md:px-5 lg:px-0">
                    Hello,
                  </span>
                  <span class="block pr-2 whitespace-nowrap">Luis Escobar</span>
                </div>
                <img
                  src="./images/user.jpeg"
                  class="order-0 md:order-1 w-16 md:w-8 rounded-full block"
                  alt="user image"
                />
                <ul class="hidden lg:group-hover:block z-10 md:group-hover:block whitespace-nowrap links md:absolute md:bg-white md:text-gray-900 md:top-[40px] md:right-0 md:border border-t-0 border-gray-300 rounded-b">
                  <li>
                    {" "}
                    <a href="$" class="px-8 py-3 block hover:bg-gray-100">
                      Profile
                    </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a
                      onClick={logout}
                      href="$"
                      class="px-8 py-3 block hover:bg-gray-100"
                    >
                      Sign Out
                    </a>{" "}
                  </li>
                </ul>
              </div>
            </div>
            <div onClick={logout} class="order-2">
              <a
                href="#"
                class="p-3 block md:hidden hover:bg-black hover:bg-opacity-25 flex md:inline-block items-center space-x-2 md:space-x-0"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 block md:hidden"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </span>
                <span>Logout</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div id="siteWrapper" class="site-wrapper lg:mt-8 rounded-full ">
        <div class="mobile-navbar-header block md:hidden bg-black rounded-lg">
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
                class="h-6 w-6 block md:hidden"
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
              <button
                onClick={handleAdd}
                className=" p-3 rounded-full shadow-xl shadow-black border bg-red-500 border-black-500 hover:bg-red-200"
              >
                {" "}
                Add
              </button>
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

        {/* {shown === null ? null : shown && inPort === 0 ? (
          <button
            onClick={handleAdd}
            className=" p-3 rounded-full shadow-xl shadow-black border bg-red-500 border-black-500 hover:bg-red-200"
          >
            {" "}
            Add
          </button>
        ) : (
          <button
            onClick={handleDelete}
            className=" p-3 rounded-full shadow-xl shadow-black border bg-red-500 border-black-500 hover:bg-red-200"
          >
            {" "}
            Remove
          </button>
        )} */}
        {/* <button
          onClick={logout}
          className=" p-3 ml-3 rounded-full shadow-xl shadow-black border bg-yellow-500 border-blue-500 hover:bg-yellow-200"
        >
          Logout
        </button> */}
        <h1 className="relative text-2xl text-white font-semibold text-center uppercase">
          {shown ? `${shown.id}` : "Token"}
        </h1>

        <div className="flex items-start mt-4 ">
          <LeftPane
            chartForm={chartForm}
            seen={seen}
            results={results}
            click={click}
            s={userC}
            a={cryptoData}
            brolic={brolic}
            shown={shown}
            setshown={setshown}
            handleSelectedResult={handleSelectedResult}
          />
          <div className="flex w-fit flex-col relative">
            {/* <div className="flex w-full flex-col px-16 pt-6 relative"> */}
            {seen === "smac" ? (
              <Smac
                setSeen={setSeen}
                results={results}
                chartClick={chartClick}
                c={c}
                su={su}
                sd={sd}
                d={d}
                optimizerForm={optimizerForm}
                setoptimizerForm={setoptimizerForm}
                chartForm={chartForm}
                setChartForm={setChartForm}
                selctedResultSma1={selctedResultSma1}
                selctedResultSma2={selctedResultSma2}
                setclick={setclick}
                handleOptimizer={handleOptimizer}
                shown={shown}
              />
            ) : (
              <>
                <TopStats shown={shown} seen={seen} />
                <BottomStats shown={shown} seen={seen} />
                <Connections shown={shown} seen={seen} />
                <div className="relative flex flex-col ">
                  {/* <div className="absolute flex flex-col justify-center -translate-x-1/2 left-1/2 top-52 p-4"> */}
                  {shown ? (
                    <img
                      className="shadow-2xl shadow-blue rounded-full w-3 h-3  bg-black  "
                      // className="shadow-2xl shadow-blue  w-[20rem] h-[20rem] rounded-full  bg-black  "
                      src={shown ? shown.image.large : null}
                      alt=""
                    />
                  ) : (
                    <h1 className="font-bold text-white text-[100px] animate-bounce mt-3">
                      Select Token
                    </h1>
                  )}
                </div>
                <div className="relative flex self-center pt-24">
                  <span className="text-white uppercase text-xxxs"></span>
                  <span className="uppercase text-red text-xs"></span>
                </div>
              </>
            )}
          </div>
          <RightPane seen={seen} shown={shown} shownmkt={shownmkt} />
        </div>

        <div className="flex justify-between ">
          <div className="flex items-center w-80">
            {seen === "smac" && results ? (
              <button
                onClick={() => setclick(false)}
                className={
                  click === false
                    ? "relative z-10 px-8 py-6 text-sm font-bold uppercase bg-white rounded"
                    : "relative -translate-x-1 px-8 py-4 border rounded text-white text-sm font-bold border-gray-600/50 bg-opacity-[0.1] uppercase"
                }
              >
                Results
              </button>
            ) : null}
            <button
              onClick={() => setclick(true)}
              className={
                click === false
                  ? "relative -translate-x-1 px-8 py-4 border rounded text-white text-sm font-bold border-gray-600/50 bg-opacity-[0.1] uppercase"
                  : "relative z-10 px-8 py-6 text-sm font-bold uppercase bg-white rounded"
              }
            >
              Portfolio
            </button>
          </div>
          <Dock setclick={setclick} setSeen={setSeen} />

          <div className="flex items-center justify-end space-x-5 w-80 ">
            <span className="tracking-wider text-gray-600 text-xxs whitespace-nowrap">
              Luis Alfredo Escobar
            </span>
            {/* <button
              onClick={() => setOpen(true)}
              className="px-4 py-4 border rounded text-white text-sm font-bold border-gray-600/50 bg-gray-900 bg-opacity-[0.1] uppercase"
            >
              Add More Tokens
            </button> */}
          </div>
        </div>
        <CryptoCardPortal
          chartForm={chartForm}
          optimizerForm={optimizerForm}
          setChartForm={setChartForm}
          setoptimizerForm={setoptimizerForm}
          setSeen={setSeen}
          setclick={setclick}
          popout={popout}
          brolic={brolic}
          setshown={setshown}
          setOpenDash={setOpen}
          openDash={open}
          userPortfolio={userPortfolio}
        />
      </div>
    </div>
  );
}

export default Dashboard;
