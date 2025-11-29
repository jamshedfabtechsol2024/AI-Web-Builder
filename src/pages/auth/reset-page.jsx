import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import CentralInput from "@/components/auth/central-input";
import PrimaryButton from "@/components/buttons/primary-button";
import { Icons } from "@/components/shared/icons";
import { LogoIcons } from "@/components/shared/logos";
import { useResetPasswordMutation } from "@/hooks/use-auth";
import { resetSchema } from "@/schema/auth-schema";

// Constants
const INITIAL_VALUES = {
  password: "",
  confirmPassword: "",
};

const ResetPage = () => {
  const location = useLocation();
  const { token } = location.state || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: INITIAL_VALUES,
  });

  const { mutate: resetPassword, isPending } = useResetPasswordMutation();

  const onSubmit = (data) => {
    const payload = {
      new_password: data.password,
      confirm_password: data.confirmPassword,
      token,
    };
    resetPassword({ payload });
  };

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="flex w-full justify-center">
        <LogoIcons.aiLogo className="h-20 w-20" />
      </div>
      <div className="w-full space-y-2">
        <h1 className="text-center font-bold text-[var(--text)] text-lg">
          Reset Password
        </h1>

        <form
          className="mt-10 flex w-full flex-col gap-4"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <CentralInput
            error={errors.password?.message}
            icon={<Icons.Lock className="text-[var(--gray)]" />}
            placeholder="Password"
            type="password"
            {...register("password")}
          />
          <CentralInput
            error={errors.confirmPassword?.message}
            icon={<Icons.Lock className="text-[var(--gray)]" />}
            placeholder="Confirm Password"
            type="password"
            {...register("confirmPassword")}
          />

          <PrimaryButton
            className="font-medium text-sm 2xl:text-lg"
            loading={isPending}
            title="Update Password"
            type="submit"
          />
        </form>
      </div>
    </section>
  );
};

export default ResetPage;
