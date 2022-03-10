import { createContext, useState, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import DashboardContext from "./DashboardContext";
const OptimizationContext = createContext();

export default OptimizationContext;

export const OptimizationProvider = ({ children }) => {
  let { shown } = useContext(DashboardContext);

  const [results, setResults] = useState(null);
  const [selctedResultSma1, setselctedResultSma1] = useState(null);
  const [selctedResultSma2, setselctedResultSma2] = useState(null);
  const [c, setc] = useState(null);
  const [su, setsu] = useState(null);
  const [sd, setsd] = useState(null);
  const [d, setd] = useState(null);
  const [open, setopen] = useState(false);
  const [openDos, setopenDos] = useState(false);
    /**------------------------------------------------------------------------
   *                         Stringify Date to 1 Year Ago
   *------------------------------------------------------------------------**/
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
    /**------------------------------------------------------------------------
   *                         Chart & SMA User Form States
   *------------------------------------------------------------------------**/

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
  /**------------------------------------------------------------------------
   *                         Results Table
   *------------------------------------------------------------------------**/

   function handleSelectedResult(obj) {
    setChartForm({ ...chartForm, sma1: obj.sma1, sma2: obj.sma2 });
    chartClick();
  }
  function handleOptimizer(r) {
    setResults(r);
  }
    /**------------------------------------------------------------------------
   *                         SMA CHART
   *------------------------------------------------------------------------**/
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
      console.log(smau)
      setc(c);
      setsu(smau);
      setsd(smad);
      setd(all);
    },
  });
  /**------------------------------------------------------------------------
   *                         SMA OPTIMIZER
   *------------------------------------------------------------------------**/
  const CREATE_SMAC = gql`
    mutation smac($date: String!, $length: Int!, $ticker: String!) {
      smaOptimizer(date: $date, length: $length, ticker: $ticker) {
        res
      }
    }
  `;
  const [smaOptimizer, { loading }] = useMutation(CREATE_SMAC, {
    update: (proxy, mutationResult) => {
      const x = mutationResult.data.smaOptimizer.res;
      console.log(x);
      const y = x[0];
      setChartForm({
        ...chartForm,
        date: optimizerForm.date,
        sma1: y.sma1,
        sma2: y.sma2,
      });
      handleOptimizer(x);
      chartClick();

    },
  });
  console.log(loading)
  function handleClick(x) {
    console.log("click");
    if (optimizerForm.date === "Pick A Date") {
      alert("Invalid Date");
    } else if (optimizerForm.length === "Pick A Length") {
      alert("Invalid Length");
    } else {
      setopenDos(false);
      setopen(false);
      smaOptimizer({
        variables: {
          date: optimizerForm.date,
          length: optimizerForm.length,
          ticker:
            optimizerForm.ticker === "ICP-USD"
              ? "ISP-USD"
              : optimizerForm.ticker,
          // ticker: optimizerForm.ticker
        },
      });
    x(true)}
  }
console.log(optimizerForm, chartForm)
  let contextData = {
    chartForm: chartForm,
    optimizerForm: optimizerForm,
    setChartForm: setChartForm,
    setoptimizerForm: setoptimizerForm,
    results:results,
    openDos:openDos,
    setopenDos:setopenDos,
    open:open,
    setopen:setopen,
    loading:loading,
    c:c,
    su:su,
    sd:sd,
    d:d,
    handleClick:handleClick

  };

  return (
    <OptimizationContext.Provider value={contextData}>
      {children}
    </OptimizationContext.Provider>
  );
};
