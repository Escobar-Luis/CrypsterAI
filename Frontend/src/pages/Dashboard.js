import React, { useState, useEffect, useContext } from "react";
import LeftPane from "./dashboard/LeftPane";
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
import Navbar from "../components/Navbar";
import Wrapper from "../components/Wrapper";
import Title from "../components/Title";

function Dashboard() {
  let { user, refetch, first, setIsLogged } = useContext(AuthContext);
  const [p, setp] = useState([]);
  const [seen, setSeen] = useState("sentiment");
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

  // Functionality to add Token from NavBar
  const CREATE_TOKEN = gql`
    mutation token($name: String!, $userId: Int!) {
      createToken(name: $name, userId: $userId) {
        token
      }
    }
  `;
  const [createToken, {}] = useMutation(CREATE_TOKEN, {
    update: (proxy, mutationResult) => {
      console.log(mutationResult);
    },
  });

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
  Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [
      this.getFullYear() - 1,
      (mm > 9 ? "" : "0") + mm,
      (dd > 9 ? "" : "0") + dd,
    ].join("-");
  };

  var date = new Date();
  const [chartForm, setChartForm] = useState({
    date: date.yyyymmdd(),
    sma1: 12,
    sma2: 29,
    ticker: shown ? `${shown.symbol.toUpperCase()}-USD` : " ",
  });

  const [optimizerForm, setoptimizerForm] = useState({
    date: date.yyyymmdd(),
    length: 10,
    ticker: shown ? `${shown.symbol.toUpperCase()}-USD` : " ",
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
      setSeen("sentiment");
      setclick(true);
      console.log(mutationResult);
    },
  });

  function popout(c) {
    setshown(c);
  }
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

  let inPort = userC?.filter((c) => shown?.id === c?.name).length;

  return (
    <div
      className={
        open
          ? "h-screen w-screen overflow-hidden  bg-auto bg-center bg-no-repeat blur-lg bg-space  min-h-screen px-3  font-sans border-blue-900 border-b-16"
          : "z-3 h-screen w-screen  bg-space   bg-center bg-no-repeat sm:w-full sm:min-h-screen overflow-clip  font-sans sm:bg-cover border-blue-900 "
      }
    >
      <Navbar setSeen={setSeen} setIsLogged={setIsLogged} />

      <div id="siteWrapper" class="site-wrapper  rounded-full ">
        <Wrapper
          inPort={inPort}
          setOpen={setOpen}
          shown={shown}
          handleAdd={handleAdd}
          handleDelete={handleDelete}
        />

        <Title shown={shown} />

        {/* <div className="flex items-start mt-4 ">
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
          /> */}
        <div className=" flex flex-col  relatice">
          {/* <div className="flex w-full flex-col px-16 pt-6 relative"> */}
          {seen === "optimizer" ? (
            <>
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
              {/* <Dock setclick={setclick} setSeen={setSeen} /> */}
            </>
          ) : (
            <>
              <TopStats shown={shown} seen={seen} />

              <RightPane seen={seen} shown={shown} shownmkt={shownmkt} />
              <BottomStats shown={shown} seen={seen} />
              <Connections shown={shown} seen={seen} />
              <div className="relative flex flex-col ">
                {/* <div className="absolute flex flex-col justify-center -translate-x-1/2 left-1/2 top-52 p-4"> */}
              </div>
              <div className="relative flex self-center pt-24">
                <span className="text-white uppercase text-xxxs"></span>
                <span className="uppercase text-red text-xs"></span>
              </div>
            </>
          )}
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
            {/* <button
            onClick={() => setclick(true)}
            className={
              click === false
                ? "relative -translate-x-1 px-8 py-4 border rounded text-white text-sm font-bold border-gray-600/50 bg-opacity-[0.1] uppercase"
                : "relative z-10 px-8 py-6 text-sm font-bold uppercase bg-white rounded"
            }
          >
            Portfolio
          </button> */}
          </div>

          {/* <div className="flex items-center justify-end space-x-5 w-80 ">
            <span className="tracking-wider text-gray-600 text-xxs whitespace-nowrap">
              Luis Alfredo Escobar
            </span> */}
          {/* <button
              onClick={() => setOpen(true)}
              className="px-4 py-4 border rounded text-white text-sm font-bold border-gray-600/50 bg-gray-900 bg-opacity-[0.1] uppercase"
            >
              Add More Tokens
            </button> */}
          {/* </div> */}
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
    // </div>
  );
}

export default Dashboard;
