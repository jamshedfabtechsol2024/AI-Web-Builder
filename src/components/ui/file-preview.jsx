import {
  FileArchive,
  FileAudio,
  FileCode,
  File as FileIcon,
  FileImage,
  FileJson,
  FileSpreadsheet,
  FileText,
  FileVideo,
  X,
} from "lucide-react";
import { useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const getFileIcon = (fileName) => {
  const ext = fileName.split(".").pop()?.toLowerCase();

  const iconMap = {
    pdf: <FileText className="h-4 w-4 text-red-400" />,
    doc: <FileText className="h-4 w-4 text-blue-400" />,
    docx: <FileText className="h-4 w-4 text-blue-400" />,
    txt: <FileText className="h-4 w-4 text-blue-400" />,
    xls: <FileSpreadsheet className="h-4 w-4 text-green-400" />,
    xlsx: <FileSpreadsheet className="h-4 w-4 text-green-400" />,
    csv: <FileSpreadsheet className="h-4 w-4 text-green-400" />,
    png: <FileImage className="h-4 w-4 text-purple-400" />,
    jpg: <FileImage className="h-4 w-4 text-purple-400" />,
    jpeg: <FileImage className="h-4 w-4 text-purple-400" />,
    gif: <FileImage className="h-4 w-4 text-purple-400" />,
    webp: <FileImage className="h-4 w-4 text-purple-400" />,
    svg: <FileImage className="h-4 w-4 text-purple-400" />,
    mp4: <FileVideo className="h-4 w-4 text-pink-400" />,
    mov: <FileVideo className="h-4 w-4 text-pink-400" />,
    avi: <FileVideo className="h-4 w-4 text-pink-400" />,
    mp3: <FileAudio className="h-4 w-4 text-yellow-400" />,
    wav: <FileAudio className="h-4 w-4 text-yellow-400" />,
    zip: <FileArchive className="h-4 w-4 text-orange-400" />,
    rar: <FileArchive className="h-4 w-4 text-orange-400" />,
    json: <FileJson className="h-4 w-4 text-green-300" />,
    js: <FileCode className="h-4 w-4 text-indigo-400" />,
    ts: <FileCode className="h-4 w-4 text-indigo-400" />,
    tsx: <FileCode className="h-4 w-4 text-indigo-400" />,
    jsx: <FileCode className="h-4 w-4 text-indigo-400" />,
    py: <FileCode className="h-4 w-4 text-indigo-400" />,
    java: <FileCode className="h-4 w-4 text-indigo-400" />,
    cpp: <FileCode className="h-4 w-4 text-indigo-400" />,
    c: <FileCode className="h-4 w-4 text-indigo-400" />,
    html: <FileCode className="h-4 w-4 text-indigo-400" />,
    css: <FileCode className="h-4 w-4 text-indigo-400" />,
  };

  return iconMap[ext] || <FileIcon className="h-4 w-4 text-gray-300" />;
};

const formatFileSize = (bytes) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
};

// Returns a formatted size string or an empty string when size is missing/invalid
const safelyFormatFileSize = (value) => {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) {
    return "";
  }
  return formatFileSize(numeric);
};

const isImageFile = (fileName) => {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
  const ext = fileName.split(".").pop()?.toLowerCase();
  return imageExtensions.includes(ext);
};

const FilePreview = ({
  file,
  onRemove,
  isUploading = false,
  className = "",
}) => {
  const fileUrl = useMemo(() => {
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }
    return file.attachment_url || file.url || file.profile_image;
  }, [file]);

  const fileName = useMemo(() => {
    if (file instanceof File) {
      return file.name;
    }
    return file.attachment_name || file.name || file.fileName || "Unknown file";
  }, [file]);

  const fileSize = useMemo(() => {
    if (file instanceof File) {
      return safelyFormatFileSize(file.size);
    }
    const size = file?.attachment_size ?? file?.size ?? file?.fileSize;
    return safelyFormatFileSize(size);
  }, [file]);

  const handleRemove = useCallback(
    (e) => {
      e.stopPropagation();
      onRemove?.();
    },
    [onRemove]
  );

  if (isImageFile(fileName)) {
    return (
      <div
        className={cn(
          "group relative rounded-lg border border-white/10 bg-white/5 p-2",
          className
        )}
      >
        <div className="relative">
          {/* Image */}
          {fileUrl ? (
            <>
              <img
                alt={fileName}
                className="h-24 w-24 rounded-md object-cover"
                src={fileUrl}
              />

              {/* Spinner Overlay when Uploading */}
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/50">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                </div>
              )}

              {/* Close Button (top-right corner) */}
              {!isUploading && (
                <button
                  className="absolute right-1 cursor-pointer top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                  onClick={handleRemove}
                  type="button"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </>
          ) : (
            /* Placeholder or Uploading without image */
            <div className="flex h-24 w-24 items-center justify-center rounded-md bg-white/10">
              {isUploading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <p className="text-xs text-gray-400">No file</p>
              )}
            </div>
          )}
        </div>

        {/* Show name and size only when image not shown */}
        {!fileUrl && !isUploading && (
          <div className="mt-2 flex flex-col">
            <p className="truncate text-sm font-medium text-white">
              {fileName}
            </p>
            {fileSize && (
              <p className="text-[10px] text-gray-400">{fileSize}</p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative rounded-lg border border-white/10 bg-white/5 p-3",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">{getFileIcon(fileName)}</div>

        <div className="min-w-0 flex-1">
          <p className="max-w-[120px] truncate font-medium text-sm text-white sm:max-w-[120px]">
            {fileName}
          </p>

          {fileSize && <p className="text-gray-400 text-xs">{fileSize}</p>}
        </div>

        <div className="flex items-center gap-2">
          {isUploading && (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}
          {!isUploading && (
            <Button
              className="h-6 w-6 rounded-full cursor-pointer bg-red-500/20 p-0 text-red-400 hover:bg-red-500/30"
              onClick={handleRemove}
              size="icon"
              type="button"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
