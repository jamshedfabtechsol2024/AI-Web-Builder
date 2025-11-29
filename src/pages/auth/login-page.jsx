import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import CentralInput from "@/components/auth/central-input";
import OrSeparator from "@/components/auth/or-separator";
import PrimaryButton from "@/components/buttons/primary-button";
import SocialButton from "@/components/buttons/social-button";
import { Icons } from "@/components/shared/icons";
import { LogoIcons } from "@/components/shared/logos";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useLoginMutation, useSocialSignUpMutation } from "@/hooks/use-auth";
import { loginSchema } from "@/schema/auth-schema";

// Constants
const INITIAL_VALUES = {
  email: "",
  password: "",
};

function LoginPage() {
  const [activeProvider, setActiveProvider] = useState(null);
  const { mutate: login, isPending } = useLoginMutation();
  const { mutate: socialRegister, isPending: socialPending } =
    useSocialSignUpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: INITIAL_VALUES,
  });

  const onSubmit = (values) => {
    login(values);
  };

  const handleSocialLogin = (provider) => {
    setActiveProvider(provider);
    const payload = { provider };
    socialRegister(payload, {
      onSettled: () => setActiveProvider(null),
    });
  };

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="flex w-full justify-center">
        <LogoIcons.aiLogo className="h-20 w-20" />
      </div>
      <div className="space-y-2">
        <h1 className="text-center font-bold text-[var(--text)] text-lg 2xl:text-2xl">
          Welcome back to Staron AI
        </h1>
        <p className="text-center text-[var(--text)] text-sm 2xl:text-lg">
          Log in to build, collaborate, and deploy faster with AI.
        </p>
      </div>

      <form
        className="mt-10 flex w-full flex-col gap-4"
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
        <CentralInput
          error={errors.password?.message}
          icon={<Icons.Lock className="text-[var(--gray)]" />}
          placeholder="Password"
          type="password"
          {...register("password")}
        />

        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Checkbox
              className="border border-[var(--border)]"
              id="remember-me"
            />
            <Label
              className="text-[var(--text)] text-sm md:text-base 2xl:text-lg"
              htmlFor="remember-me"
            >
              Remember me
            </Label>
          </div>

          <Link
            className="hover: m-0 cursor-pointer border-none bg-transparent p-0 text-[var(--light-blue)] text-base underline 2xl:text-lg"
            to="/auth/forgot-password"
          >
            Forgot password
          </Link>
        </div>

        <PrimaryButton
          className="font-medium text-sm 2xl:text-lg"
          loading={isPending}
          title="Login"
          type="submit"
        />
        <OrSeparator />
      </form>

      <div className="w-full space-y-4">
        <SocialButton
          className="w-full"
          icon={<LogoIcons.Google />}
          onClick={() => handleSocialLogin("google")}
          title="Continue with Google"
        />
        <SocialButton
          className="w-full"
          icon={<LogoIcons.Github />}
          loading={socialPending && activeProvider === "github"}
          onClick={() => handleSocialLogin("github")}
          title="Continue with GitHub"
        />
        <p className="flex cursor-pointer items-center justify-center gap-2 text-[var(--text)] text-sm md:text-base 2xl:text-lg">
          Don’t have any account?
          <Link
            className="hover: m-0 cursor-pointer border-none bg-transparent p-0 text-[var(--light-blue)] text-base underline 2xl:text-lg"
            to="/auth/select-role"
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
