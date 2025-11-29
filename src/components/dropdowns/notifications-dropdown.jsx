import { Bell, CircleDot, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useDeleteNotification,
  useGetNotificationsList,
  useMarkReadAllNotifications,
} from "@/hooks/use-notifications";
import NotificationsSkeleton from "../skeletons/notifications-skeleton";
import { formatDistanceToNow } from "date-fns";
import PrimaryButton from "../buttons/primary-button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function NotificationsDropdown() {
  const { data, isLoading, refetch } = useGetNotificationsList();
  const { mutate: markReadNotification, isPending } =
    useMarkReadAllNotifications();
  const { mutate: deleteNotification } = useDeleteNotification();

  const [removingId, setRemovingId] = useState(null);

  const handleDelete = (id) => {
    setRemovingId(id);
    deleteNotification(id, {
      onSuccess: () => refetch(),
      onError: () => setRemovingId(null), // revert if failed
    });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          className="relative rounded-full cursor-pointer border border-[var(--border)] bg-[var(--background)]"
          size="icon"
          variant="ghost"
        >
          <Bell size={20} />
          {data?.unread_count > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[#db3434] px-1 text-[10px] font-semibold text-white leading-none">
              {data.unread_count > 9 ? "9+" : data.unread_count}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 rounded-xl border border-[var(--border)] bg-[var(--background)] shadow-lg md:w-96"
      >
        <div className="flex items-center justify-between gap-6">
          <DropdownMenuLabel className="font-medium text-base">
            Notifications
          </DropdownMenuLabel>

          <PrimaryButton
            className="!h-8 min-w-[90px] rounded-lg text-[var(--light-blue)] bg-transparent border border-[var(--light-blue)] text-sm"
            title="Clear All"
            loading={isPending}
            onClick={() => markReadNotification()}
          />
        </div>

        <p className="mb-2 px-2 text-[var(--light-white)] text-sm">
          Control your notification preferences and never miss important
          updates.
        </p>
        <DropdownMenuSeparator />
        <div className="max-h-96 overflow-y-auto scrollbar-thin ">
          {isLoading ? (
            <NotificationsSkeleton />
          ) : data?.results?.length > 0 ? (
            <AnimatePresence>
              {data.results.map((notif) =>
                notif.id !== removingId ? (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      marginBottom: 0,
                      padding: 0,
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    <DropdownMenuItem
                      className={`cursor-pointer  text-sm hover:bg-transparent transition-all duration-200 ${
                        notif.is_read ? "opacity-70" : "opacity-100"
                      }`}
                      key={notif.id}
                    >
                      <div
                        className={`flex w-full flex-col gap-1 rounded-xl border p-2 transition-all duration-200 ${
                          notif.is_read
                            ? "border-[var(--border)] bg-white/5"
                            : "border-[var(--light-blue)] bg-white/10 shadow-[0_0_6px_var(--light-blue)]"
                        }`}
                      >
                        {/* Header row */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CircleDot
                              className="h-2 w-2"
                              color={
                                notif.is_read
                                  ? "var(--light-white)"
                                  : "var(--light-blue)"
                              }
                            />
                            <h1
                              className={`font-medium text-sm ${
                                notif.is_read
                                  ? "text-[var(--text)]"
                                  : "text-[var(--light-blue)]"
                              }`}
                            >
                              {notif.title}
                            </h1>
                            <p className="text-[var(--light-white)] text-xs">
                              {formatDistanceToNow(new Date(notif.created_at), {
                                addSuffix: true,
                              })}
                            </p>
                          </div>
                          <button
                            className="cursor-pointer"
                            onClick={() => handleDelete(notif.id)}
                          >
                            <X className="h-3 w-3 text-[var(--light-white)]" />
                          </button>
                        </div>

                        {/* Description */}
                        <p
                          className={`text-xs ${
                            notif.is_read
                              ? "text-[var(--light-white)]/70"
                              : "text-[var(--text)]"
                          }`}
                        >
                          {notif.body}
                        </p>
                      </div>
                    </DropdownMenuItem>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          ) : (
            <div className="p-4 text-center text-[var(--light-white)] text-xs">
              No notifications
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
