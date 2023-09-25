import { EyeIcon } from "../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { AccountsSliderNavigation } from "./AccountsSliderNavigation";

export function Accounts() {
  return (
    <div className="flex flex-col w-full h-full px-4 py-8 text-white bg-teal-900 md:p-10 rounded-2xl">
      <header>
        <span className="tracking-[-0.5px] text-white block">Saldo Total</span>
        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[-1px] text-white">
            R$ 1000,00
          </strong>
          <button className="flex items-center justify-center w-8">
            <EyeIcon open />
          </button>
        </div>
      </header>
      <div className="flex flex-col justify-end flex-1">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={2.1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <div slot="container-start" className="flex items-center justify-between mb-4">
              <strong className="text-white tracking-[-1px] text-lg">
                Minhas Contas
              </strong>
              <AccountsSliderNavigation />
            </div>

              <SwiperSlide>
                <AccountCard
                  color="#7950f2"
                  name="Nubank"
                  balance={1000.32}
                  type="CASH"
                />
              </SwiperSlide>
              <SwiperSlide>
                <AccountCard
                  color="#0f0"
                  name="Carteira"
                  balance={1000.32}
                  type="CHECKING"
                />
              </SwiperSlide>
              <SwiperSlide>
                <AccountCard
                  color="#333"
                  name="Inter"
                  balance={1000.32}
                  type="INVESTMENT"
                />
              </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}