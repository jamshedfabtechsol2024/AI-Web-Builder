import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import CentralInput from "@/components/auth/central-input";
import OrSeparator from "@/components/auth/or-separator";
import PrimaryButton from "@/components/buttons/primary-button";
import SocialButton from "@/components/buttons/social-button";
import { Icons } from "@/components/shared/icons";
import { LogoIcons } from "@/components/shared/logos";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import PhoneInput from "@/components/ui/phone-input";
import { useRegisterMutation, useSocialSignUpMutation } from "@/hooks/use-auth";
import { signupSchema } from "@/schema/auth-schema";

// Constants
const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  privacy: false,
};

const SignUpPage = () => {
  const [activeProvider, setActiveProvider] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: INITIAL_VALUES,
  });

  const [searchParams] = useSearchParams();

  const role = searchParams.get("role") || "user";

  const { mutate: registerUser, isPending } = useRegisterMutation();

  const { mutate: socialRegister, isPending: socialPending } =
    useSocialSignUpMutation();

  const onSubmit = (data) => {
    const payload = {
      role,
      first_name: data.firstName,
      last_name: data.lastName,
      phone: `+${data.phone}`,
      email: data.email,
      password: data.password,
    };

    registerUser(payload);
  };

  const handleSocialLogin = (provider) => {
    setActiveProvider(provider);
    const payload = { role, provider };
    socialRegister(payload, {
      onSettled: () => setActiveProvider(null),
    });
  };

  return (
    <section className="flex h-full w-full flex-col items-center justify-center">
      <LogoIcons.aiLogo className="h-20 w-20" />
      <div>
        <h1 className="text-center font-bold text-[var(--text)] text-lg">
          Get Started with Staron AI
        </h1>
        <p className="text-center text-[var(--text)] text-sm">
          Design visually, generate code with AI, or offer your skills as a
          developer.
        </p>
      </div>
      <form
        className="mt-10 flex w-full flex-col gap-4"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
          <CentralInput
            error={errors.firstName?.message}
            icon={<Icons.User className="text-[var(--gray)]" />}
            placeholder="First Name"
            type="text"
            {...register("firstName")}
          />
          <CentralInput
            error={errors.lastName?.message}
            icon={<Icons.User className="text-[var(--gray)]" />}
            placeholder="Last Name"
            type="text"
            {...register("lastName")}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <PhoneInput
                error={errors.phone?.message}
                onChange={(val) => field.onChange(val)}
                placeholder="Phone number"
                value={field.value || ""}
              />
            )}
          />
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
          <CentralInput
            error={errors.confirmPassword?.message}
            icon={<Icons.Lock className="text-[var(--gray)]" />}
            placeholder="Confirm Password"
            type="password"
            {...register("confirmPassword")}
          />
        </div>
        <div>
          <div className="flex items-start gap-2 md:items-center">
            <Controller
              control={control}
              name="privacy"
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  className={`border-[var(--border)] ${
                    errors.privacy ? "border-red-500" : ""
                  }`}
                  id="privacy"
                  onCheckedChange={field.onChange}
                />
              )}
            />

            <Label
              className="text-[var(--text)] leading-tight"
              htmlFor="privacy"
            >
              I agree to the Terms of Service and Privacy Policy.
            </Label>
          </div>
          {errors.privacy && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.privacy.message}
            </p>
          )}
        </div>
        <PrimaryButton
          className="mt-4 font-medium text-sm 2xl:text-lg"
          loading={isPending}
          title="Sign Up"
          type="submit"
        />
        <OrSeparator />
      </form>
      <div className="w-full space-y-4">
        <SocialButton
          className="w-full"
          icon={<LogoIcons.Google />}
          loading={socialPending && activeProvider === "google"}
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
            className="m-0 cursor-pointer border-none bg-transparent p-0 text-[var(--light-blue)] hover:underline"
            to="/auth/login"
            type="button"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUpPage;
