import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import { authService } from "../../../app/services/authService";
import { SignupParams } from "../../../app/services/authService/signup";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../app/hooks/useAuth";

const schema = z.object({
  name: z.string().nonempty("O nome é obrigatório."),
  email: z
    .string()
    .nonempty("O e-mail é obrigatório.")
    .email("Insira um e-mail válido."),
  password: z
    .string()
    .nonempty("A senha é obrigatória")
    .min(8, "A senha deve ter no mínimo 8 caracteres."),
});

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SignupParams) => authService.signup(data),
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    // O hookForm já fez a validação dos dados
    // e garante que o "data" tem o formato de "FormData"
    try {
      const { accessToken } = await mutateAsync(data);
      signin(accessToken);
      toast.success("Conta criada com sucesso!");
    } catch (error) {
      toast.error("Ocorreu um erro ao criar sua conta.");
    }
  });

  return { handleSubmit, register, errors, isLoading };
}
