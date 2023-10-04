import { useForm } from "react-hook-form";
import { useDashboard } from "../../components/useDashboard";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../app/services/bankAccountsService";
import toast from "react-hot-toast";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";

const schema = z.object({
  initialBalance: z.string().nonempty("Saldo inicial é obrigatório"),
  name: z.string().nonempty("Nome é obrigatório"),
  color: z.string().nonempty("Cor é obrigatória"),
  type: z.enum(["CHECKING", "INVESTMENT", "CASH"]),
});

type FormData = z.infer<typeof schema>;

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isLoading } = useMutation(bankAccountsService.create);
  const queryClient = useQueryClient();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
      });
      toast.success("Conta criada com sucesso!");
      closeNewAccountModal();
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      reset();
    } catch (error) {
      toast.error("Ocorreu um erro ao criar a conta.");
    }
  });

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
    handleSubmit,
    register,
    errors,
    isLoading,
    control,
  };
}
