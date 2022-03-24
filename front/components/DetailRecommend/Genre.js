import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Typography, Card, Row, Col, Divider } from 'antd';
import Router from 'next/router';
import Slider from 'react-slick';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';
import Image from 'rc-image';

// import styled from 'styled-components';

const { Title } = Typography; // Typograpy.Title
const { Meta } = Card;

const NextArrow = ({ onClick }) => {
  return (
    <div className="arrow next" onClick={onClick}>
      <MdArrowForwardIos />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className="arrow prev" onClick={onClick}>
      <MdArrowBackIos />
    </div>
  );
};

const GenreRecommend = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const onErrorImg = e => {
    e.target.src = '/img/default_img.jpg';
  };

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/genre_rec/${Router.query.id}/`)
      .then(res => {
        setMovies(res.data);
      });
  }, []);

  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        <Title level={5}>비슷한 장르 영화 추천</Title>
      </Divider>
      <Slider {...settings}>
        {movies.map(movie => {
          return (
            <Image
              key={movie.id}
              alt={`${movie.title} 포스터 이미지`}
                  src={movie.poster_path}
                  onError={onErrorImg}
                  height="280"
              onClick={() => Router.push(`/movie/${movie.id}`)}
            />
          );
        })}
      </Slider>
    </>
  );
};

export default GenreRecommend;
