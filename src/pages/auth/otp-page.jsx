import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import PrimaryButton from "@/components/buttons/primary-button";
import { LogoIcons } from "@/components/shared/logos";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  useForgotMutation,
  useResentOtpMutation,
  useVerifyOtpMutation,
} from "@/hooks/use-auth";
import { otpSchema } from "@/schema/auth-schema";
import { Loader2 } from "lucide-react";

function OtpPage() {
  const location = useLocation();
  const { email, type } = location.state || {};

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
    mode: "onTouched",
  });

  const otpValue = watch("otp");

  const handleOtpChange = (value) => {
    const sanitized = value.replace(/\D/g, "").slice(0, 6);
    setValue("otp", sanitized, { shouldValidate: true });
  };

  const { mutate: verifyOtp, isPending } = useVerifyOtpMutation();

  const { mutate: resendOtp, isPending: isPendingResend } =
    useResentOtpMutation();

  const onSubmit = (data) => {
    const payload = {
      email,
      code: data.otp,
      purpose:
        type === "register"
          ? "verify_email"
          : type === "2fa"
          ? "two_factor"
          : "password_reset",
    };
    verifyOtp({ payload, type });
  };

  const onResendOtp = () => {
    const payload = {
      email,
      purpose:
        type === "register"
          ? "verify_email"
          : type === "2fa"
          ? "two_factor"
          : "password_reset",
    };
    resendOtp({ payload });
  };

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-4 2xl:gap-6">
      <div className="flex w-full justify-center">
        <LogoIcons.aiLogo className="h-20 w-20 2xl:h-24 2xl:w-24" />
      </div>
      <div className="space-y-2">
        <h1 className="text-center font-bold text-[var(--text)] text-lg">
          Confirm your Email
        </h1>
        <p className="text-center text-[var(--text)] text-sm">
          We sent a code to {email || "your email address"}
        </p>
      </div>
      <form
        autoComplete="off"
        className="mt-8 flex flex-col items-center gap-4 2xl:mt-12 2xl:gap-6"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputOTP
          aria-label="Enter 6 digit OTP"
          maxLength={6}
          onChange={handleOtpChange}
          value={otpValue}
        >
          <InputOTPGroup className="space-x-2 2xl:space-x-4">
            {[...new Array(6)].map((_, idx) => (
              <InputOTPSlot
                aria-label={`OTP digit ${idx + 1}`}
                className="rounded-md border-[var(--border)] border-l text-[var(--text)] 2xl:h-14 2xl:w-12"
                index={idx}
                key={`otp-input-${idx + 1}`}
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
        {errors.otp && (
          <span className="text-red-500 text-xs 2xl:text-base" role="alert">
            {errors.otp.message}
          </span>
        )}
        <PrimaryButton
          className="mt-4 w-full font-medium text-sm 2xl:text-lg"
          loading={isPending}
          title="Next"
          type="submit"
        />
      </form>
      <p className="flex cursor-pointer items-center justify-center gap-2 text-[var(--text)] text-sm md:text-base 2xl:text-lg">
        Didn’t get a code?
        <button
          onClick={onResendOtp}
          disabled={isPendingResend}
          className={`flex items-center gap-2 m-0 cursor-pointer border-none bg-transparent p-0 text-[var(--light-blue)] text-base underline 2xl:text-lg ${
            isPendingResend
              ? "opacity-60 cursor-not-allowed"
              : "hover:opacity-80"
          }`}
        >
          {isPendingResend && (
            <Loader2 className="h-4 w-4 animate-spin text-[var(--light-blue)]" />
          )}
          {isPendingResend ? "Sending..." : "Re-send Code"}
        </button>
      </p>
    </section>
  );
}

export default OtpPage;
