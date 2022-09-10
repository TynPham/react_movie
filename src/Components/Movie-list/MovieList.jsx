import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "./MovieList.scss";
import tmdbApi, { category } from "../../api/tmdbApi";
import MovieCard from "../Movie-card/MovieCard";

function MovieList(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};

      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie: {
            response = await tmdbApi.getMoviesList(props.type, { params });
            break;
          }
          default: {
            response = await tmdbApi.getTvList(props.type, { params });
          }
        }
      } else {
        response = await tmdbApi.similar(props.category, props.id);
      }
      setItems(response.results);
    };
    getList();
  }, []);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <MovieCard item={item} category={props.category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MovieList;
