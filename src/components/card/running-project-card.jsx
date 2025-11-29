import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import MoveTrashModal from "../modals/move-trash-modal";
import { ImageLoader } from "../ui/image-loader";

const RunningProjectCard = ({
  id,
  name,
  image,
  updatedAt,
  type = "recent",
  onCardClick,
  onRestoreClick,
  onDeletePermanently,
}) => {
  const [moveTrashModal, setMoveTrashModal] = useState(false);
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger className="w-full">
          <div
            className="flex cursor-pointer flex-col gap-2"
            onClick={onCardClick}
          >
            <div className="h-60 w-full">
              <ImageLoader
                alt={name}
                className="h-full w-full rounded-lg object-cover"
                height="100%"
                layout="cover"
                loaderColor="#1A1F2B"
                src={image}
                width="100%"
              />
            </div>
            <div className="flex items-center justify-between gap-6">
              <h1 className="font-light text-sm 2xl:text-base">{name}</h1>
              <p className="text-[var(--light-white)] text-xs">
                Updated{" "}
                {formatDistanceToNow(new Date(updatedAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        </ContextMenuTrigger>

        {/* Right-click menu */}
        <ContextMenuContent className="w-40 rounded-lg border border-[var(--border)] bg-[var(--background)] p-1">
          {type === "trash" && (
            <>
              <ContextMenuItem
                onClick={onRestoreClick}
                className="rounded-none px-2 py-1.5 hover:bg-white/10"
              >
                Restore
              </ContextMenuItem>
              <div className="mx-2 h-px bg-[var(--border)]" />
              <ContextMenuItem
                onClick={onDeletePermanently}
                className="rounded-none px-2 py-1.5 hover:bg-white/10"
              >
                Delete Permanently
              </ContextMenuItem>
            </>
          )}

          {type === "recent" && (
            <>
              <ContextMenuItem
                className="rounded-none px-2 py-1.5 hover:bg-white/10"
                onClick={onCardClick}
              >
                Open
              </ContextMenuItem>
              <div className="mx-2 h-px bg-[var(--border)]" />

              {/* <ContextMenuItem className="rounded-none px-2 py-1.5 hover:bg-white/10">
                Share
              </ContextMenuItem> */}
              <div className="mx-2 h-px bg-[var(--border)]" />

              <ContextMenuItem
                className="rounded-none px-2 py-1.5 hover:bg-white/10"
                onClick={() => setMoveTrashModal(true)}
              >
                Move to Trash
              </ContextMenuItem>
            </>
          )}
        </ContextMenuContent>
      </ContextMenu>

      <MoveTrashModal
        onOpenChange={() => setMoveTrashModal(false)}
        open={moveTrashModal}
        id={id}
      />
    </>
  );
};

export default RunningProjectCard;
