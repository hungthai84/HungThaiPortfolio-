import { Component, ErrorInfo, ReactNode } from "react";
import { ShieldAlert } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in Projects module:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto my-6 max-w-2xl space-y-4 rounded-[10px] border border-rose-200 bg-rose-50 p-8 text-center dark:border-rose-900/50 dark:bg-rose-950/20">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/50">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-black text-slate-900 sm:text-lg dark:text-white">
              Đã xảy ra lỗi hệ thống
            </h3>
            <p className="text-xs text-slate-500 sm:text-sm dark:text-slate-400">
              Mã nguồn hiển thị của dự án gặp sự cố bất ngờ. Vui lòng làm mới
              trang hoặc thử lại.
            </p>
          </div>
          {this.state.error && (
            <pre className="max-h-[150px] overflow-x-auto rounded-xl bg-slate-100 p-3 text-left font-mono text-[10px] text-rose-600 dark:bg-slate-900 dark:text-rose-400">
              {this.state.error.message}
            </pre>
          )}
          <button
            onClick={() => window.location.reload()}
            className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-extrabold tracking-wider text-white uppercase transition-all hover:bg-rose-500"
          >
            Tải lại trang
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
