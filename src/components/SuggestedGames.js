import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const renderCardGame = (src, i) => (
  <div key={i}>
    <a href="en-gb/play/book-of-ra-deluxe">
      <img height="246" src={src} alt={src} />
    </a>
  </div>
);

export default ({ games }) => (
  <Carousel emulateTouch centerMode showThumbs={false}>
    {games.map(renderCardGame)}
  </Carousel>
);
