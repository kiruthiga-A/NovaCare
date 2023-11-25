import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function ServiceSlider() {
  return (
    <div className="relative z-10">
      <div className="image-swiper-button-next absolute top-[calc(50%-12px)] text-white right-0 z-10 ">
        <IoIosArrowForward size={40} />
      </div>
      <div className="image-swiper-button-prev absolute top-[calc(50%-12px)] text-white  z-10 ">
        <IoIosArrowBack size={40} />
      </div>

      <Swiper
        modules={[EffectCoverflow, Navigation]}
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
        loop={true}
        slidesPerView={"auto"}
        onSwiper={(swiper) => console.log(swiper)}
        navigation={{
          nextEl: ".image-swiper-button-next",
          prevEl: ".image-swiper-button-prev",
          disabledClass: "swiper-button-disabled",
        }}
      >
        <SwiperSlide>
          <img className="w-full" src="/servicesTile.svg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src="/servicesTile.svg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src="/servicesTile.svg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src="/servicesTile.svg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src="/servicesTile.svg" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
