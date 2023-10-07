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
import { formatDate } from "../../../../../app/utils/formatDate";
import { EditTransactionModal } from "../../Modals/EditTransactionModal";

export function Transactions() {
  const {
    areValuesVisible,
    isLoading,
    transactions,
    isInitialLoading,
    isFiltersModalOpen,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    handleCloseModal,
    handleOpenModal,
    isEditModalOpen,
    transactionToEdit,
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
          <FiltersModal
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
            onApplyFilters={handleApplyFilters}
          />
          <header>
            <div className="flex items-center justify-between">
              <TransactionTypeDropdown
                onSelect={handleChangeFilters("type")}
                selectedType={filters.type}
              />

              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>
            <div className="relative mt-6">
              <Swiper
                spaceBetween={4}
                slidesPerView={3}
                centeredSlides
                initialSlide={filters.month - 1}
                onSlideChange={(swiper) => {
                  handleChangeFilters("month")(swiper.realIndex + 1);
                }}
              >
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
                {transactionToEdit && (
                  <EditTransactionModal
                    open={isEditModalOpen}
                    onClose={handleCloseModal}
                    transaction={transactionToEdit}
                  />
                )}

                {transactions.map((transaction) => (
                  <div
                    role="button"
                    key={transaction.id}
                    className="flex items-center justify-between gap-4 p-4 bg-white rounded-2xl"
                    onClick={() => handleOpenModal(transaction)}
                  >
                    <div className="flex items-center flex-1 gap-3">
                      <CategoryIcon
                        category={transaction.category?.icon}
                        type={
                          transaction.type === "EXPENSE" ? "expense" : "income"
                        }
                      />
                      <div>
                        <strong className="font-bold tracking-[-0.5px] block">
                          {transaction.name}
                        </strong>
                        <span className="text-sm text-gray-600">
                          {formatDate(new Date(transaction.date))}
                        </span>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "tracking-[-0.5px]  font-medium",
                        transaction.type === "EXPENSE"
                          ? "text-red-800"
                          : "text-green-800",
                        !areValuesVisible && "blur-sm"
                      )}
                    >
                      {transaction.type === "EXPENSE" ? "-" : "+"}
                      {formatCurrency(transaction.value)}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
