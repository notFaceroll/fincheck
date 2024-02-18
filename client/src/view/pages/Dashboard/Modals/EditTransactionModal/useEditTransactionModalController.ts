import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useMemo, useState } from "react";
import { Transaction } from "../../../../../app/entities/Transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../../app/services/transactionsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import toast from "react-hot-toast";

const schema = z.object({
  value: z.union([z.string().nonempty("Valor é obrigatório"), z.number()]),
  name: z.string().nonempty("Nome é obrigatório"),
  categoryId: z.string().nonempty("Categoria é obrigatória"),
  bankAccountId: z.string().nonempty("Conta bancária é obrigatória"),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void
) {
  const {
    control,
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction.date) : new Date(),
    },
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const { mutateAsync, isLoading } = useMutation(transactionsService.update);
  const queryClient = useQueryClient();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        id: transaction!.id,
        type: transaction!.type,
        value: currencyStringToNumber(data.value),
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });

      toast.success(
        transaction!.type === "EXPENSE"
          ? "Despesa editada com sucesso!"
          : "Receita editada com sucesso!"
      );

      onClose();
    } catch (error) {
      toast.error(
        transaction!.type === "EXPENSE"
          ? "Erro ao salvar despesa!"
          : "Erro ao salvar receita!"
      );
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  const { mutateAsync: removeTransaction, isLoading: isLoadingDelete } =
    useMutation(transactionsService.remove);

  async function handleDeleteTransaction() {
    try {
      await removeTransaction(transaction!.id);

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });

      toast.success(
        transaction!.type === "EXPENSE"
          ? "Despesa excluída com sucesso!"
          : "Receita excluída com sucesso!"
      );
      onClose();
    } catch (error) {
      toast.error(
        transaction!.type === "EXPENSE"
          ? "Erro ao excluir despesa!"
          : "Erro ao excluir receita!"
      );
    }
  }

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === transaction?.type
    );
  }, [categoriesList, transaction]);

  return {
    control,
    register,
    handleSubmit,
    errors,
    accounts,
    categories,
    isLoading,
    isLoadingDelete,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteTransaction,
  };
}
