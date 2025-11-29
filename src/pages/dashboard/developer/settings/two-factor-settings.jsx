import { useState } from "react";
import { toast } from "sonner";
import PrimaryButton from "@/components/buttons/primary-button";
import OTPVerifyModal from "@/components/modals/otp-verify-modal";
import VerifyEmailModal from "@/components/modals/verify-email-modal";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToggle2FAMutation } from "@/hooks/use-auth";
import { useAuthStore } from "@/store/use-auth-store";

const TwoFactorSettings = () => {
  const [activeFactor, setActiveFactor] = useState(null);
  const [otpModal, setOtpModal] = useState(false);

  const user = useAuthStore((s) => s.user);
  const updateUser = useAuthStore((s) => s.setUser);

  const { mutate: toggle2FA, isLoading } = useToggle2FAMutation();

  const handleToggle = (checked) => {
    toggle2FA(
      { enabled: checked },
      {
        onSuccess: () => {
          toast.success(
            checked
              ? "Two-factor authentication enabled!"
              : "Two-factor authentication disabled!"
          );
          updateUser({ ...user, two_factor_enabled: checked });
        },
      }
    );
  };

  const handleVerificationStart = (factorId) => {
    if (factorId === "email") {
      setActiveFactor("email");
    }
    if (factorId === "sms") {
      setActiveFactor("sms");
    }
  };

  const factors = [
    {
      id: "email",
      title: "Email Verification",
      description:
        "Receive a 6-digit verification code in your registered email address.",
      verified: user?.email_verified,
    },
    // {
    //   id: "sms",
    //   title: "SMS Verification",
    //   description:
    //     "Receive a 6-digit verification code on your registered mobile number.",
    //   verified: true,
    // },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="mb-2 border-white/10 border-b pb-2 font-medium text-lg">
          2 Factor Authentication
        </h1>
        <Switch
          checked={!!user?.two_factor_enabled}
          className="cursor-pointer"
          disabled={isLoading}
          onCheckedChange={handleToggle}
        />
      </div>

      <div className="flex flex-col gap-4">
        {factors.map((factor) => (
          <Card
            className="border border-[#FFFFFF0F] bg-[#FFFFFF0F] p-4"
            key={factor.id}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-medium text-base">{factor.title}</h2>
                <p className="text-xs lg:text-sm 2xl:text-base">
                  {factor.description}
                </p>
              </div>

              {factor.verified ? (
                <span className="rounded-lg px-6 py-2 text-green-400 text-sm">
                  Verified
                </span>
              ) : (
                <PrimaryButton
                  className="!px-10 rounded-lg"
                  onClick={() => handleVerificationStart(factor.id)}
                  title="Verify"
                />
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Email Modal */}
      <VerifyEmailModal
        onOpenChange={() => {
          setActiveFactor(null);
          setOtpModal(true);
        }}
        open={activeFactor === "email"}
      />

      {/* OTP Modal (generic for email or sms) */}
      <OTPVerifyModal onOpenChange={() => setOtpModal(false)} open={otpModal} />
    </div>
  );
};

export default TwoFactorSettings;
