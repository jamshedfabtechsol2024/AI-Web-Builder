import { useMemo } from "react";
import { Icons } from "@/components/shared/icons";
import CentralizedTable from "@/components/tables/centeral-table";
import { Hint } from "@/components/ui/hint";
import { usePagination } from "@/hooks/use-pagination";
import {
  useGetAllUsers,
  useUpdateUserStatus,
} from "@/hooks/use-user-management";
import UserStats from "./user-stats";

const TABLE_HEADINGS = {
  user_id: "User ID",
  full_name: "Name",
  email: "Email",
  phone: "Phone Number",
  subscription_plan: "Subscription Plan",
  joined_on: "Joined on",
  is_active: "Status",
  action: "Action",
};

const UserTable = () => {
  const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange } =
    usePagination();

  const { data: users, isLoading } = useGetAllUsers({
    page,
    page_size: rowsPerPage,
  });

  const { mutate: updateUserStatus, isPending } = useUpdateUserStatus();

  const statusColumn = useMemo(
    () => ({
      name: "is_active",
      data: (value) => (
        <div className="flex items-center justify-center">
          {value ? (
            <span className="rounded-full bg-[#22C55E1A] px-3 py-1 font-medium text-[#22C55E] text-sm">
              Active
            </span>
          ) : (
            <span className="rounded-full bg-[#F43F5E1A] px-3 py-1 font-medium text-[#FF0606] text-sm">
              Suspended
            </span>
          )}
        </div>
      ),
    }),
    []
  );

  const actionColumn = useMemo(
    () => ({
      name: "action",
      data: (_, row) => (
        <div className="flex items-center gap-3">
          <Hint label="View" side="top" sideOffset={5}>
            {/* <button
              className="cursor-pointer p-1 hover:text-blue-500"
              disabled={isPending}
              onClick={() => console.log("View user:", row.id)}
              type="button"
            >
              <Icons.Eye />
            </button> */}
          </Hint>

          {row?.is_active ? (
            <Hint label="Suspend" side="top" sideOffset={5}>
              <button
                className="cursor-pointer p-1 hover:text-red-500 disabled:opacity-50"
                disabled={isPending}
                onClick={() => updateUserStatus({ id: row.id, action: false })}
                type="button"
              >
                <Icons.BlockUser />
              </button>
            </Hint>
          ) : (
            <Hint label="Active" side="top" sideOffset={5}>
              <button
                className="cursor-pointer p-1 hover:text-green-500 disabled:opacity-50"
                disabled={isPending}
                onClick={() => updateUserStatus({ id: row.id, action: true })}
                type="button"
              >
                <Icons.Done />
              </button>
            </Hint>
          )}
        </div>
      ),
    }),
    [isPending, updateUserStatus]
  );

  return (
    <div>
      <UserStats data={users?.metrics} isLoading={isLoading} />
      <div className="py-6">
        <CentralizedTable
          customFields={[statusColumn, actionColumn]}
          headings={TABLE_HEADINGS}
          loading={isLoading}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          td={users?.users || []}
          totalItems={users?.pagination?.total_count || 0}
        />
      </div>
    </div>
  );
};

export default UserTable;
