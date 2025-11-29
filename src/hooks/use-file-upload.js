import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { useImageUpload } from "@/hooks/use-image-upload";

export const useFileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState(new Set());

  const { mutate: uploadImage, isPending: isUploading } = useImageUpload();

  const handleFileSelect = useCallback((files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter((file) => {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`File ${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }

      // Check file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/svg+xml",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
        "video/mp4",
        "video/quicktime",
        "audio/mpeg",
        "audio/wav",
        "application/zip",
        "application/x-rar-compressed",
        "application/json",
        "text/javascript",
        "text/typescript",
        "text/html",
        "text/css",
        "application/x-python-code",
        "text/x-java-source",
        "text/x-c++src",
        "text/x-csrc",
      ];

      if (!allowedTypes.includes(file.type)) {
        toast.error(`File type ${file.type} is not supported.`);
        return false;
      }

      return true;
    });

    if (validFiles.length > 0) {
      setSelectedFiles((prev) => [...prev, ...validFiles]);

      // Upload files immediately after selection
      for (const file of validFiles) {
        uploadFile(file);
      }
    }
  }, []);

  const removeFile = useCallback((index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const formatFileSize = useCallback((bytes) => {
    if (!bytes && bytes !== 0) {
      return "Unknown size";
    }
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Number.parseFloat((bytes / k ** i).toFixed(1))} ${sizes[i]}`;
  }, []);

  const uploadFile = useCallback(
    (file, onSuccess, onError) => {
      // Use a stable key (name-size) so we can reliably track uploading state
      const fileId = `${file.name}-${file.size}`;
      setUploadingFiles((prev) => new Set([...prev, fileId]));

      uploadImage(file, {
        onSuccess: (response) => {
          setUploadingFiles((prev) => {
            const newSet = new Set(prev);
            newSet.delete(fileId);
            return newSet;
          });

          const uploadedFile = {
            attachment_name: file.name,
            attachment_size: formatFileSize(file.size),
            attachment_url: response?.profile_image,
          };

          setUploadedFiles((prev) => [...prev, uploadedFile]);
          // Remove from selected files once uploaded (avoid duplicate preview)
          setSelectedFiles((prev) =>
            prev.filter((f) => !(f.name === file.name && f.size === file.size))
          );
          onSuccess?.(uploadedFile);
        },
        onError: (error) => {
          setUploadingFiles((prev) => {
            const newSet = new Set(prev);
            newSet.delete(fileId);
            return newSet;
          });

          onError?.(error);
          toast.error(`Failed to upload ${file.name}. Please try again.`);
        },
      });
    },
    [uploadImage]
  );

  const getUploadedFiles = useCallback(() => uploadedFiles, [uploadedFiles]);

  const clearFiles = useCallback(() => {
    setSelectedFiles([]);
    setUploadedFiles([]);
    setUploadingFiles(new Set());
  }, []);

  const isFileUploading = useCallback(
    (file) => {
      const fileId = `${file.name}-${file.size}`;
      return uploadingFiles.has(fileId);
    },
    [uploadingFiles]
  );

  const isAnyFileUploading = useMemo(
    () => uploadingFiles.size > 0,
    [uploadingFiles]
  );

  return {
    selectedFiles,
    uploadedFiles,
    uploadingFiles,
    isUploading,
    isAnyFileUploading,
    handleFileSelect,
    removeFile,
    uploadFile,
    getUploadedFiles,
    clearFiles,
    isFileUploading,
  };
};
