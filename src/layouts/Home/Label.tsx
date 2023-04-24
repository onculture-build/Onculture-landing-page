import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CustomButton from "../../components/custom-button";
import labelStyle from "../../styles/Home/Label.module.css";

const Label = () => {
  const texts = ["GET", "STAY", "BE"];

  const [index, setIndex] = React.useState(0);

  const variants = {
    enter: {
      y: -20,
      opacity: 0,
      transition: {
        y: { type: "spring", stiffness: 300, damping: 200 },
      },
    },
    stop: {
      y: 0,
      opacity: 1,
    },
  };

  React.useEffect(() => {
    setTimeout(() => {
      let next = index + 1;
      if (next === texts.length) {
        next = 0;
      }
      setIndex(next);
    }, 2 * 1000);
  }, [index, setIndex, texts.length]);

  return (
    <div className={labelStyle.content}>
      <h1>
        <motion.span
          variants={variants}
          key={index}
          initial="enter"
          animate="stop"
        >
          {texts[index]}
        </motion.span>
        <span>OnCulture</span>
      </h1>
      <div className={labelStyle.labelBtns}>
        <Link to="/join-the-waitlist">
          <CustomButton look="secondary" className={labelStyle.btnWhite}>
            Join the waitlist
          </CustomButton>
        </Link>
      </div>
    </div>
  );
};

export default Label;
