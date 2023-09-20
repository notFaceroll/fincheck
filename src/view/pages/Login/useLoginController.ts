import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../../app/services/authService";
import { toast } from "react-hot-toast";
import { SigninParams } from "../../../app/services/authService/signin";

const schema = z.object({
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

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SigninParams) => authService.signin(data),
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    // O hookForm já fez a validação dos dados
    // e garante que o "data" tem o formato de "FormData"
    try {
      const { accessToken } = await mutateAsync(data);
      console.log(accessToken);
    } catch (error) {
      toast.error("Ocorreu um erro ao entrar na sua conta.");
    }
  });

  return { handleSubmit, register, errors, isLoading };
}
