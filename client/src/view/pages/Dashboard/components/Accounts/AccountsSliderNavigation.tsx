import { useSwiper } from "swiper/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

interface AccountsSliderNavigationProps {
  isBeginning: boolean;
  isEnd: boolean;
}

export function AccountsSliderNavigation({
  isBeginning,
  isEnd,
}: AccountsSliderNavigationProps) {
  const swiper = useSwiper();

  return (
    <div className="space-x-4">
      <button
        disabled={isBeginning}
        onClick={() => swiper.slidePrev()}
        className="py-3 px-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
      >
        <ChevronLeftIcon className="w-6 h-6 text-white" />
      </button>
      <button
        disabled={isEnd}
        onClick={() => swiper.slideNext()}
        className="py-3 px-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
      >
        <ChevronRightIcon className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
