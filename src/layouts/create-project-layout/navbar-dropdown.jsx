import { memo, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MoveTrashModal from "@/components/modals/move-trash-modal";
import UpdateProjectNameModal from "@/components/modals/update-project-name-modal";
import { Icons } from "@/components/shared/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProjectContext } from "@/contexts/project-context";
import { useProjectNavigation } from "@/hooks/use-project-navigation";
import WorkspaceSelectModal from "@/components/modals/workspace-select-modal";
import { useMoveToWorkSpaceMutation } from "@/hooks/use-workplace";

const MENU_ITEMS = [
  { key: "dashboard", label: "Go to Dashboard" },
  { key: "rename", label: "Rename" },
  { key: "move", label: "Move to Workspace" },
  { key: "trash", label: "Move to Trash" },
];

/**
 * NavbarDropdown
 */
const NavbarDropdown = memo(() => {
  const navigate = useNavigate();
  const { id: projectId } = useParams();
  const [moveTrashModal, setMoveTrashModal] = useState(false);
  const [workSpaceModal, setWorkSpaceModal] = useState(false);
  const [renameModal, setRenameModal] = useState(false);
  const { liveProjectName } = useProjectContext();

  const { mutate: moveToWorkspace, isPending: isMoveToWorkspacePending } =
    useMoveToWorkSpaceMutation();

  const { projectName, raw_project_name, conversation_id, isLoading } =
    useProjectNavigation(projectId, liveProjectName);

  const handleMenuClick = (key) => {
    if (key === "rename") {
      setRenameModal(true);
    } else if (key === "move") {
      setWorkSpaceModal(true);
    } else if (key === "trash") {
      setMoveTrashModal(true);
    } else if (key === "dashboard") {
      navigate("/recently");
    }
  };

  // Memoize menu items
  const menuItems = useMemo(
    () =>
      MENU_ITEMS.map((item, idx) => (
        <div key={item.key}>
          <DropdownMenuItem
            className="cursor-pointer transition-colors hover:bg-[var(--input)]"
            onClick={() => handleMenuClick(item.key)}
          >
            {item.label}
          </DropdownMenuItem>
          {idx < MENU_ITEMS.length - 1 && (
            <DropdownMenuSeparator className="bg-[var(--border)]" />
          )}
        </div>
      )),
    []
  );

  return (
    <>
      <DropdownMenu>
        {/* Dropdown Trigger */}
        <DropdownMenuTrigger className="flex cursor-pointer items-center gap-3 rounded-[8px] border border-[var(--border)] bg-[var(--input)] px-4 py-[7px]">
          {isLoading ? (
            <div className="h-5 w-32 animate-pulse rounded bg-white/20" />
          ) : (
            <h1 className="font-medium text-base">{projectName}</h1>
          )}
          <Icons.ArrowDown />
        </DropdownMenuTrigger>

        {/* Dropdown Content */}
        <DropdownMenuContent
          align="start"
          className="mt-2 w-72 border-[var(--border)] bg-[var(--background)] px-2 font-semibold text-[var(--text)]"
        >
          {menuItems}
        </DropdownMenuContent>
      </DropdownMenu>
      <MoveTrashModal
        onOpenChange={() => setMoveTrashModal(false)}
        open={moveTrashModal}
        id={conversation_id}
      />
      <UpdateProjectNameModal
        onOpenChange={() => setRenameModal(false)}
        open={renameModal}
        initialName={raw_project_name}
        conversationId={conversation_id}
      />

      <WorkspaceSelectModal
        open={workSpaceModal}
        onOpenChange={() => setWorkSpaceModal(false)}
        loading={isMoveToWorkspacePending}
        onConfirm={(id) => {
          const payload = { workspace_id: id, conversation_id: projectId };
          moveToWorkspace(payload, {
            onSuccess: () => {
              setWorkSpaceModal(false);
            },
          });
        }}
      />
    </>
  );
});

NavbarDropdown.displayName = "NavbarDropdown";

export default NavbarDropdown;
