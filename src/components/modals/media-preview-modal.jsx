import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ImageLoader } from "../ui/image-loader";

const MediaPreviewModal = ({ url, type, open, onOpenChange }) => (
  <Dialog onOpenChange={onOpenChange} open={open}>
    <DialogContent className="!w-full !max-w-full !h-screen flex items-center justify-center border-0 bg-black/75 p-0">
      <div className="flex h-[90vh] w-full items-center justify-center p-4">
        {type.startsWith("image") ? (
          <div className="flex h-full w-full items-center justify-center">
            <ImageLoader
              alt="preview"
              height={"100%"}
              objectFit="contain"
              src={url}
              width={"100%"}
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <video
              autoPlay
              className="max-h-full max-w-full object-contain"
              controls
              src={url}
            />
          </div>
        )}
      </div>
    </DialogContent>
  </Dialog>
);

export default MediaPreviewModal;
