import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { BankAccountIcon } from "../../../../components/icons/BankAccountIcon";
import { useDashboard } from "../useDashboard";

export function Fab() {
  const { openNewAccountModal, openNewTransactionModal } = useDashboard();
  return (
    <div className="fixed bottom-4 right-4">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className="flex items-center justify-center w-12 h-12 text-white bg-teal-900 rounded-full ">
            <PlusIcon className="w-6 h-6" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item className="items-center gap-2" onSelect={() => openNewTransactionModal("EXPENSE")}>
            <CategoryIcon type="expense" />
            Nova Despesa
          </DropdownMenu.Item>
          <DropdownMenu.Item className="items-center gap-2" onSelect={() => openNewTransactionModal("INCOME")}>
            <CategoryIcon type="income" />
            Nova Receita
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelect={openNewAccountModal} className="items-center gap-2">
            <BankAccountIcon />
            Nova Conta
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
