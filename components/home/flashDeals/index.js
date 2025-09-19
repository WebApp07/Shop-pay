"use client";
import { Swiper, SwiperSlide } from "swiper/react";
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
      {/* Header */}
      <div className={styles.flashDeals__header}>
        <span className={styles.flashDeals__title}>
          FLASH SALE <MdFlashOn />
        </span>
        <CountDown date={new Date(2025, 9, 19)} />
      </div>

      {/* Swiper Slider */}
      <Swiper
        slidesPerView={6}
        spaceBetween={20}
        pagination={true}
        navigation
        modules={[Navigation]}
        className={styles.flashDeals__swiper}
        breakpoints={{
          0: { slidesPerView: 1 }, // mobile very small
          444: { slidesPerView: 1 }, // phones
          630: { slidesPerView: 2 }, // small tablets
          920: { slidesPerView: 3 }, // tablets
          1232: { slidesPerView: 4 }, // small desktops
          1520: { slidesPerView: 5 }, // large desktops
          1800: { slidesPerView: 6 }, // very large screens
        }}
      >
        {flashDealsArray.map((product, i) => (
          <SwiperSlide key={i}>
            <FlashCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
