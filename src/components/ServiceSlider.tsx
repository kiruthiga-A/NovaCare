import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import {
  Controller,
  EffectCoverflow,
  Navigation,
  EffectFade,
} from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { TileData } from "@/lib/constants";
import { useState } from "react";

export default function ServiceSlider() {
  const [controlledSwiper, setControlledSwiper] = useState(null);

  const handleSwiper = (swiper: any) => {
    setControlledSwiper(swiper);
  };

  return (
    <section className="w-full flex flex-col-reverse items-center justify-center space-x-3 md:flex-row px-8">
      <section className="w-full [300px] md:w-[500px] md:min-w-[400px]">
        <Swiper
          onSwiper={handleSwiper}
          modules={[Controller, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={800}
          slidesPerView={"auto"}
        >
          {TileData.map((tile) => (
            <SwiperSlide key={tile.key}>
              <h1 className="text-center text-3xl font-bold text-accentRed pb-3 md:text-left">
                {tile.title}
              </h1>
              <p className="text-center font-medium md:text-left">
                {tile.description}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className=" relative z-10 min-w-[250px] max-w-[300px] md:max-w-[400px]">
        <section className="image-swiper-button-next absolute top-[calc(50%-12px)] text-white right-0 z-10 ">
          <IoIosArrowForward size={40} />
        </section>
        <section className="image-swiper-button-prev absolute top-[calc(50%-12px)] text-white  z-10 ">
          <IoIosArrowBack size={40} />
        </section>

        <Swiper
          modules={[EffectCoverflow, Controller, Navigation]}
          effect={"coverflow"}
          speed={600}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 5,
            slideShadows: false,
          }}
          centeredSlides={true}
          slidesPerView={"auto"}
          navigation={{
            nextEl: ".image-swiper-button-next",
            prevEl: ".image-swiper-button-prev",
            disabledClass: "swiper-button-disabled",
          }}
          controller={{ control: controlledSwiper }}
        >
          {TileData.map((tile) => (
            <SwiperSlide key={tile.key}>
              <img
                alt="servicetile"
                className="w-full"
                src={tile.imgLink}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </section>
  );
}
