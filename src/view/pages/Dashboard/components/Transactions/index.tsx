import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { cn } from "../../../../../app/utils/cn";
import { useTransactionsController } from "./useTransactionsController";
import { Spinner } from "../../../../components/Spinner";
import emptyStateImage from "../../../../../assets/empty-state.svg";
import { TransactionTypeDropdown } from "./TransactionTypeDropdown";
import { FiltersModal } from "./FiltersModal";

export function Transactions() {
  const {
    areValuesVisible,
    isLoading,
    transactions,
    isInitialLoading,
    isFiltersModalOpen,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;
  return (
    <div className="flex flex-col w-full h-full px-4 py-8 space-y-4 bg-gray-100 md:p-10 rounded-2xl">
      {isInitialLoading && (
        <div className="flex items-center justify-center w-full h-full">
          <Spinner className="w-10 h-10" />
        </div>
      )}
      {!isInitialLoading && (
        <>
          <FiltersModal open={isFiltersModalOpen} onClose={handleCloseFiltersModal} />
          <header>
            <div className="flex items-center justify-between">
              <TransactionTypeDropdown />
              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>
            <div className="relative mt-6">
              <Swiper spaceBetween={4} slidesPerView={3} centeredSlides>
                <SliderNavigation />
                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <div className="flex-1 space-y-2 overflow-y-auto">
            {isLoading && (
              <div className="flex items-center justify-center w-full h-full">
                <Spinner className="w-10 h-10" />
              </div>
            )}

            {!hasTransactions && !isLoading && (
              <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
                <>
                  <img
                    src={emptyStateImage}
                    alt="Nenhuma transação encontrada"
                    className="w-1/3"
                  />
                  <span className="font-medium text-center text-gray-700">
                    Não encontramos nenhuma transação!
                  </span>
                </>
              </div>
            )}

            {hasTransactions && !isLoading && (
              <>
                <div className="flex items-center justify-between gap-4 p-4 bg-white rounded-2xl">
                  <div className="flex items-center flex-1 gap-3">
                    <CategoryIcon type="expense" />
                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">
                        Almoço
                      </strong>
                      <span className="text-sm text-gray-600">04/06/2023</span>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "tracking-[-0.5px] text-red-800 font-medium",
                      !areValuesVisible && "blur-sm"
                    )}
                  >
                    - {formatCurrency(123)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 p-4 bg-white rounded-2xl">
                  <div className="flex items-center flex-1 gap-3">
                    <CategoryIcon type="income" />
                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">
                        Almoço
                      </strong>
                      <span className="text-sm text-gray-600">04/06/2023</span>
                    </div>
                  </div>
                  <span className="tracking-[-0.5px] text-green-800 font-medium">
                    - {formatCurrency(123)}
                  </span>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
