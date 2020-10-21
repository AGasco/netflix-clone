import React, { useState, useEffect } from "react";
import axios from "./../axios";
import "./../style/Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseURL = "http://image.tmdb.org/t/p/w185/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  //useEffect = A snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const options = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie) => {
    if (trailerUrl) setTrailerUrl("");
    else {
      await movieTrailer(movie?.name || "" || movie?.title, {
        id: true,
      })
        .then((response) => {
          console.log("response", response);
          setTrailerUrl(response);
        })
        .catch((error) => console.log("error", error));
    }
  };

  return (
    <div className="row">
      <h3 className="row__title">
        <strong>{title}</strong>
      </h3>
      <div className="row__posters">
        {movies.map((m) =>
          m.poster_path != null ? (
            <img
              key={m.id}
              onClick={() => handleClick(m)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={baseURL.concat(isLargeRow ? m.poster_path : m.backdrop_path)}
              alt={m.original_name}
            />
          ) : (
            ""
          )
        )}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={options} />}
    </div>
  );
}

export default Row;
