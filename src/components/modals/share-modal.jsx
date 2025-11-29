import { Search, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PrimaryButton from "../buttons/primary-button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";

// Example user list
const USER_DATA = [
  {
    id: 1,
    name: "James Hall",
    avatar: "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
  {
    id: 3,
    name: "Michael Lee",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
  },
  {
    id: 4,
    name: "Emma Watson",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
  },
  {
    id: 5,
    name: "David Smith",
    avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
  },
];

const ShareModal = ({ open, onOpenChange }) => {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent
        className="!pt-0 border border-[#FFFFFF0F] bg-black sm:max-w-md"
        showCloseButton={false}
      >
        {/* Header */}
        <DialogHeader className="!p-0 flex flex-row items-center justify-between">
          <DialogTitle>Share</DialogTitle>
          <div className="flex items-center gap-1">
            <PrimaryButton
              className="bg-transparent text-[var(--light-blue)] hover:underline"
              title="Copy link"
            />
            <X className="h-4 w-4 cursor-pointer" onClick={onOpenChange} />
          </div>
        </DialogHeader>

        {/* Search */}
        <div className="relative mt-4 w-full">
          <Search className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 z-10 h-5 w-5 text-gray-300" />
          <Input
            className="rounded-full border border-white/20 bg-white/10 pl-10 text-white backdrop-blur-md placeholder:text-gray-300 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0"
            placeholder="Search Here"
            type="text"
          />
        </div>

        {/* User List */}
        <div className="py-4">
          <p className="text-[var(--gray)] text-base">Share with</p>

          <div className="mt-2 max-h-60 space-y-2 overflow-y-auto pr-2">
            {USER_DATA.map((user) => (
              <div
                className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-white/5"
                key={user.id}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    className="rounded-md object-cover"
                    src={user.avatar}
                  />
                  <AvatarFallback className="text-[var(--text)]">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p className="text-white">{user.name}</p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
