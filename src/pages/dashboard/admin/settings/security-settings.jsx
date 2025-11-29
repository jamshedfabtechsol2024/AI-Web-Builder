import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CentralInput from "@/components/auth/central-input";
import PrimaryButton from "@/components/buttons/primary-button";
import {
  useChangePasswordMutation,
  useChangeZeroAuthPasswordMutation,
  useMeQuery,
} from "@/hooks/use-auth";
import { resetPasswordSchema } from "@/schema/admin-settings-schema";
import { useAuthStore } from "@/store/use-auth-store";
import ResetFormSkeleton from "@/components/skeletons/reset-form-skeleton";

// Constants
const INITIAL_VALUES = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const SecuritySettings = () => {
  const { data: user, isLoading } = useMeQuery();
  const isAuthZero = user?.user?.is_oauth_user;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema(isAuthZero)),
    defaultValues: INITIAL_VALUES,
  });

  const { mutate: changePassword, isPending } = useChangePasswordMutation();
  const { mutate: changeZeroAuthPassword, isPending: isChanging } =
    useChangeZeroAuthPasswordMutation();

  const onSubmit = (data) => {
    if (isAuthZero) {
      const { currentPassword, ...rest } = data;
      changeZeroAuthPassword(rest);
    } else {
      changePassword(data);
    }

    reset(INITIAL_VALUES);
  };

  return (
    <div>
      <h1 className="mb-2 border-white/10 border-b pb-2 font-medium text-lg">
        Reset Password
      </h1>
      <div>
        {isLoading ? (
          <ResetFormSkeleton />
        ) : (
          <form
            className="mt-10 flex w-full flex-col gap-4"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
              {!isAuthZero && (
                <CentralInput
                  error={errors.currentPassword?.message}
                  label="Current Password"
                  placeholder="Current Password"
                  type="password"
                  {...register("currentPassword")}
                />
              )}
              <CentralInput
                error={errors.newPassword?.message}
                label="New Password"
                placeholder="New Password"
                type="password"
                {...register("newPassword")}
              />
              <CentralInput
                error={errors.confirmPassword?.message}
                label="Confirm New Password"
                placeholder="Confirm Password"
                type="password"
                {...register("confirmPassword")}
              />
            </div>
            <div className="flex items-center">
              <PrimaryButton
                className="mt-4 min-w-[100px] bg-[var(--light-blue)] px-10 font-medium text-sm 2xl:text-lg"
                loading={isPending || isChanging}
                title="Save"
                type="submit"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SecuritySettings;
