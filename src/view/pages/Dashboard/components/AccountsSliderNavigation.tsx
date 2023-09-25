import { useSwiper } from "swiper/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

export function AccountsSliderNavigation() {
  const swiper = useSwiper();
  return (
    <div className="space-x-4">
      <button
        onClick={() => swiper.slidePrev()}
        className="py-3 px-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
      >
        <ChevronLeftIcon className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className="py-3 px-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
      >
        <ChevronRightIcon className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
