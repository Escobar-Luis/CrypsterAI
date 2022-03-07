import React, { useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";

function Chart({
  s,
  shown,
  selctedResultSma2,
  selctedResultSma1,
  setChartForm,
  chartForm,
  c,
  su,
  sd,
  d,
  chartClick,
  results,
  loading,
}) {
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

          format: `Buy at ${day.sma1.toLocaleString(undefined, {
            minimumFractionDigits: 6,
            maximumFractionDigits: 6,
          })}`,
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

      height: 400,
      width: 800,
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
            fill: "black",
          },
          select: {
            fill: "black",
            style: {
              color: "white",
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
      },
    ],
    // yAxis:[{
    //     color: 'white'
    // }]
  };
  console.log(loading);
  return (
    <div className="overflow-x-hidden">
      {shown ? (
        <>
          <button
            className=" mr-3 mt-3 p-3 rounded-full shadow-xl shadow-black border bg-red-500 border-black-500 hover:bg-red-200"
            onClick={s}
          >
            SMA Optimization
          </button>
          {/* <div className="absolute flex  justify-center -translate-x-1/3 left-1/3 top-[10rem] p-4">
            <img
              className={
                c
                  ? "shadow-2xl shadow-blue  w-[20rem] h-[20rem] rounded-full  bg-black hidden "
                  : "shadow-2xl shadow-blue  w-[380px] h-auto rounded-full  bg-black "
              }
              src={shown ? shown.image.large : null}
              alt=""
            />
          </div> */}
        </>
      ) : (
        <div className="absolute flex  justify-center -translate-x-1/2 left-1/3 top-[15rem] p-4">
          <h1 className="font-bold text-[100px] animate-bounce mt-3">
            Select Token
          </h1>
        </div>
      )}
      {/* {results? 
      <button
        onClick={chartClick}
        className="bg-red-500 border border-white rounded-full my-3 p-3 "
      >
        Chart
      </button>:null} */}
      {c ? (
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={options}
        />
      ) : null}
    </div>
  );
}

export default Chart;
