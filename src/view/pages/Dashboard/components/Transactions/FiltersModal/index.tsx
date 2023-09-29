import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Modal } from "../../../../../components/Modal";
import { Button } from "../../../../../components/Button";
import { useFiltersModal } from "./useFiltersModal";
import { cn } from "../../../../../../app/utils/cn";

interface FiltersModalProps {
  open: boolean;
  onClose: () => void;
}

const mockedAccounts = [
  {
    id: "123",
    name: "Nubank",
  },
  {
    id: "2345",
    name: "XP Invest",
  },
  {
    id: "3678",
    name: "Dinheiro",
  },
];

export function FiltersModal({ onClose, open }: FiltersModalProps) {
  const {
    handleSelectBankAccount,
    selectedBankAccountId,
    selectedYear,
    handleChangeYear,
  } = useFiltersModal();

  return (
    <Modal open={open} title="Filtros" onClose={onClose}>
      <div>
        <span className="text-lg text-gray-800 font-bold tracking-[-1px]">
          Conta
        </span>

        <div className="mt-2 space-y-2">
          {mockedAccounts.map((account) => (
            <button
              key={account.id}
              onClick={() => handleSelectBankAccount(account.id)}
              className={cn(
                "w-full p-2 text-left text-gray-800 transition-colors rounded-2xl hover:bg-gray-50",
                selectedBankAccountId === account.id && "!bg-gray-200"
              )}
            >
              {account.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 text-gray-800">
        <span className="text-lg font-bold tracking-[-1px]">Ano</span>

        <div className="flex items-center justify-between mt-2 w-52">
          <button
            className="flex items-center justify-center w-12 h-12"
            onClick={() => handleChangeYear(-1)}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <div className="flex-1 text-center">
            <span className="font-medium text-sm tracking-[-0.5px]">
              {selectedYear}
            </span>
          </div>

          <button
            className="flex items-center justify-center w-12 h-12"
            onClick={() => handleChangeYear(1)}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <Button className="w-full mt-10">Aplicar Filtros</Button>
    </Modal>
  );
}
