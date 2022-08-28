import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/tmdbApi";
import MovieList from "../../Components/Movie-list/MovieList";
import CastList from "./CastList";

import "./Detail.scss";
import VideoList from "./VideoList";

function Detail(props) {
  const { category, id } = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content_poster">
              <div
                className="movie-content_poster_img"
                style={{
                  backgroundImage: `url(${apiConfig.w500img(
                    item.poster_path || item.backdrop_path
                  )})`,
                }}
              ></div>
            </div>
            <div className="movie-content_info">
                <div className="title">{item.title || item.name}</div>
                <div className="genres">
                    {item.genres && item.genres.slice(0 , 5).map((genre , index) => (
                        <span key={index} className='genres_item'>{genre.name}</span>
                    ))}
                </div>
                <p className="overview">{item.overview}</p>
                <div className="cast">
                    <div className="section_header">
                        <h2>Casts</h2>
                    </div>
                    <CastList id={item.id}/>
                </div>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id}/>
            </div>
          </div>
          <div className="section mb-3">
            <div className="section_header mb-2">
              <h2>Similar</h2>
            </div>
            <MovieList category={category} type='similar' id={item.id}/>
          </div>
        </>
      )}
    </>
  );
}

export default Detail;
