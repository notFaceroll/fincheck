import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useEditAccountModalController } from "./useEditAccountModalController";
import { TrashIcon } from "../../../../components/icons/TrashIcon";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal";

export function EditAccountModal() {
  const {
    closeEditAccountModal,
    isEditAccountModalOpen,
    errors,
    isLoading,
    handleSubmit,
    register,
    control,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    isDeleteModalOpen,
    handleDeleteAccount,
    isLoadingDelete,
  } = useEditAccountModalController();

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoading={isLoadingDelete}
        onConfirm={handleDeleteAccount}
        onClose={handleCloseDeleteModal}
        title="Tem certeza que deseja excluir esta conta?"
        description="Ao excluir a conta, também serão excluídos todos os registros de
    receita e despesa relacionados."
      />
    );
  }

  return (
    <Modal
      title="Editar Conta"
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
      rightAction={
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="w-6 h-6 text-red-900" />
        </button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-sm font-medium">
            Saldo
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] font-medium text-lg">
              R$
            </span>

            <Controller
              name="initialBalance"
              control={control}
              defaultValue={0}
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  onChange={onChange}
                  value={value}
                  error={errors.initialBalance?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-10">
          <Input
            type="text"
            placeholder="Nome da Conta"
            error={errors.name?.message}
            {...register("name")}
          />

          <Controller
            name="type"
            control={control}
            defaultValue="CHECKING"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Tipo"
                onChange={onChange}
                value={value}
                error={errors.type?.message}
                options={[
                  { label: "Conta Corrente", value: "CHECKING" },
                  { label: "Investimentos", value: "INVESTMENT" },
                  { label: "Dinheiro Físico", value: "CASH" },
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                onChange={onChange}
                value={value}
                error={errors.color?.message}
              />
            )}
          />

          <Button type="submit" isLoading={isLoading} className="w-full mt-6">
            Salvar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
