import { useForm } from "react-hook-form";
import { useDashboard } from "../../components/useDashboard";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../app/services/bankAccountsService";
import toast from "react-hot-toast";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import { useState } from "react";

const schema = z.object({
  initialBalance: z.union([
    z.string().nonempty("Saldo inicial é obrigatório"),
    z.number().positive("Saldo inicial deve ser positivo"),
  ]),
  name: z.string().nonempty("Nome é obrigatório"),
  color: z.string().nonempty("Cor é obrigatória"),
  type: z.enum(["CHECKING", "INVESTMENT", "CASH"]),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountToEdit } =
    useDashboard();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountToEdit?.color,
      name: accountToEdit?.name,
      type: accountToEdit?.type,
      initialBalance: accountToEdit?.initialBalance,
    },
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { mutateAsync: updateAccount, isLoading } = useMutation(bankAccountsService.update);
  const queryClient = useQueryClient();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await updateAccount({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountToEdit!.id,
      });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("A conta foi atualizada com sucesso!");
      closeEditAccountModal();
    } catch (error) {
      toast.error("Ocorreu um erro ao salvar as alterações.");
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  const { mutateAsync: removeAccount, isLoading: isLoadingDelete } = useMutation(bankAccountsService.remove);

  async function handleDeleteAccount() {
    try {
      await removeAccount(accountToEdit!.id);

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("A conta foi excluída com sucesso!");
      closeEditAccountModal();
    } catch (error) {
      toast.error("Ocorreu um erro ao excluir a conta.");
    }
  }

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    handleSubmit,
    register,
    errors,
    isLoading,
    control,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    isDeleteModalOpen,
    handleDeleteAccount,
    isLoadingDelete
  };
}
