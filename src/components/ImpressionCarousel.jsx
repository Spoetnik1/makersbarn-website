import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import './ImpressionCarousel.css';

import atticBeds from '../assets/images/attic-beds.jpg'
import atticChill from '../assets/images/attic-chill.jpg'
import bennySmile from '../assets/images/benny-smile.jpg'
import cosmosCouch from '../assets/images/cosmos-luxury-couch.jpg'
import cosmosView from '../assets/images/cosmos-view-living-room.jpg'
import doubleEnsuite from '../assets/images/double-ensuite.jpg'
import ducks from '../assets/images/ducks.jpg'
import hayHouseSun from '../assets/images/hay-house-against-sun.jpg'
import hayHouseBench from '../assets/images/hay-house-bench-sunset.jpg'
import mainHouse from '../assets/images/main-house.jpg'
import outsideWalk from '../assets/images/outside-walk.jpg'
import sauna from '../assets/images/sauna.jpg'
import teahouse from '../assets/images/teahous-with-chair.jpg'
import quoteImage from '../assets/images/you-are-where-you-need-to-be.jpg'

const imgs = [
  mainHouse,
  hayHouseSun,
  atticBeds,
  cosmosView,
  cosmosCouch,
  atticChill,
  doubleEnsuite,
  sauna,
  teahouse,
  outsideWalk,
  ducks,
  bennySmile,
  quoteImage,
];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

export const ImpressionCarousel = () => {
  const [imgIndex, setImgIndex] = useState(0);

  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((pv) => {
          if (pv === imgs.length - 1) {
            return 0;
          }
          return pv + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, []);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  return (
    <section className="impression-carousel">
      <div className="impression-header">
        <p className="impression-kicker">A little impression</p>
        <h2 className="impression-title">Slow down, look around.</h2>
        <p className="impression-subtitle">
          Spaces to focus, wander, nap, write, reflect, and be together. Here's a glimpse of what
          your retreat might feel like.
        </p>
      </div>

      <div className="relative overflow-hidden carousel-container">
        <motion.div
          drag="x"
          dragConstraints={{
            left: 0,
            right: 0,
          }}
          style={{
            x: dragX,
          }}
          animate={{
            translateX: `-${imgIndex * 100}%`,
          }}
          transition={SPRING_OPTIONS}
          onDragEnd={onDragEnd}
          className="flex cursor-grab items-center active:cursor-grabbing"
        >
          <Images imgIndex={imgIndex} />
        </motion.div>

        <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
      </div>
    </section>
  );
};

const Images = ({ imgIndex }) => {
  return (
    <>
      {imgs.map((imgSrc, idx) => {
        return (
          <motion.div
            key={idx}
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            animate={{
              scale: imgIndex === idx ? 0.95 : 0.85,
            }}
            transition={SPRING_OPTIONS}
            className="carousel-image"
          />
        );
      })}
    </>
  );
};

const Dots = ({ imgIndex, setImgIndex }) => {
  return (
    <div className="carousel-dots">
      {imgs.map((_, idx) => {
        return (
          <button
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`carousel-dot ${idx === imgIndex ? "carousel-dot-active" : ""}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        );
      })}
    </div>
  );
};


export default ImpressionCarousel;

