import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { imageS3API } from "@/api/image-s3";

export const useImageUpload = () =>
  useMutation({
    mutationFn: (file) => imageS3API.uploadProfileImage(file),

    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
