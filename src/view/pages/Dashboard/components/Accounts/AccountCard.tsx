import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { BankAccountTypeIcon } from "../../../../components/icons/BankAccountTypeIcon";

interface AccountCardProps {
  color: string;
  name: string;
  balance: number;
  type: 'CASH' | 'CHECKING' | 'INVESTMENT';
}

export function AccountCard({ balance, color, name, type }: AccountCardProps) {
  return (
    <div
      style={{ borderBottomColor: color }}
      className="flex flex-col h-[200px] border-b-4 border-teal-950 justify-between p-4 bg-white rounded-2xl"
    >
      <div className="space-y-4">
        <BankAccountTypeIcon type={type}/>
        <span className="text-gray-800 block font-medium tracking-[-0.5px]">
          {name}
        </span>
      </div>

      <div>
        <span className="text-gray-800 block font-medium tracking-[-0.5px]">
          {formatCurrency(balance)}
        </span>
        <small className="text-sm text-gray-600">Saldo atual</small>
      </div>
    </div>
  );
}
