import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { otpSchema } from "@/schema/auth-schema";
import PrimaryButton from "../buttons/primary-button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

const OTPVerifyModal = ({ open, onOpenChange }) => {
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

  const onSubmit = () => {
    // Handle OTP submit
    onOpenChange();
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="border border-[#FFFFFF0F] bg-black sm:max-w-md">
        <DialogHeader className="flex flex-col items-center justify-center gap-2">
          <DialogTitle className="text-center">OTP Verification</DialogTitle>
          <p className="max-w-[350px] text-center text-[var(--light-white)] text-sm">
            Add 6-digit verification code we sent your registered email address.
          </p>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center justify-center py-6">
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
                    className="rounded-md border-white border-l text-white 2xl:h-14 2xl:w-12"
                    index={idx}
                    key={`otp-input-${idx + 1}`}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
            {errors.otp && (
              <span
                className="mt-2 text-red-500 text-xs 2xl:text-base"
                role="alert"
              >
                {errors.otp.message}
              </span>
            )}
          </div>
          <DialogFooter className="flex w-full gap-2">
            <PrimaryButton
              className="flex-1 rounded-lg"
              title="Verify"
              type="submit"
            />
          </DialogFooter>
          <p className="flex cursor-pointer items-center justify-center gap-2 text-white text-xs md:text-xs 2xl:text-lg">
            Didn’t get a code?
            <div className="hover: m-0 cursor-pointer border-none bg-transparent p-0 text-[var(--light-blue)] text-xs underline 2xl:text-lg">
              Re-enter email
            </div>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OTPVerifyModal;
