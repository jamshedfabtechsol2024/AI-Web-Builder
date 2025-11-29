import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { supportAPI } from "@/api/support";
export const useCreateSupportForm = () =>
  useMutation({
    mutationFn: (payload) => supportAPI.createSupportForm(payload),

    onSuccess: () => {
      toast.success("Support request successfully submitted");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
