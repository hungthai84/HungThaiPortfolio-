import React from "react";
import { RotateCcw, FolderX } from "lucide-react";
import { buttonVariants } from "../../lib/theme";

export interface EmptyStateProps {
  onReset: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = React.memo(
  ({ onReset }) => {
    return (
      <div
        className="magic-card mx-auto my-6 max-w-lg space-y-4 rounded-[15px] border border-slate-200/90 bg-white/90 p-8 text-center shadow-sm backdrop-blur-xl sm:p-12 dark:border-white/10 dark:bg-slate-900/80"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--bg)] text-[var(--muted)]">
          <FolderX className="h-8 w-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-black text-[var(--text-primary)] sm:text-lg">
            Không tìm thấy dự án
          </h3>
          <p className="text-xs text-[var(--muted)] sm:text-sm">
            Hãy thử thay đổi từ khóa tìm kiếm hoặc điều chỉnh lại cấu hình các
            bộ lọc.
          </p>
        </div>
        <button
          onClick={onReset}
          className={
            buttonVariants({ intent: "primary", size: "sm" }) +
            " gap-1.5 !rounded-xl"
          }
        >
          <RotateCcw size={14} />
          <span>Đặt lại bộ lọc</span>
        </button>
      </div>
    );
  },
);

EmptyState.displayName = "EmptyState";
