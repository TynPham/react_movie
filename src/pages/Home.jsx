import React from "react";
import { Link } from "react-router-dom";
import { OutlineButton } from "../Components/Button/Button";
import HeroSlide from "../Components/HeroSlice/HeroSlide";
import MovieList from "../Components/Movie-list/MovieList";
import { category, movieType, tvType } from "../api/tmdbApi";

function Home(props) {
  return (
    <div>
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <div className="section_header mb-2">
            <h2>Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </div>
        <div className="section mb-3">
          <div className="section_header mb-2">
            <h2>Top Rated Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>
      </div>
        <div className="section mb-3">
          <div className="section_header mb-2">
            <h2>Top rated TV</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.top_rated} />
        </div>
    </div>
  );
}

export default Home;
