import {
  File,
  FileArchive,
  FileAudio,
  FileCode,
  FileImage,
  FileJson,
  FileSpreadsheet,
  FileText,
  FileVideo,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import PrimaryButton from "@/components/buttons/primary-button";
import ApproveModal from "@/components/modals/approve-modal";
import CancelOfferModal from "@/components/modals/cancel-offer-modal";
import ConfirmModal from "@/components/modals/confirm-modal";
import WithdrawModal from "@/components/modals/withdraw-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageLoader } from "@/components/ui/image-loader";
import {
  useAcceptOfferMutation,
  useAcceptProjectMutation,
  useAddFeedbackMutation,
  useAddFeedbackToSystemMutation,
  useMakePaymentMutation,
  useRejectProjectMutation,
} from "@/hooks/use-thread";
import { useAuthStore } from "@/store/use-auth-store";
import AddFeedbackModal from "@/components/modals/add-feedback-modal";

const parseOfferText = (text = "") => {
  if (!text || typeof text !== "string") return {};

  try {
    // 1) Convert UUID('...') to "..."
    let s = text.replace(/UUID\('([^']+)'\)/g, '"$1"');

    // 2) Replace Python booleans/None with JS equivalents
    s = s.replace(/\bNone\b/g, "null");
    s = s.replace(/\bTrue\b/g, "true");
    s = s.replace(/\bFalse\b/g, "false");

    // 3) Convert single quotes to double quotes
    //    But avoid converting inside already double-quoted text (simple approach)
    s = s.replace(/'/g, '"');

    // 4) Trim and parse
    return JSON.parse(s);
  } catch (err) {
    console.error("parseOfferText failed:", err, "original:", text);
    return {};
  }
};

const getStatusDisplay = (value) => {
  const normalized = value?.toLowerCase();

  if (normalized === "pending") {
    return (
      <span className="rounded-full bg-[#FACC151A] px-3 py-1 font-medium text-[#EAB308] text-sm">
        Pending
      </span>
    );
  }

  if (normalized === "approved") {
    return (
      <span className="rounded-full bg-[#22C55E1A] px-3 py-1 font-medium text-[#22C55E] text-sm">
        Approved
      </span>
    );
  }

  if (normalized === "rejected") {
    return (
      <span className="rounded-full bg-[#F43F5E1A] px-3 py-1 font-medium text-[#F43F5E] text-sm">
        Rejected
      </span>
    );
  }

  if (normalized === "cancelled") {
    return (
      <span className="rounded-full bg-[#9CA3AF1A] px-3 py-1 font-medium text-[#9CA3AF] text-sm">
        Cancelled
      </span>
    );
  }

  if (normalized === "withdraw") {
    return (
      <span className="rounded-full bg-[#3B82F61A] px-3 py-1 font-medium text-[#3B82F6] text-sm">
        Withdrawn
      </span>
    );
  }

  if (normalized === "delivered") {
    return (
      <span className="rounded-full bg-[#8B5CF61A] px-3 py-1 font-medium text-[#8B5CF6] text-sm">
        Delivered
      </span>
    );
  }

  if (normalized === "revision_required") {
    return (
      <span className="rounded-full bg-[#F973161A] px-3 py-1 font-medium text-[#F97316] text-sm">
        Revision Required
      </span>
    );
  }

  if (normalized === "completed") {
    return (
      <span className="rounded-full bg-[#0EA5E91A] px-3 py-1 font-medium text-[#0EA5E9] text-sm">
        Completed
      </span>
    );
  }

  return (
    <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-600 text-sm">
      {value}
    </span>
  );
};

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
    mp4: <FileVideo className="h-4 w-4 text-pink-400" />,
    mov: <FileVideo className="h-4 w-4 text-pink-400" />,
    mp3: <FileAudio className="h-4 w-4 text-yellow-400" />,
    wav: <FileAudio className="h-4 w-4 text-yellow-400" />,
    zip: <FileArchive className="h-4 w-4 text-orange-400" />,
    rar: <FileArchive className="h-4 w-4 text-orange-400" />,
    json: <FileJson className="h-4 w-4 text-green-300" />,
    js: <FileCode className="h-4 w-4 text-indigo-400" />,
    ts: <FileCode className="h-4 w-4 text-indigo-400" />,
    tsx: <FileCode className="h-4 w-4 text-indigo-400" />,
    py: <FileCode className="h-4 w-4 text-indigo-400" />,
    java: <FileCode className="h-4 w-4 text-indigo-400" />,
    cpp: <FileCode className="h-4 w-4 text-indigo-400" />,
  };

  return iconMap[ext] || <File className="h-4 w-4 text-gray-300" />;
};

