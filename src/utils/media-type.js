export const getMediaType = (url) => {
  if (!url) return null;

  const extension = url.split(".").pop().toLowerCase().split("?")[0]; // get 'jpg', 'png', 'mp4', etc.

  const mimeMap = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    mp4: "video/mp4",
    mov: "video/quicktime",
    avi: "video/x-msvideo",
    mp3: "audio/mpeg",
    wav: "audio/wav",
    pdf: "application/pdf",
  };

  return mimeMap[extension] || "application/octet-stream"; // fallback if unknown
};
