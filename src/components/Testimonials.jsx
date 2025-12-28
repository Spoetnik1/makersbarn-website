import { motion } from "framer-motion";
import { useRef, useState } from "react";
import './Testimonials.css';
import nanaImage from '../assets/images/nana-stairs.jpg';
import bennyImage from '../assets/images/benny-smile.jpg';
import noudImage from '../assets/images/noud-banjo.jpg';

const Testimonials = () => {
  const [order, setOrder] = useState(["front", "second", "third", "back"]);

  const handleShuffle = () => {
    const orderCopy = [...order];
    orderCopy.unshift(orderCopy.pop());
    setOrder(orderCopy);
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <h2 className="testimonials-title">What our guests say</h2>
      </div>
      <div className="testimonials-container">
        <div className="testimonials-cards-wrapper">
          <Card
            imgUrl={nanaImage}
            testimonial="MakersBarn is pure magic. The combination of stunning countryside, thoughtful spaces, and the sauna made our retreat absolutely transformative. We left feeling renewed and deeply connected."
            author="Emma K. - Wellness Retreat Organizer"
            handleShuffle={handleShuffle}
            position={order[0]}
          />
          <Card
            imgUrl={bennyImage}
            testimonial="This is the most beautiful retreat space I've ever experienced. The attention to detail, the natural surroundings, and the peaceful atmosphere created the perfect environment for our team to reconnect and recharge."
            author="Marcus T. - Leadership Coach"
            handleShuffle={handleShuffle}
            position={order[1]}
          />
          <Card
            imgUrl={noudImage}
            testimonial="I've organized retreats all over Europe, and MakersBarn stands out as something truly special. The Dutch countryside setting, the warm hospitality, and the intimate spaces make it perfect for deep, meaningful work."
            author="Sophie L. - Workshop Facilitator"
            handleShuffle={handleShuffle}
            position={order[2]}
          />
          <Card
            imgUrl={nanaImage}
            testimonial="Our creative team found exactly what we needed at MakersBarn. The inspiring environment, surrounded by fields and nature, helped us break through creative blocks and produce our best work yet."
            author="David R. - Creative Director"
            handleShuffle={handleShuffle}
            position={order[3]}
          />
        </div>
      </div>
    </section>
  );
};

const Card = ({ handleShuffle, testimonial, position, imgUrl, author }) => {
  const mousePosRef = useRef(0);

  const onDragStart = (e) => {
    mousePosRef.current = e.clientX;
  };

  const onDragEnd = (e) => {
    const diff = mousePosRef.current - e.clientX;

    if (diff > 150) {
      handleShuffle();
    }

    mousePosRef.current = 0;
  };

  const x = position === "front" ? "0%" : position === "second" ? "25%" : position === "third" ? "50%" : "75%";
  const rotateZ =
    position === "front" ? "-8deg" : position === "second" ? "-3deg" : position === "third" ? "3deg" : "8deg";
  const zIndex = position === "front" ? "3" : position === "second" ? "2" : position === "third" ? "1" : "0";

  const draggable = position === "front";

  return (
    <motion.div
      style={{
        zIndex,
      }}
      animate={{ rotate: rotateZ, x }}
      drag
      dragElastic={0.35}
      dragListener={draggable}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      transition={{
        duration: 0.35,
      }}
      className={`testimonial-card ${draggable ? "testimonial-card-draggable" : ""}`}
    >
      <img
        src={imgUrl}
        alt={`Image of ${author}`}
        className="testimonial-card-image"
      />
      <span className="testimonial-card-quote">
        "{testimonial}"
      </span>
      <span className="testimonial-card-author">
        {author}
      </span>
    </motion.div>
  );
};

export default Testimonials;

