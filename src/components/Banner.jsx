import React, { useState, useEffect } from "react";
import axios from "./../axios";
import requests from "./../requests";
import "./../style/Banner.css";

const baseURL = "http://image.tmdb.org/t/p/original";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(${baseURL.concat(movie?.backdrop_path)})`,
      }}
    >
      <div className="banner__content">
        <h2 className="banner__title">
          {movie?.title || movie?.original_name || movie?.name}
        </h2>
        <div className="banner__buttons">
          <button className="banner__btn" id="play-btn">
            Play
          </button>
          <button className="banner__btn" id="add-to-list-btn">
            My List
          </button>
        </div>
        <p className="banner__description">{truncate(movie?.overview, 150)}</p>
      </div>

      <div className="banner--fadeBottom"></div>
    </header>
  );
}

export default Banner;
