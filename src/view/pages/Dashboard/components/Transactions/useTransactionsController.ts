import { useDashboard } from "../useDashboard";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();
  return {
    areValuesVisible,
    isInitialLoading: false,
    transactions: [],
    isLoading: false,
  };
}
