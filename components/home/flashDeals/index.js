import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Navigation } from "swiper";
import { MdFlashOn } from "react-icons/md";
import styles from "./styles.module.scss";
import CountDown from "../../countdouwn";
import { flashDealsArray } from "../../../data/home";
import FlashCard from "./Card";

export default function FlashDeals() {
  return (
    <div className={styles.flashDeals}>
      <div className={styles.flashDeals__header}>
        <span className={styles.flashDeals__title}>
          FLASH SALE <MdFlashOn />
        </span>
        <CountDown />
      </div>
      <Swiper
        slidesPerView={6}
        spaceBetween={20}
        pagination={true}
        modules={[Navigation]}
        className="flashDeals__swiper"
      >
        <div className={styles.flashDeals__list}>
          {flashDealsArray.map((product, i) => (
            <SwiperSlide key={i}>
              <FlashCard product={product} key={i} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}
