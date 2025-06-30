import React from "react";
import { Image } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const PostSwiper = ({ slides }) => {
  return (
    <Swiper
      pagination
      navigation
      modules={[Navigation, Pagination]}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <Image
            src={slide}
            alt={`slide ${i + 1}`}
            radius="none"
            className="w-full md:h-[33rem] object-cover rounded-xl"
            classNames={{ wrapper: "!max-w-full" }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PostSwiper;
