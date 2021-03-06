import React, { useState, useContext } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import OptimizationContext from "../../context/OptimizationContext";
import ChartPortal from "./ChartPortal";
import LeftPane from "../dashboard/LeftPane";
function Chart({}) {
  let {
    loading,
    handleClick,
    chartForm,
    c,
    su,
    sd,
    d,
    seeChart,
    setSeeChart,
    onMobile,
    results,
    optimizedOnce,
  } = useContext(OptimizationContext);
  const [seeAnn, setSeeAnn] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  require("highcharts/modules/annotations")(Highcharts);
  function smaSignal(data) {
    let labels = [];
    let inPosition = 0;
    data?.map((day) => {
      if (day.sma1 > day.sma2 && inPosition === 0) {
        let ann = {
          point: {
            x: day.date,
            y: day.sma1,
            xAxis: 0,
            yAxis: 0,
          },

          format: `Buy at ${
            day.sma1 < 0.01
              ? day.sma1.toLocaleString(undefined, {
                  minimumFractionDigits: 6,
                  maximumFractionDigits: 6,
                })
              : day.sma1.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
          }`,
          shadow: {
            color: "green",
            offsetX: -1,
            opacity: 0.9,
          },
        };
        labels.push(ann);
        inPosition = 1;
      } else if (inPosition === 1 && day.sma1 < day.sma2) {
        inPosition = 0;
      } else {
        return null;
      }
    });
    return labels;
  }

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const options = {
    title: {
      text: "Simple Moving Crossover",
      style: {
        color: "white",
        fontWeight: "bold",
      },
    },
    xAxis: {
      //   type: "datetime",/
      labels: {
        style: {
          color: "white",
        },
      },
    },
    yAxis: {
      //   type: "datetime",/
      labels: {
        style: {
          color: "white",
        },
      },
    },
    legend: {
      enabled: true,
      itemStyle: { color: "white" },
      itemHoverStyle: { color: "purple" },
    },

    chart: {
      plotAreaHeight: 600,
     reflow:true,
      zoomType: "xy",
      borderWidth: 1,
      resetZoomButton: {
        position: {
          x: -10,
          y: 8,
        },
        relativeTo: "chart",
        theme: {
          fill: "black",
          stroke: "white",
          r: 5,
          style: {
            color: "white",
          },
          states: {
            hover: {
              fill: "white",
              stroke: "black",
              r: 5,
              style: {
                color: "black",
              },
            },
          },
        },
      },
      //   zoomBySingleTouch: true,
      backgroundColor: "#0E1135",
      borderRadius: 1,
      shadow: true,
      color: "white",
      shadow: {
        color: "white",
        offsetX: 0,
        opacity: 1,
      },

      spacingRight: 10,
      navigator: {
        outlineColor: "white",
        outlineWidth: 2,
      },
    },
    rangeSelector: {
      buttonTheme: {
        // styles for the buttons
        fill: "none",
        stroke: "none",
        "stroke-width": 0,
        r: 10,
        style: {
          color: "white",
          fontWeight: "bold",
        },
        states: {
          hover: {
            fill: "white",
            style: {
              color: "black",
            },
          },
          select: {
            fill: "white",
            style: {
              color: "black",
            },
          },
          // disabled: { ... }
        },
      },
      inputBoxBorderColor: "white",
      inputBoxWidth: 120,
      inputBoxHeight: 18,

      inputStyle: {
        color: "white",
        fontWeight: "bold",
      },
      labelStyle: {
        color: "white",
        fontWeight: "bold",
      },
      selected: 5,
    },

    series: [
      {
        type: "line",
        data: c,
        name: "Close",
        color: "white",
        lineWidth: 2,
      },
      {
        type: "line",
        data: su,
        name: `SMA Fast (${chartForm.sma1})`,
        color: "red",
        lineWidth: 1,
      },
      {
        type: "line",
        data: sd,
        name: `SMA Slow (${chartForm.sma2})`,
        color: "green",
        lineWidth: 1,
      },
    ],
    annotations: [
      {
        events: {
          // click: function(e){
          //     console.log(e)
          //     Toast.fire({
          //         icon: 'success',
          //         title: e.label
          //       })
          // }
        },
        crop: false,
        shape: [
          {
            storke: "white",
          },
        ],
        draggable: "xy",
        labelOptions: {
          backgroundColor: "white",
          borderRadius: 10,
          borderColor: "white",
          shape: "callout",
          shadow: true,
          // distance: 15,
          padding: 5,
          allowOverlap: true,
        },

        labels: smaSignal(d),
        visible: seeAnn,
      },
    ],
    // yAxis:[{
    //     color: 'white'
    // }]
  };

  return (
    <div className="w-screen h-screen">
      <div className="flex items-center justify-center ">
        {" "}
        <button
          className=" mr-3 mt-3 p-3 rounded-full shadow-xl shadow-black border bg-red-500 border-black-500 hover:bg-red-200 text-center"
          onClick={handleClick}
        >
          SMA Optimization
        </button>
      </div>

      {onMobile === "mobile" ? (
        <>
          {/* <button
            onClick={() => {
              setSeeChart(!seeChart);
            }}
            id="auto"
          >
            Show Chart
          </button> */}
          <div className="flex justify-center items-center mx-auto">
            <LeftPane />
          </div>
        </>
      ) : onMobile !== "mobile" ? (
        <div className="flex justify-start items-start h-screen w-screen">
          {results ? <LeftPane /> : null}

          
            {c ? (
           
             <div className=" flex-col flex grow h-screen ">
             
                <HighchartsReact
                className='h-[30rem]'
                  highcharts={Highcharts}
                  constructorType={"stockChart"}
                  options={options}
                />
            

                <div className="flex justify-center items-center shrink">
                  <button
                    className="border p-2 rounded-xl bg-black text-white w-fit"
                    onClick={() => {
                      setSeeAnn(!seeAnn);
                      setIsClicked(!isClicked)
                    }}
                    id="auto"
                  >
                    {isClicked?"Show Labels" : "Hide labels"}
                  </button>
                </div> 
                </div>
              
            ) : optimizedOnce ? (
              <div className="flex items-center justify-center mx-auto h-[30rem] w-[30rem]">
                <lottie-player
                  src="https://assets4.lottiefiles.com/packages/lf20_m2igjaux.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                ></lottie-player>
              </div>
            ) : null}
        </div>
      ) : null}
      <ChartPortal
        options={options}
        seeChart={seeChart}
        setSeeChart={setSeeChart}
        seeAnn={seeAnn}
        setSeeAnn={setSeeAnn}
        smaSignal={smaSignal}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
      />
    </div>
  );
}

export default Chart;
