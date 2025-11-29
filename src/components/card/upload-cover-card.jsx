import { Inbox, Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

const UploadCoverCard = ({
  defaultImage,
  onFileSelect,
  text = "to upload or drop your background cover photo",
}) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!defaultImage) {
      setPreview(null);
      return;
    }

    if (typeof defaultImage === "string") {
      // URL
      setPreview(defaultImage);
    } else if (defaultImage instanceof File) {
      // File
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(defaultImage);
    }
  }, [defaultImage]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file?.type?.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);

      if (onFileSelect) {
        onFileSelect(file);
      }
    }
  };

  return (
    <Card
      className="group relative my-2 max-w-md cursor-pointer overflow-hidden border border-[#FFFFFF0F] bg-[#FFFFFF0F] transition hover:border-blue-500"
      onClick={handleClick}
    >
      <input
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        ref={fileInputRef}
        type="file"
      />

      <div className="flex flex-col items-center justify-center gap-4 py-6">
        {preview ? (
          <div className="relative w-full">
            <img
              alt="Selected cover"
              className="max-h-40 w-full rounded-lg object-cover"
              src={preview}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="flex items-center gap-2 rounded-lg bg-white/20 px-3 py-2 backdrop-blur-sm">
                <Pencil className="h-5 w-5 text-white" />
                <span className="text-sm text-white">Change Photo</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="rounded-lg border border-white/5 bg-white/10 px-8 py-2">
              <Inbox className="h-6 w-6 text-white/70" />
            </div>
            <p className="text-center text-xs 2xl:text-sm">
              <span className="text-blue-500">Click here</span> {text}
            </p>
          </>
        )}
      </div>
    </Card>
  );
};

export default UploadCoverCard;
