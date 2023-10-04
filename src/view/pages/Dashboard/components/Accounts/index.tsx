import { AccountCard } from "./AccountCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { AccountsSliderNavigation } from "./AccountsSliderNavigation";
import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { useAccountsController } from "./useAccountsController";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { cn } from "../../../../../app/utils/cn";
import { Spinner } from "../../../../components/Spinner";
import { PlusIcon } from "@radix-ui/react-icons";
import { NewAccountModal } from "../../Modals/NewAccountModal";

export function Accounts() {
  const {
    setSliderState,
    sliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading,
    accounts,
    openNewAccountModal,
    currentBalance,
  } = useAccountsController();

  return (
    <div className="flex flex-col w-full h-full px-4 py-8 text-white bg-teal-900 md:p-10 rounded-2xl">
      {isLoading && (
        <div className="flex items-center justify-center w-full h-full">
          <Spinner className="w-10 h-10 text-teal-950/50 fill-white" />
        </div>
      )}
      {!isLoading && (
        <>
          <NewAccountModal />
          <header>
            <span className="tracking-[-0.5px] text-white block">
              Saldo Total
            </span>
            <div className="flex items-center gap-2">
              <strong
                className={cn(
                  "text-2xl tracking-[-1px] text-white select-none",
                  !areValuesVisible && "blur"
                )}
              >
                {formatCurrency(currentBalance)}
              </strong>
              <button
                className="flex items-center justify-center w-8"
                onClick={toggleValuesVisibility}
              >
                <EyeIcon open={!areValuesVisible} />
              </button>
            </div>
          </header>
          <div className="flex flex-col justify-end flex-1 mt-10 md:mt-0">
            {accounts.length === 0 && (
              <>
                <div slot="container-start" className="mb-4">
                  <strong className="text-white tracking-[-1px] text-lg">
                    Minhas Contas
                  </strong>
                </div>
                <button
                  onClick={openNewAccountModal}
                  className="flex flex-col items-center justify-center gap-4 mt-4 text-white border-2 border-teal-600 border-dashed h-52 rounded-2xl"
                >
                  <div className="flex items-center justify-center border-2 border-white border-dashed rounded-full w-11 h-11">
                    <PlusIcon className="w-6 h-6" />
                  </div>
                  <span className="font-medium tracking-[-0.5px] block w-32 text-center">
                    Cadastre uma nova conta
                  </span>
                </button>
              </>
            )}
            {accounts.length > 0 && (
              <div>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={windowWidth >= 500 ? 2.1 : 1.2}
                  onSlideChange={(swiper) =>
                    setSliderState({
                      isBeginning: swiper.isBeginning,
                      isEnd: swiper.isEnd,
                    })
                  }
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  <div
                    slot="container-start"
                    className="flex items-center justify-between mb-4"
                  >
                    <strong className="text-white tracking-[-1px] text-lg">
                      Minhas Contas
                    </strong>
                    <AccountsSliderNavigation
                      isBeginning={sliderState.isBeginning}
                      isEnd={sliderState.isEnd}
                    />
                  </div>

                  {accounts.map((account) => (
                    <SwiperSlide>
                      <AccountCard key={account.id} data={account} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