const renderTextMessage = (msg, isMe) => (
  <div
    className={`rounded-b-md ${
      isMe ? "rounded-tl-md bg-blue-600" : "rounded-tr-md bg-white/10"
    } px-2 py-1 text-white text-xs sm:px-3 sm:py-2 sm:text-sm`}
  >
    {msg.text}
  </div>
);

const renderFileMessage = (msg, isMe) => {
  const fileUrl = msg.attachment_url || msg.fileUrl || msg.url;
  const fileName =
    msg.attachment_name || msg.fileName || msg.file_name || "Unknown file";
  const fileSize =
    msg.attachment_size || msg.fileSize || msg.file_size || "Unknown size";

  const isImage = (() => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    return ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext || "");
  })();

  if (isImage && fileUrl) {
    return (
      <div
        className={`flex flex-col gap-2 ${isMe ? "items-end" : "items-start"}`}
      >
        <a
          className="block overflow-hidden rounded-lg"
          href={fileUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="inline-block rounded-lg border border-[var(--border)] bg-white/5">
            <ImageLoader
              alt={fileName}
              className="max-h-[220px] max-w-[220px] rounded-lg object-contain"
              loaderColor="#1A1F2B"
              objectFit="contain"
              src={fileUrl}
            />
          </div>
        </a>

        {msg.text ? renderTextMessage(msg, isMe) : null}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-2 ${isMe ? "items-end" : "items-start"}`}
    >
      <a
        className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white hover:border-white/20"
        href={fileUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
          {getFileIcon(fileName)}
        </div>
        <div className="min-w-0">
          <p className="max-w-[120px] truncate font-medium text-sm text-white sm:max-w-[120px]">
            {fileName}
          </p>
          <p className="text-[11px] text-gray-300">{fileSize}</p>
        </div>
        <span className="ml-2 hidden rounded-md border border-white/10 px-2 py-1 text-[10px] text-gray-200 group-hover:block">
          Open
        </span>
      </a>

      {msg.text ? renderTextMessage(msg, isMe) : null}
    </div>
  );
};

const renderOfferMessage = (msg, isMe, onWithdraw, onDecline, onAccept) => {
  const offerClasses = isMe ? "rounded-tl-md" : "rounded-tr-md";
  const offerData = parseOfferText(msg?.text);

  const title = offerData?.title;
  const description = offerData?.description;
  const amount = offerData?.amount || offerData?.amount?.toString() || "0.00";
  const deadline = offerData?.deadline || offerData?.deliveryTime;
  const mediaUrl = offerData?.media_url || offerData?.mediaUrl || null;
  const mediaLabel = mediaUrl ? "View" : "No media";
  const status = offerData?.status?.toLowerCase?.() || "pending";

  // simple color map for status text
  const statusColors = {
    approved: "text-green-400",
    rejected: "text-red-400",
    withdraw: "text-orange-400",
    cancelled: "text-gray-400",
  };

  return (
    <div
      className={`rounded-b-md ${offerClasses} max-w-md bg-white/10 px-2 py-1 text-white text-xs sm:px-3 sm:py-2 sm:text-sm`}
    >
      <div className="flex flex-col gap-1 sm:gap-2">
        {/* Title & Amount */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <h1 className="font-semibold text-[var(--text)] text-sm sm:text-base">
            {title || "Untitled Offer"}
          </h1>
          <h1 className="font-semibold text-[var(--text)] text-sm sm:text-base">
            ${typeof amount === "number" ? amount.toFixed(2) : amount}
          </h1>
        </div>

        {/* Description */}
        {description && <p className="text-[10px] sm:text-sm">{description}</p>}

        {/* Deadline & Media */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex items-center gap-1 sm:gap-2">
            <p className="text-[9px] text-[var(--text)] sm:text-xs">
              Deadline:
            </p>
            <p className="font-semibold text-[9px] text-[var(--text)] sm:text-xs">
              {deadline || "N/A"}
            </p>
          </div>

          {mediaUrl ? (
            <div className="flex items-center gap-1 sm:gap-2">
              <p className="text-[9px] text-[var(--text)] sm:text-xs">Media:</p>
              <a
                className="font-semibold text-[9px] text-[var(--text)] underline sm:text-xs"
                href={mediaUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {mediaLabel}
              </a>
            </div>
          ) : null}
        </div>

        {/* Buttons (only for pending) */}
        {status === "pending" ? (
          isMe ? (
            <PrimaryButton
              className="mt-2 rounded-lg bg-black text-[10px] sm:mt-4 sm:text-sm"
              onClick={onWithdraw}
              title="Withdraw Offer"
            />
          ) : (
            <div className="flex w-full flex-col items-center gap-1 sm:gap-2">
              <PrimaryButton
                className="!h-8 sm:!h-10 mt-2 w-full rounded-lg bg-black text-[10px] sm:text-sm"
                onClick={onAccept}
                title="Accept Offer"
              />
              <PrimaryButton
                className="!h-8 sm:!h-10 w-full rounded-lg bg-white/5 text-[10px] sm:text-sm"
                onClick={onDecline}
                title="Decline"
              />
            </div>
          )
        ) : (
          <div className="mt-2 flex justify-center">
            {(() => {
              const messageText =
                status === "approved"
                  ? "This offer has been approved."
                  : status === "rejected"
                  ? "This offer has been rejected."
                  : status === "withdraw"
                  ? "This offer has been withdrawn."
                  : status === "cancelled"
                  ? "This offer has been cancelled."
                  : "";

              const colorClass = statusColors[status] || "text-gray-300";

              return (
                <span
                  className={`text-center font-medium text-[10px] sm:text-sm ${colorClass}`}
                >
                  {messageText}
                </span>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

const renderDeliveredOfferMessage = (
  data,
  isMe,
  onApprove,
  onReject,
  status,
  onFeedback
) => {
  const sideClass = isMe ? "rounded-tl-md" : "rounded-tr-md";
  const title = data?.title || "Delivered work";
  const description = data?.description || "";
  const rawAmount = data?.amount;
  const amount =
    typeof rawAmount === "number"
      ? rawAmount.toFixed(2)
      : String(rawAmount || "0.00");
  const projectName = data?.project_name || data?.projectName || "Project";
  const requestId = data?.request_id || data?.requestId;
  const deadline = data?.deadline || data?.deliveryTime || null;
  const paymentStatus = (data?.payment_status || "").toString().toLowerCase();

  const paymentBadge = {
    text:
      paymentStatus === "paid"
        ? "text-green-400"
        : paymentStatus === "unpaid"
        ? "text-yellow-400"
        : "text-gray-300",
    bg:
      paymentStatus === "paid"
        ? "bg-green-500/10"
        : paymentStatus === "unpaid"
        ? "bg-yellow-500/10"
        : "bg-white/10",
    label: paymentStatus
      ? paymentStatus[0].toUpperCase() + paymentStatus.slice(1)
      : "",
  };

  const normalizedStatus = (status || data?.status || "delivered")
    .toString()
    .toLowerCase();
  const isRevisionRequired = normalizedStatus === "revision_required";
  const isCompleted = normalizedStatus === "completed";
  const isReviewed = data?.is_reviewed;

  return (
    <div
      className={`rounded-b-md ${sideClass} max-w-md bg-white/5 px-0.5 py-0.5 sm:px-0.5 sm:py-0.5`}
    >
      <div className="rounded-md border border-[var(--border)] bg-gradient-to-br from-white/10 to-white/0 p-2 sm:p-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="truncate rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-gray-200 sm:text-xs">
                {projectName}
              </span>
              {requestId ? (
                <span className="truncate rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-gray-200 sm:text-xs">
                  {requestId}
                </span>
              ) : null}
              <span className="text-[10px] sm:text-xs">
                {getStatusDisplay(normalizedStatus)}
              </span>
              {paymentBadge.label ? (
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] sm:text-xs ${paymentBadge.text} ${paymentBadge.bg}`}
                >
                  {paymentBadge.label}
                </span>
              ) : null}
            </div>
            <h3 className="mt-1 truncate font-semibold text-[var(--text)] text-sm sm:text-base">
              {title}
            </h3>
          </div>
          <div className="flex-shrink-0">
            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-semibold text-[var(--text)] text-xs sm:text-sm">
              ${amount}
            </span>
          </div>
        </div>

        {description ? (
          <p className="mt-1 text-[10px] text-white/90 sm:text-sm">
            {description}
          </p>
        ) : null}

        {isRevisionRequired ? (
          <p className="mt-1 text-[10px] text-white/90 sm:text-sm">
            The completed request has been rejected. Revision is required.
          </p>
        ) : null}

        {!isRevisionRequired && !isCompleted && !isReviewed ? (
          <p className="mt-1 text-[10px] text-white/90 sm:text-sm">
            The project for this offer has been delivered. Kindly approve this.
          </p>
        ) : null}

        {isCompleted && !isReviewed ? (
          <>
            <p className="mt-1 text-[10px]  text-white/90 sm:text-sm">
              The project for this offer has been delivered. Kindly give a
              review.
            </p>
          </>
        ) : null}

        {isReviewed ? (
          <p className="mt-1 text-[10px] text-white/90 sm:text-sm">
            The project for this offer has been reviewed.
          </p>
        ) : null}

        <div className="mt-2 flex flex-wrap items-center gap-3">
          {deadline ? (
            <div className="flex items-center gap-1 sm:gap-2">
              <p className="text-[9px] text-[var(--text)] sm:text-xs">
                Deadline
              </p>
              <p className="font-semibold text-[9px] text-[var(--text)] sm:text-xs">
                {deadline}
              </p>
            </div>
          ) : null}
        </div>

        {!isMe && !isRevisionRequired && !isCompleted ? (
          <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-end sm:gap-2">
            <PrimaryButton
              className="!h-8 sm:!h-10 w-full rounded-lg bg-[var(--light-blue)] text-[10px] sm:w-auto sm:text-sm"
              onClick={onApprove}
              title="Approve"
            />
            <PrimaryButton
              className="!h-8 sm:!h-10 w-full rounded-lg bg-[#BF0205] text-[10px] sm:w-auto sm:text-sm"
              onClick={onReject}
              title="Reject"
            />
          </div>
        ) : !isMe && isCompleted && !isReviewed ? (
          <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-end sm:gap-2">
            <PrimaryButton
              className="!h-8 sm:!h-10 w-full rounded-lg bg-[var(--light-blue)] text-[10px] sm:w-auto sm:text-sm"
              onClick={onFeedback}
              title="Give Review"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

const renderCompleteProjectMessage = (msg, isMe, onApprove) => {
  const projectClasses = isMe ? "rounded-tl-md" : "rounded-tr-md";

  return (
    <div
      className={`rounded-b-md ${projectClasses} bg-white/10 px-2 py-1 text-white text-xs sm:px-3 sm:py-2 sm:text-sm`}
    >
      <div className="flex flex-col gap-1 sm:gap-2">
        <div className="flex items-center justify-between gap-6">
          <h1 className="font-semibold text-[var(--text)] text-sm sm:text-base">
            {msg.title}
          </h1>
        </div>
        <p className="text-[10px] sm:text-sm">{msg.description}</p>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
          <PrimaryButton
            className="!h-8 sm:!h-10 mt-2 flex-1 rounded-lg bg-[var(--light-blue)] text-[10px] sm:text-sm"
            onClick={isMe ? onApprove : undefined}
            title="Approve"
          />
          <PrimaryButton
            className="!h-8 sm:!h-10 flex-1 rounded-lg bg-[#BF0205] text-[10px] sm:text-sm"
            title="Reject"
          />
        </div>
      </div>
    </div>
  );
};

const renderPaymentMessage = (msg, isMe, onMakePayment) => {
  // Parse payment payload from text (same parser as offers)
  const data = parseOfferText(msg?.text);
  const title = data?.title || "Payment";
  const description = data?.description;
  const rawAmount = data?.amount;
  const amount =
    typeof rawAmount === "number"
      ? rawAmount.toFixed(2)
      : String(rawAmount || "0.00");
  const deadline = data?.deadline || data?.deliveryTime || null;
  const mediaUrl = data?.media_url || data?.mediaUrl || null;
  const paymentStatus = (data?.payment_status || "unpaid").toLowerCase();
  const requestId = data?.request_id;

  // For my own messages, show a polished confirmation bubble
  if (isMe) {
    const confirmationText = title
      ? `The offer "${title}" has been accepted. Payment amount: $${amount}.`
      : `The offer has been accepted. Payment amount: $${amount}.`;

    return renderTextMessage({ ...msg, text: confirmationText }, true);
  }

  const statusStyles = {
    paid: { text: "text-green-400", bg: "bg-green-500/10", label: "Paid" },
    unpaid: {
      text: "text-yellow-400",
      bg: "bg-yellow-500/10",
      label: "Unpaid",
    },
    failed: { text: "text-red-400", bg: "bg-red-500/10", label: "Failed" },
  };

  const badge = statusStyles[paymentStatus] || statusStyles.unpaid;

  // Card shell for other party (kept modern and distinct from offer)
  const sideClass = "rounded-tr-md";

  return (
    <div
      className={`rounded-b-md ${sideClass} max-w-md bg-white/5 px-0.5 py-0.5 sm:px-0.5 sm:py-0.5`}
    >
      <div className="rounded-md border border-[var(--border)] bg-gradient-to-br from-white/10 to-white/0 p-2 sm:p-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              {requestId ? (
                <span className="truncate text-[10px] text-gray-300 sm:text-xs">
                  {requestId}
                </span>
              ) : null}
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] sm:text-xs ${badge.text} ${badge.bg}`}
              >
                {badge.label}
              </span>
            </div>
            <h3 className="mt-1 truncate font-semibold text-[var(--text)] text-sm sm:text-base">
              {title}
            </h3>
          </div>
          <div className="flex-shrink-0">
            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-semibold text-[var(--text)] text-xs sm:text-sm">
              ${amount}
            </span>
          </div>
        </div>

        {description ? (
          <p className="mt-1 text-[10px] text-white/90 sm:text-sm">
            {description}
          </p>
        ) : null}

        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {deadline ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <p className="text-[9px] text-[var(--text)] sm:text-xs">
                  Deadline
                </p>
                <p className="font-semibold text-[9px] text-[var(--text)] sm:text-xs">
                  {deadline}
                </p>
              </div>
            ) : null}

            {mediaUrl ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <p className="text-[9px] text-[var(--text)] sm:text-xs">
                  Media
                </p>
                <a
                  className="font-semibold text-[9px] text-[var(--text)] underline sm:text-xs"
                  href={mediaUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  View
                </a>
              </div>
            ) : null}
          </div>

          {paymentStatus === "unpaid" ? (
            isMe ? null : (
              <PrimaryButton
                className="w-full rounded-lg bg-[var(--light-blue)] text-[10px] sm:w-auto sm:text-sm"
                onClick={onMakePayment}
                title="Make Payment"
              />
            )
          ) : (
            <p
              className={`text-center font-medium text-[10px] sm:text-xs ${badge.text}`}
            >
              {badge.label}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Message = ({ msg }) => {
  const [withdrawalModal, setWithdrawalModal] = useState(false);
  const [declineOfferModal, setDeclineOfferModal] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [approveModal, setApproveModal] = useState(false);
  const [acceptOfferModal, setAcceptOfferModal] = useState(false);
  const [makePaymentModal, setMakePaymentModal] = useState(false);
  const [deliveredConfirmOpen, setDeliveredConfirmOpen] = useState(false);
  const [deliveredConfirmMode, setDeliveredConfirmMode] = useState(null); // 'approve' | 'revision'
  const [showSystemFeedbackModal, setShowSystemFeedbackModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const user = useAuthStore((state) => state.user);

  const { mutate: acceptOffer, isPending: isAcceptOfferPending } =
    useAcceptOfferMutation();

  const { mutate: makePayment, isPending: isMakePaymentPending } =
    useMakePaymentMutation();

  const { mutate: rejectProject, isPending: isRejectProjectPending } =
    useRejectProjectMutation();
  const { mutate: acceptProject, isPending: isAcceptProjectPending } =
    useAcceptProjectMutation();

  const { mutate: addFeedback, isPending: isAddFeedbackPending } =
    useAddFeedbackMutation();

  const {
    mutate: addFeedbackToSystem,
    isPending: isAddFeedbackToSystemPending,
  } = useAddFeedbackToSystemMutation();

  const isMe = msg.sender === user?.id || msg.sender === String(user?.id);

  const handleWithdrawalModalChange = useCallback((open) => {
    setWithdrawalModal(open);
    setSelectedOfferId(null);
    setSelectedMessageId(null);
  }, []);

  const handleDeclineOfferModalChange = useCallback((open) => {
    setDeclineOfferModal(open);
    setSelectedOfferId(null);
    setSelectedMessageId(null);
  }, []);

  const handleApproveModalChange = useCallback((open) => {
    setApproveModal(open);
    setSelectedOfferId(null);
    setSelectedMessageId(null);
  }, []);

  const handleMakePaymentModalChange = useCallback((open) => {
    setMakePaymentModal(open);
    if (!open) {
      setSelectedOfferId(null);
      setSelectedMessageId(null);
    }
  }, []);

  const handleFeedbackModalChange = useCallback((open) => {
    setFeedbackModal(open);
    setSelectedOfferId(null);
    setSelectedMessageId(null);
  }, []);

  const messageContent = useMemo(() => {
    if (msg.message_type === "system") {
      return (
        <div className="my-4 flex items-center gap-2">
          <div className="flex-1 border-[var(--border)] border-t" />
          <span className="px-3 text-gray-400 text-xs">{msg.text}</span>
          <div className="flex-1 border-[var(--border)] border-t" />
        </div>
      );
    }

    if (msg.message_type === "text") {
      return renderTextMessage(msg, isMe);
    }

    if (msg.message_type === "file") {
      return renderFileMessage(msg, isMe);
    }

    if (msg.message_type === "offer") {
      // parse once here so you can extract offer ID and status
      const offerData = parseOfferText(msg.text);
      const offerId = offerData?.id || null;
      const status = offerData?.status?.toLowerCase?.();

      // If delivered or revision_required, show rich delivered/revision card
      if (
        status === "delivered" ||
        status === "revision_required" ||
        status === "completed"
      ) {
        if (isMe) {
          return renderDeliveredOfferMessage(
            offerData,
            true,
            undefined,
            undefined,
            status
          );
        }
        return renderDeliveredOfferMessage(
          offerData,
          false,
          () => {
            setSelectedOfferId(offerId);
            setSelectedMessageId(msg.id);
            setDeliveredConfirmMode("approve");
            setDeliveredConfirmOpen(true);
          },
          () => {
            setSelectedOfferId(offerId);
            setSelectedMessageId(msg.id);
            setDeliveredConfirmMode("revision");
            setDeliveredConfirmOpen(true);
          },
          status,
          () => {
            setSelectedOfferId(offerId);
            setSelectedMessageId(msg.id);
            setFeedbackModal(true);
          }
        );
      }

      return renderOfferMessage(
        msg,
        isMe,
        () => {
          setSelectedOfferId(offerId);
          setWithdrawalModal(true);
          setSelectedMessageId(msg.id);
        },
        () => {
          setSelectedOfferId(offerId);
          setDeclineOfferModal(true);
          setSelectedMessageId(msg.id);
        },
        () => {
          setSelectedOfferId(offerId);
          setAcceptOfferModal(true);
          setSelectedMessageId(msg.id);
        }
      );
    }

    if (msg.message_type === "complete-project") {
      return renderCompleteProjectMessage(msg, isMe, () =>
        setApproveModal(true)
      );
    }

    if (msg.message_type === "payment") {
      // parse payment object to capture offer id for confirmation flow
      const paymentData = parseOfferText(msg.text);
      const paymentOfferId = paymentData?.id || null;
      return renderPaymentMessage(msg, isMe, () => {
        setSelectedOfferId(paymentOfferId);
        setSelectedMessageId(msg.id);
        setMakePaymentModal(true);
      });
    }

    return null;
  }, [msg, isMe]);

  if (msg.message_type === "system") {
    return messageContent;
  }

  const handleSubmitReview = (data, onSuccess) => {
    const payload = {
      rating: data.rating,
      comment: data.message,
      message_id: selectedMessageId,
    };

    addFeedback(
      {
        offerId: selectedOfferId,
        payload: payload,
      },
      {
        onSuccess: () => {
          onSuccess();
          toast.success("Review submitted successfully");
          setFeedbackModal(false);
          setSelectedOfferId(null);
          setSelectedMessageId(null);
        },
      }
    );
  };

  const handleSubmitReviewToSystem = (data, onSuccess) => {
    const payload = {
      rating: data.rating,
      comment: data.message,
    };

    addFeedbackToSystem(
      payload,

      {
        onSuccess: () => {
          onSuccess();
          setShowSystemFeedbackModal(false);
        },
      }
    );
  };

  return (
    <div
      className={`flex ${
        isMe ? "justify-end" : "justify-start"
      } gap-1 sm:gap-2`}
      key={msg.id}
    >
      {!isMe && (
        <div className="flex max-w-[85%] items-start gap-1 sm:max-w-[70%] sm:gap-2">
          <Avatar className="h-6 w-6 flex-shrink-0 sm:h-8 sm:w-8">
            <AvatarImage
              className="object-cover"
              src={msg.profile_image || msg.avatar}
            />
            <AvatarFallback>
              {(msg.sender_name || msg.sender)?.[0]}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <div className="flex w-full items-center justify-between gap-1 sm:gap-2">
              <p className="text-[10px] text-[var(--light-white)] sm:text-xs">
                {msg.sender_name || msg.sender || "Unknown"}
              </p>
              <p className="mt-1 text-[8px] text-[var(--light-white)] sm:text-[10px]">
                {new Date(msg.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            {messageContent}
          </div>
        </div>
      )}

      {isMe && (
        <div className="flex max-w-[85%] flex-col items-end sm:max-w-[70%]">
          <div className="flex w-full items-center justify-between gap-1 sm:gap-2">
            <p className="text-[10px] text-[var(--light-white)] sm:text-xs">
              You
            </p>
            <p className="mt-1 text-[8px] text-[var(--light-white)] sm:text-xs">
              {new Date(msg.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          {messageContent}
        </div>
      )}

      {withdrawalModal && (
        <WithdrawModal
          messageId={selectedMessageId}
          offerId={selectedOfferId}
          onOpenChange={handleWithdrawalModalChange}
          open={withdrawalModal}
        />
      )}

      {declineOfferModal && (
        <CancelOfferModal
          messageId={selectedMessageId}
          offerId={selectedOfferId}
          onOpenChange={handleDeclineOfferModalChange}
          open={declineOfferModal}
        />
      )}

      <ConfirmModal
        confirmText="Accept"
        description="Are you sure you want to accept this offer?"
        loading={isAcceptOfferPending}
        onConfirm={() => {
          acceptOffer(
            {
              offerId: selectedOfferId,
              payload: { message_id: selectedMessageId },
            },
            {
              onSuccess: () => {
                toast.success("Offer accepted successfully");
                setSelectedOfferId(null);
                setSelectedMessageId(null);
                setAcceptOfferModal(false);
              },
            }
          );
        }}
        onOpenChange={() => setAcceptOfferModal(false)}
        open={acceptOfferModal}
        title="Confirm Accept"
      />

      <ConfirmModal
        confirmText={deliveredConfirmMode === "approve" ? "Approve" : "Send"}
        description={
          deliveredConfirmMode === "approve"
            ? "Are you sure you want to approve this delivered work?"
            : "Are you sure you want to mark this as revision required?"
        }
        loading={isRejectProjectPending || isAcceptProjectPending}
        onConfirm={() => {
          if (deliveredConfirmMode === "approve") {
            acceptProject(
              {
                offerId: selectedOfferId,
                payload: { message_id: selectedMessageId },
              },
              {
                onSuccess: () => {
                  toast.success("Project accepted successfully");
                  setSelectedOfferId(null);
                  setSelectedMessageId(null);
                  setDeliveredConfirmOpen(false);
                  setShowSystemFeedbackModal(true);
                },
              }
            );
          } else if (deliveredConfirmMode === "revision") {
            rejectProject(
              {
                offerId: selectedOfferId,
                payload: { message_id: selectedMessageId },
              },
              {
                onSuccess: () => {
                  toast.success("Project rejected successfully");
                  setSelectedOfferId(null);
                  setSelectedMessageId(null);
                  setDeliveredConfirmOpen(false);
                },
              }
            );
          } else {
            setDeliveredConfirmOpen(false);
          }
        }}
        onOpenChange={(open) => {
          if (isRejectProjectPending) return;
          setDeliveredConfirmOpen(open);
        }}
        open={deliveredConfirmOpen}
        title={
          deliveredConfirmMode === "approve"
            ? "Confirm Approve"
            : "Revision Required"
        }
      />

      <ConfirmModal
        confirmText="Pay"
        description="Are you sure you want to make this payment?"
        loading={isMakePaymentPending}
        onConfirm={() => {
          makePayment(
            {
              offerId: selectedOfferId,
              payload: { message_id: selectedMessageId },
            },
            {
              onSuccess: (data) => {
                const checkoutUrl = data?.checkout_url;
                if (checkoutUrl) {
                  try {
                    window.open(checkoutUrl, "_self");
                  } catch {}
                }

                setSelectedOfferId(null);
                setSelectedMessageId(null);
                setMakePaymentModal(false);
              },
              onError: (error) => {
                toast.error(
                  error?.response?.data?.detail || "Something went wrong"
                );
              },
            }
          );
        }}
        onOpenChange={handleMakePaymentModalChange}
        open={makePaymentModal}
        title="Confirm Payment"
      />

      {/* Feedback to Delivered Work of Developer */}
      <AddFeedbackModal
        onOpenChange={handleFeedbackModalChange}
        open={feedbackModal}
        onSubmitReview={handleSubmitReview}
        loading={isAddFeedbackPending}
      />

      {/* Feedback to System */}
      <AddFeedbackModal
        onOpenChange={() => setShowSystemFeedbackModal(false)}
        open={showSystemFeedbackModal}
        onSubmitReview={handleSubmitReviewToSystem}
        loading={isAddFeedbackToSystemPending}
        type="system"
      />

      {approveModal && (
        <ApproveModal
          onOpenChange={handleApproveModalChange}
          open={approveModal}
        />
      )}
    </div>
  );
};

export default Message;
