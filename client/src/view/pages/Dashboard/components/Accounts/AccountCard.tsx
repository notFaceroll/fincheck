import { BankAccount } from "../../../../../app/entities/BankAccount";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { BankAccountTypeIcon } from "../../../../components/icons/BankAccountTypeIcon";
import { useDashboard } from "../useDashboard";

interface AccountCardProps {
  data: BankAccount;
}

export function AccountCard({ data }: AccountCardProps) {
  const { currentBalance, color, name, type } = data;
  const { areValuesVisible, openEditAccountModal } = useDashboard();
  return (
    <div
      role="button"
      onClick={() => openEditAccountModal(data)}
      style={{ borderBottomColor: color }}
      className="flex flex-col h-[200px] border-b-4 border-teal-950 justify-between p-4 bg-white rounded-2xl"
    >
      <div className="space-y-4">
        <BankAccountTypeIcon type={type} />
        <span className="text-gray-800 block font-medium tracking-[-0.5px]">
          {name}
        </span>
      </div>

      <div>
        <span
          className={cn(
            "text-gray-800 block font-medium tracking-[-0.5px]",
            !areValuesVisible && "blur-sm"
          )}
        >
          {formatCurrency(currentBalance)}
        </span>
        <small className="text-sm text-gray-600">Saldo atual</small>
      </div>
    </div>
  );
}
