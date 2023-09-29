import { useState } from "react";
import { useDashboard } from "../useDashboard";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(true);

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }
  return {
    areValuesVisible,
    isInitialLoading: false,
    transactions: [],
    isLoading: false,
    isFiltersModalOpen,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
  };
}
