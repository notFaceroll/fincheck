import { TrashIcon } from "@radix-ui/react-icons";
import { Transaction } from "../../../../../app/entities/Transaction";
import { Button } from "../../../../components/Button";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useEditTransactionModalController } from "./useEditTransactionModalController";
import { Controller } from "react-hook-form";

interface EditTransactionModalProps {
  open: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export function EditTransactionModal({
  transaction,
  onClose,
  open,
}: EditTransactionModalProps) {
  const {
    control,
    errors,
    handleSubmit,
    register,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleDeleteTransaction,
    handleOpenDeleteModal,
    isLoadingDelete,
  } = useEditTransactionModalController(transaction, onClose);

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoading={isLoadingDelete}
        onConfirm={handleDeleteTransaction}
        onClose={handleCloseDeleteModal}
        title="Tem certeza que deseja excluir esta transação?"
      />
    );
  }

  const isExpense = transaction?.type === "EXPENSE";

  return (
    <Modal
      title={isExpense ? "Editar Despesa" : "Editar Receita"}
      open={open}
      onClose={onClose}
      rightAction={
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="w-6 h-6 text-red-900" />
        </button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-sm">
            Valor {isExpense ? "da despesa" : "da receita"}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>

            <Controller
              name="value"
              control={control}
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  onChange={onChange}
                  value={value}
                  error={errors.value?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-10">
          <Input
            type="text"
            error={errors.name?.message}
            placeholder={isExpense ? "Nome da Despesa" : "Nome da Receita"}
            {...register("name")}
          />

          {/* TODO: isFetching Spinner */}
          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Select
                placeholder="Categoria"
                onChange={onChange}
                value={value}
                error={errors.categoryId?.message}
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            )}
          />

          {/* TODO: isFetching Spinner */}
          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Select
                placeholder={isExpense ? "Pagar com" : "Receber com"}
                onChange={onChange}
                value={value}
                error={errors.bankAccountId?.message}
                options={accounts.map((bankAccount) => ({
                  value: bankAccount.id,
                  label: bankAccount.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { value, onChange } }) => (
              <DatePickerInput
                error={errors.date?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
            Salvar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
