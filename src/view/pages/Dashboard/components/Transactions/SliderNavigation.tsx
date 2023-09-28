import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

export function SliderNavigation() {
  const swiper = useSwiper();
  return (
    <>
      <button
        disabled={swiper.isBeginning}
        onClick={() => swiper.slidePrev()}
        className="absolute left-0 z-10 flex items-center justify-center w-12 h-12 transition-colors -translate-y-1/2 bg-gradient-to-r from-gray-100 to-transparent disabled:opacity-40 top-1/2"
      >
        <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
      </button>
      <button
        disabled={swiper.isEnd}
        onClick={() => swiper.slideNext()}
        className="absolute right-0 z-10 flex items-center justify-center w-12 h-12 transition-colors -translate-y-1/2 bg-gradient-to-l from-gray-100 to-transparent disabled:opacity-40 top-1/2"
      >
        <ChevronRightIcon className="w-6 h-6 text-gray-800" />
      </button>
    </>
  );
}
