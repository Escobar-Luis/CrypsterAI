import React, { useEffect, useState, useContext } from "react";

import Article from "./Article";
import DashboardContext from "../../../context/DashboardContext";
import moment from 'moment';
moment().format();
function News() {
  const [news, setNews] = useState([]);
  let { shown } = useContext(DashboardContext);

  useEffect(() => {
    fetch(`https://free-news.p.rapidapi.com/v1/search?q=crypto-${shown.id}&lang=en`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "free-news.p.rapidapi.com",
        "x-rapidapi-key": "c63074207fmshe8e45c0cb0aa50bp1e8ff6jsnaa049528fd0a",
      },
    })
      .then((response) => response.json())
      .then((data) => {const sorted = data.articles.sort((a, b) => {
          return new Date(b.published_date)-new Date(a.published_date)
      })
      console.log(sorted)
          setNews(sorted)})
      .catch((err) => {
        console.error(err);
      });
  }, [shown]);

  return (
    <div>
      <div className="news-container grid gird-cols-1 sm:grid-cols-3 gap-3 overflow-scroll mx-1 h-screen pb-32">
        {news ? (
          news.map((n, ind) => {
            return <Article key={ind} art={n} />;
          })
        ) : (
          <div className="flex items-center justify-center mx-auto h-[20rem] w-[20rem]">
            <lottie-player
              src="https://assets4.lottiefiles.com/packages/lf20_m2igjaux.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
        )}
      </div>
    </div>
  );
}
export default News;
