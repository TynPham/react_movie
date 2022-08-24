import React, { useEffect, useRef, useState } from "react";
import {useNavigate} from "react-router-dom";
import SwiperCore , {Autoplay} from "swiper";
import {Swiper , SwiperSlide} from 'swiper/react';
import Button , {OutlineButton} from '../Button/Button'
import Modal, {ModalContent} from "../modal/Modal";

import tmdbApi, { movieType, category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import './HeroSlide.scss'


function HeroSlice(props) {

    SwiperCore.use([Autoplay])

  const [movieItem, setMovieItem] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        setMovieItem(response.results.slice(0 , 4));
      } catch (error) {}
    };
    getMovies();
  }, []);

  return (
  <div className="hero-slide">
    <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        // autoplay={{delay: 3000}}
    >
        {movieItem.map((item , index) => (
            <SwiperSlide key={index}>
                {({isActive}) => (
                    <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                )}
            </SwiperSlide>
        ))}
    </Swiper>
    {movieItem.map((item , index) => (
      <TrailerModal key={index} item={item}/>
    ))}
  </div>
  );
}

const HeroSlideItem = (props) => {
    let history = useNavigate();
    const item = props.item;
    const backGround = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

    const setMovieActive = async () => {
      const modal = document.querySelector(`#modal_${item.id}`);
      const videos = await tmdbApi.getVideos(category.movie , item.id);
      if (videos.results.length > 0) {
        const videoSrc = 'https:/www.youtube.com/embed/' + videos.results[1].key;
        modal.querySelector('.modal_content > iframe').setAttribute('src' , videoSrc)
        
      }
      else {
        modal.querySelector('.modal_content').innerHTML = 'No Trailer';
      }
      modal.classList.toggle('active')
    }
   
    return (
      <div 
        className={`hero-slide_item ${props.className}`}
        style={{backgroundImage: `url(${backGround})`}}
        >
        <div className="hero-slide_item_content container">
          <div className="hero-slide_item_content_info">
              <h2 className="title">{item.title}</h2>
              <div className="overview">{item.overview}</div>
              <div className="btns">
                <Button onClick = {() => history('/movie/' + item.id)}>
                  watch now
                </Button>
                <OutlineButton onClick = {setMovieActive}>
                  watch trailer
                </OutlineButton>
              </div>
          </div>
          <div className="hero-slide_item_content_poster">
            <img src={apiConfig.w500img(item.poster_path)} alt="poster" />
          </div>
        </div>
      </div>
    )
}
const TrailerModal = (props) => {
  const item = props.item;
  const iframeRef = useRef();

  const onClose = () => {
    iframeRef.current.setAttribute('src' , '');
  }

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
      </ModalContent>
    </Modal>
  )
}

export default HeroSlice;
