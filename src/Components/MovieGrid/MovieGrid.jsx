import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import {useNavigate} from "react-router-dom";
import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import Button, { OutlineButton } from "../Button/Button";
import Input from "../Input/Input";
import MovieCard from "../Movie-card/MovieCard";

import "./MovieGrid.scss";

function MovieGrid(props) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (keyword === undefined) {
        const params = {};
        switch (props.category) {
          case category.movie: {
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });
            break;
          }
          default: {
            response = await tmdbApi.getTvList(tvType.popular, { params });
          }
        }
      } else {
        const params = {
          query: keyword,
        };
        response = await tmdbApi.search(props.category, { params });
      }
      setItems(response.results);
      setTotalPage(response.total_pages);
    };

    getList();
  }, [props.category, keyword]);

  const handleLoadmore = async () => {
    let response = null;
      if (keyword === undefined) {
        const params = {
            page: page + 1,
        };
        switch (props.category) {
          case category.movie: {
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });
            break;
          }
          default: {
            response = await tmdbApi.getTvList(tvType.popular, { params });
          }
        }
      } else {
        const params = {
            page: page + 1,
            query: keyword,
        };
        response = await tmdbApi.search(props.category, { params });
      }
      setItems([...items, ...response.results]);
      setPage(page + 1);
  }

  return (
    <>
        <div className="section mb-3">
            <MovieSearch category={props.category} keyword={keyword} />
        </div>
      <div className="movie-grid">
        {items.map((item, index) => (
          <MovieCard category={props.category} key={index} item={item} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid_loadMore">
            <OutlineButton className='small' onClick={handleLoadmore}>Load more</OutlineButton>
        </div> 
      ): null}
    </>
  );
}

const MovieSearch = (props) => {

    const history = useNavigate();

    const [keyword , setKeyword] = useState(props.keyword ? props.keyword : '');

    const goToSearch = useCallback(() => {
        if (keyword.trim().length > 0) {
            history(`/${category[props.category]}/search/${keyword}`);
            setKeyword('');
        }
    } , [keyword , props.category , history])

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        }
        document.addEventListener('keyup' , enterEvent);
        return () => {
            document.removeEventListener('keyup' , enterEvent);
        }
    } , [keyword , goToSearch])

    return (
        <div className="movie-search">
            <Input 
                type='text'
                placeholder = 'Enter keyword'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className='small' onClick={goToSearch}>Search</Button>
        </div>
    )
}

export default MovieGrid;
