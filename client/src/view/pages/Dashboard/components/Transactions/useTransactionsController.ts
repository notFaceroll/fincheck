import { useEffect, useState } from "react";
import { useDashboard } from "../useDashboard";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import { TransactionsFilters } from "../../../../../app/services/transactionsService/getAll";
import { Transaction } from "../../../../../app/entities/Transaction";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const { transactions, isLoading, isInitialLoading, refetchTransactions } =
    useTransactions(filters);

  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions]);

  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(
    filter: TFilter
  ) {
    return (value: TransactionsFilters[TFilter]) => {
      // prevents the slider from triggering the event when it is initialized
      if (value === filters[filter]) return;

      setFilters((prev) => ({ ...prev, [filter]: value }));
    };
  }

  function handleApplyFilters(filters: {
    bankAccountId: string | undefined;
    year: number;
  }) {
    // React will do the batch update
    // to prevent multiple fetch calls
    handleChangeFilters("bankAccountId")(filters.bankAccountId);
    handleChangeFilters("year")(filters.year);
    setIsFiltersModalOpen(false);
  }

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleOpenModal(transaction: Transaction) {
    setIsEditModalOpen(true);
    setTransactionToEdit(transaction);
  }

  function handleCloseModal() {
    setIsEditModalOpen(false);
    setTransactionToEdit(null);
  }

  return {
    areValuesVisible,
    isInitialLoading,
    transactions,
    isLoading,
    isFiltersModalOpen,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    transactionToEdit,
    isEditModalOpen,
    handleOpenModal,
    handleCloseModal,
  };
}
