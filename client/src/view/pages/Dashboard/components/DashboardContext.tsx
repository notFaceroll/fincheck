import { createContext, useCallback, useState } from "react";
import { BankAccount } from "../../../../app/entities/BankAccount";

interface DashboardContextValue {
  areValuesVisible: boolean;
  toggleValuesVisibility: () => void;
  isNewAccountModalOpen: boolean;
  openNewAccountModal: () => void;
  closeNewAccountModal: () => void;
  isNewTransactionModalOpen: boolean;
  openNewTransactionModal: (type: 'INCOME' | 'EXPENSE') => void;
  closeNewTransactionModal: () => void;
  newTransactionType: 'INCOME' | 'EXPENSE' | null;
  openEditAccountModal: (bankAccount: BankAccount) => void;
  closeEditAccountModal: () => void;
  isEditAccountModalOpen: boolean;
  accountToEdit: BankAccount | null;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  // TODO: save this value in local storage
  const [areValuesVisible, setAreValuesVisible] = useState(true);

  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState<BankAccount | null>(null);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | null>(null);

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((oldValue) => !oldValue);
  }, []);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, []);

  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setAccountToEdit(bankAccount);
    setIsEditAccountModalOpen(true);
  }, []);

  const closeEditAccountModal = useCallback(() => {
    setAccountToEdit(null)
    setIsEditAccountModalOpen(false);
  }, []);

  const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setNewTransactionType(type);
    setIsNewTransactionModalOpen(true);
  }, []);

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null);
    setIsNewTransactionModalOpen(false);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        toggleValuesVisibility,
        isNewAccountModalOpen,
        openNewAccountModal,
        closeNewAccountModal,
        isNewTransactionModalOpen,
        openNewTransactionModal,
        closeNewTransactionModal,
        newTransactionType,
        openEditAccountModal,
        closeEditAccountModal,
        isEditAccountModalOpen,
        accountToEdit,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
