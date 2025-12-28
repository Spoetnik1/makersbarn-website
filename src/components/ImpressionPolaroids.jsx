import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import './ImpressionPolaroids.css';

import mainHouse from '../assets/images/main-house.jpg'
import hayHouseSun from '../assets/images/hay-house-against-sun.jpg'
import atticBeds from '../assets/images/attic-beds.jpg'
import cosmosView from '../assets/images/cosmos-view-living-room.jpg'
import sauna from '../assets/images/sauna.jpg'
import teahouse from '../assets/images/teahous-with-chair.jpg'
import cosmosCouch from '../assets/images/cosmos-luxury-couch.jpg'
import doubleEnsuite from '../assets/images/double-ensuite.jpg'

export const ImpressionPolaroids = () => {
  return (
    <section className="impression-polaroids">
      <div className="impression-header">
        <p className="impression-kicker">A little impression</p>
        <h2 className="impression-title">Slow down, look around.</h2>
        <p className="impression-subtitle">
          Spaces to focus, wander, nap, write, reflect, and be together. Here's a glimpse of what
          your retreat might feel like.
        </p>
      </div>

      <div className="polaroids-container">
        <div className="polaroids-background-logo">
          <img src="/tmb-logo.webp" alt="Makers Barn Logo" />
        </div>
        <Cards />
      </div>
    </section>
  );
};

const Cards = () => {
  const containerRef = useRef(null);

  return (
    <div className="polaroids-cards-container" ref={containerRef}>
      <Card
        containerRef={containerRef}
        src={mainHouse}
        alt="The Makers Barn main house in the landscape"
        rotate="6deg"
        top="15%"
        left="25%"
        className="w-36 md:w-56"
      />
      <Card
        containerRef={containerRef}
        src={hayHouseSun}
        alt="Hay House glowing in the evening sun"
        rotate="12deg"
        top="35%"
        left="60%"
        className="w-24 md:w-48"
      />
      <Card
        containerRef={containerRef}
        src={atticBeds}
        alt="Attic bedroom with comfy beds"
        rotate="-6deg"
        top="15%"
        left="40%"
        className="w-52 md:w-80"
      />
      <Card
        containerRef={containerRef}
        src={cosmosView}
        alt="View from the Cosmos living room"
        rotate="8deg"
        top="40%"
        left="40%"
        className="w-48 md:w-72"
      />
      <Card
        containerRef={containerRef}
        src={sauna}
        alt="Outdoor sauna at The Makers Barn"
        rotate="18deg"
        top="15%"
        left="65%"
        className="w-40 md:w-64"
      />
      <Card
        containerRef={containerRef}
        src={teahouse}
        alt="Teahouse with a chair and window"
        rotate="-3deg"
        top="28%"
        left="55%"
        className="w-24 md:w-48"
      />
      <Card
        containerRef={containerRef}
        src={cosmosCouch}
        alt="Cosy couch in the Cosmos space"
        rotate="-8deg"
        top="48%"
        left="20%"
        className="w-32 md:w-60"
      />
      <Card
        containerRef={containerRef}
        src={doubleEnsuite}
        alt="Double ensuite bedroom"
        rotate="10deg"
        top="52%"
        left="70%"
        className="w-28 md:w-52"
      />
    </div>
  );
};

const Card = ({ containerRef, src, alt, top, left, rotate, className }) => {
  const [zIndex, setZIndex] = useState(0);

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");

    let maxZIndex = -Infinity;

    els.forEach((el) => {
      let zIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index")
      );

      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });

    setZIndex(maxZIndex + 1);
  };

  return (
    <motion.img
      onMouseDown={updateZIndex}
      style={{
        top,
        left,
        rotate,
        zIndex,
      }}
      className={twMerge(
        "drag-elements absolute w-48 bg-neutral-200 p-1 pb-4",
        className
      )}
      src={src}
      alt={alt}
      drag
      dragConstraints={containerRef}
      dragElastic={0.65}
    />
  );
};

export default ImpressionPolaroids;

