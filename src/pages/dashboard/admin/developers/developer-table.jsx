import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Icons } from "@/components/shared/icons";
import CentralizedTable from "@/components/tables/centeral-table";
import { Hint } from "@/components/ui/hint";
import { usePagination } from "@/hooks/use-pagination";
import {
  useGetAllAdminDevelopers,
  useUpdateDeveloperStatus,
} from "@/hooks/use-user-management";
import DeveloperStats from "./developer-stats";

const TABLE_HEADINGS = {
  user_id: "User ID",
  name: "Name",
  tech_stack: "Tech Stack",
  github_status: "GitHub Status",
  joined_on: "Joined on",
  active_projects: "Active Projects",
  vetting_status: "Vetting Status",
  action: "Action",
};

const DeveloperTable = () => {
  const navigate = useNavigate();
  const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange } =
    usePagination();

  const { data: developers, isLoading } = useGetAllAdminDevelopers({
    page,
    page_size: rowsPerPage,
  });

  const { mutate: updateDeveloperStatus, isPending } =
    useUpdateDeveloperStatus();

  const getVettingStatusDisplay = (value) => {
    if (value === "Approved" || value === "Active") {
      return (
        <span className="rounded-full bg-[#22C55E1A] px-3 py-1 font-medium text-[#22C55E] text-sm">
          {value}
        </span>
      );
    }
    if (value === "Pending") {
      return (
        <span className="rounded-full bg-[#FACC151A] px-3 py-1 font-medium text-[#EAB308] text-sm">
          Pending
        </span>
      );
    }
    return (
      <span className="rounded-full bg-[#F43F5E1A] px-3 py-1 font-medium text-[#FF0606] text-sm">
        {value === "Suspended" ? "Suspended" : "Suspended"}
      </span>
    );
  };

  const gitHubStatusColumn = useMemo(
    () => ({
      name: "github_status",
      data: (value) => (
        <div className="flex items-center justify-center">
          {value ? (
            <span className="rounded-full bg-[#22C55E1A] px-3 py-1 font-medium text-[#22C55E] text-sm">
              Connected
            </span>
          ) : (
            <span className="rounded-full bg-[#F43F5E1A] px-3 py-1 font-medium text-[#FF0606] text-sm">
              Disconnected
            </span>
          )}
        </div>
      ),
    }),
    []
  );

  const vettingStatusColumn = useMemo(
    () => ({
      name: "vetting_status",
      data: (value) => (
        <div className="flex items-center justify-center">
          {getVettingStatusDisplay(value)}
        </div>
      ),
    }),
    []
  );

  const actionColumn = useMemo(
    () => ({
      name: "action",
      data: (_, data) => (
        <div className="flex items-center gap-3">
          <Hint label="View" side="top" sideOffset={5}>
            <button
              className="cursor-pointer p-1 hover:text-blue-500"
              onClick={() => navigate(`/admin/developers/${data.id}`)}
              type="button"
            >
              <Icons.Eye />
            </button>
          </Hint>

          {data?.vetting_status === "Pending" && (
            <>
              <Hint label="Approve" side="top" sideOffset={5}>
                <button
                  className="cursor-pointer p-1 hover:text-green-500 disabled:opacity-50"
                  disabled={isPending}
                  onClick={() =>
                    updateDeveloperStatus({
                      user_id: data.user_id,
                      status: "Approved",
                    })
                  }
                  type="button"
                >
                  <Icons.Done />
                </button>
              </Hint>

              <Hint label="Suspend" side="top" sideOffset={5}>
                <button
                  className="cursor-pointer p-1 hover:text-red-500 disabled:opacity-50"
                  disabled={isPending}
                  onClick={() =>
                    updateDeveloperStatus({
                      user_id: data.user_id,
                      status: "Suspended",
                    })
                  }
                  type="button"
                >
                  <Icons.BlockUser />
                </button>
              </Hint>
            </>
          )}

          {data?.vetting_status === "Approved" && (
            <Hint label="Suspend" side="top" sideOffset={5}>
              <button
                className="cursor-pointer p-1 hover:text-red-500 disabled:opacity-50"
                disabled={isPending}
                onClick={() =>
                  updateDeveloperStatus({
                    user_id: data.user_id,
                    status: "Suspended",
                  })
                }
                type="button"
              >
                <Icons.BlockUser />
              </button>
            </Hint>
          )}

          {data?.vetting_status === "Suspended" && (
            <Hint label="Approve" side="top" sideOffset={5}>
              <button
                className="cursor-pointer p-1 hover:text-green-500 disabled:opacity-50"
                disabled={isPending}
                onClick={() =>
                  updateDeveloperStatus({
                    user_id: data.user_id,
                    status: "Approved",
                  })
                }
                type="button"
              >
                <Icons.Done />
              </button>
            </Hint>
          )}
        </div>
      ),
    }),
    []
  );

  return (
    <div>
      <DeveloperStats data={developers?.metrics} isLoading={isLoading} />
      <div className="py-6">
        <CentralizedTable
          customFields={[gitHubStatusColumn, vettingStatusColumn, actionColumn]}
          headings={TABLE_HEADINGS}
          loading={isLoading}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          td={developers?.developers || []}
          totalItems={developers?.pagination?.total_count || 0}
        />
      </div>
    </div>
  );
};

export default DeveloperTable;
