import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CentralInput from "@/components/auth/central-input";
import PrimaryButton from "@/components/buttons/primary-button";
import { Icons } from "@/components/shared/icons";
import { LogoIcons } from "@/components/shared/logos";
import { useForgotMutation } from "@/hooks/use-auth";
import { forgotSchema } from "@/schema/auth-schema";

// Constants
const INITIAL_VALUES = {
  email: "",
};

const ForgotPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotSchema),
    defaultValues: INITIAL_VALUES,
  });

  const { mutate: forgot, isPending } = useForgotMutation();

  const onSubmit = (data) => {
    const payload = { email: data.email };

    forgot({ payload });
  };

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-4 2xl:gap-6">
      <LogoIcons.aiLogo className="h-20 w-20 2xl:h-24 2xl:w-24" />
      <div className="w-full">
        <h1 className="text-center font-bold text-[var(--text)] text-lg 2xl:text-2xl">
          Forget Password
        </h1>
        <p className="text-center text-[var(--text)] text-sm 2xl:text-lg">
          Enter your email to receive password reset instructions.
        </p>
        <form
          className="mt-10 flex w-full flex-col gap-4 2xl:mt-12 2xl:gap-6"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <CentralInput
            error={errors.email?.message}
            icon={<Icons.Email className="text-[var(--gray)]" />}
            placeholder="Email"
            type="email"
            {...register("email")}
          />

          <PrimaryButton
            className="font-medium text-sm 2xl:text-lg"
            loading={isPending}
            title="Send OTP"
            type="submit"
          />
        </form>
      </div>
    </section>
  );
};

export default ForgotPage;
