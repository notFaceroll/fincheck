import { Outlet } from "react-router-dom";
import illustration from "../../assets/illustration.png";
import { Logo } from "../components/Logo";

export function AuthLayout() {
  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col items-center justify-center w-full h-full gap-16 lg:w-1/2">
        <Logo className="h-6 text-gray-500" />
        <div className="w-full max-w-[504px] px-8">
          <Outlet />
        </div>
      </div>

      <div className="relative justify-center hidden w-1/2 h-full p-8 lg:flex itens-center">
        <img
          src={illustration}
          alt="login"
          className="object-cover w-full max-w-[656px] max-h-[960px] select-none rounded-[32px]"
        />
        <div className="max-w-[656px] bg-white absolute bottom-8 rounded-b-[32px] p-10">
          <Logo className="h-8 text-teal-900" />

          <p className="mt-8 text-xl font-medium text-gray-700">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck,
            e o melhor, totalmente de graça!
          </p>
        </div>
      </div>
    </div>
  );
}
