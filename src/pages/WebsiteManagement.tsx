import React, { useState, useEffect } from "react";
import { 
  Search, Package, Layers, Link as LinkIcon, Box, Palette, Layout, 
  Smartphone, FileText, Grid, Settings, Settings2, RefreshCw, 
  Dna, ArrowUpDown, Plus, Globe, Puzzle, Code, Scissors, 
  Zap, CheckCircle2, AlertTriangle, XCircle, Play, Eye, 
  RotateCcw, History, Activity, ShieldCheck, BarChart3, ChevronRight,
  Monitor, Tablet, Smartphone as Mobile
} from "lucide-react";
import { PageLayout } from "../components/PageLayout";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { playUiSound } from "../lib/sound";

// --- Types ---

type ModuleStatus = 'NOT_CHECKED' | 'CHECKED' | 'CONFIRMED' | 'COMPLETED' | 'REVIEW_REQUIRED' | 'ERROR';

interface Module {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  status: ModuleStatus;
  summary?: string;
  description: string;
}

// --- Mock Data / Initial State ---

const INITIAL_MODULES: Module[] = [
  { id: 'scan', name: 'Scan Website', icon: Search, status: 'NOT_CHECKED', description: 'Quét toàn bộ Website để nhận diện Pages, Routes, Sections, Components...' },
  { id: 'inventory', name: 'Object Inventory', icon: Package, status: 'NOT_CHECKED', description: 'Hiển thị toàn bộ Object tìm được với vị trí và tần suất.' },
  { id: 'classify', name: 'Classify Objects', icon: Layers, status: 'NOT_CHECKED', description: 'Phân loại đối tượng thành Page, Section, Component, Media...' },
  { id: 'similar', name: 'Find Similar Objects', icon: LinkIcon, status: 'NOT_CHECKED', description: 'Phát hiện các đối tượng trùng lặp hoặc có phong cách tương đồng.' },
  { id: 'component_sys', name: 'Component System', icon: Box, status: 'NOT_CHECKED', description: 'Quản lý và chuẩn hóa các Component dùng chung.' },
  { id: 'variant_mgr', name: 'Variant Manager', icon: Dna, status: 'NOT_CHECKED', description: 'Quản lý các biến thể của Component (Default, Glass, Featured).' },
  { id: 'design_sys', name: 'Design System', icon: Palette, status: 'NOT_CHECKED', description: 'Chuẩn hóa Colors, Typography, Spacing, Radius...' },
  { id: 'layout_sys', name: 'Layout System', icon: Layout, status: 'NOT_CHECKED', description: 'Kiểm tra Container, Grid, Columns và sự đồng nhất bố cục.' },
  { id: 'responsive', name: 'Responsive System', icon: Smartphone, status: 'NOT_CHECKED', description: 'Kiểm tra hiển thị trên Desktop, Tablet, Mobile.' },
  { id: 'page_struct', name: 'Page Structure', icon: FileText, status: 'NOT_CHECKED', description: 'Quản lý cấu trúc phân cấp của từng trang.' },
  { id: 'section_struct', name: 'Section Structure', icon: Grid, status: 'NOT_CHECKED', description: 'Quản lý cấu trúc bên trong của từng Section.' },
  { id: 'global_settings', name: 'Global Settings', icon: Settings, status: 'NOT_CHECKED', description: 'Cấu hình chung cho toàn bộ Website.' },
  { id: 'comp_settings', name: 'Component Settings', icon: Settings2, status: 'NOT_CHECKED', description: 'Cấu hình riêng cho từng loại Component.' },
  { id: 'sync_comp', name: 'Sync Components', icon: RefreshCw, status: 'NOT_CHECKED', description: 'Đồng bộ hóa các thay đổi Component trên toàn hệ thống.' },
  { id: 'layout_order', name: 'Layout Order', icon: ArrowUpDown, status: 'NOT_CHECKED', description: 'Sắp xếp thứ tự các Section trên trang.' },
  { id: 'add_section', name: 'Add Section', icon: Plus, status: 'NOT_CHECKED', description: 'Thêm Section mới từ Template hoặc Custom.' },
  { id: 'external_sec', name: 'External Section', icon: Globe, status: 'NOT_CHECKED', description: 'Tích hợp các Section từ nguồn bên ngoài (URL, Embed).' },
  { id: 'custom_comp', name: 'Custom Component', icon: Puzzle, status: 'NOT_CHECKED', description: 'Tạo Component mới với cấu trúc riêng.' },
  { id: 'custom_html', name: 'Custom HTML', icon: Code, status: 'NOT_CHECKED', description: 'Thêm mã HTML tùy chỉnh vào Website.' },
  { id: 'custom_css', name: 'Custom CSS', icon: Scissors, status: 'NOT_CHECKED', description: 'Thêm mã CSS tùy chỉnh để ghi đè giao diện.' },
  { id: 'custom_js', name: 'Custom JS', icon: Zap, status: 'NOT_CHECKED', description: 'Thêm mã JavaScript tùy chỉnh cho các tương tác.' },
  { id: 'validate', name: 'Validate Website', icon: ShieldCheck, status: 'NOT_CHECKED', description: 'Kiểm tra lỗi và tính toàn vẹn của hệ thống.' },
  { id: 'report', name: 'System Report', icon: BarChart3, status: 'NOT_CHECKED', description: 'Báo cáo tổng quan về sức khỏe và hiệu suất hệ thống.' },
];

// --- Components ---

const StatusIcon = ({ status }: { status: ModuleStatus }) => {
  switch (status) {
    case 'NOT_CHECKED': return <circle className="w-3 h-3 text-slate-300 fill-none border-2 border-slate-300 rounded-full" />;
    case 'CHECKED': return <div className="w-3 h-3 bg-blue-500 rounded-full ring-2 ring-blue-500/20" />;
    case 'CONFIRMED': return <CheckCircle2 size={14} className="text-emerald-500" />;
    case 'COMPLETED': return <CheckCircle2 size={14} className="text-emerald-600 fill-emerald-600/10" />;
    case 'REVIEW_REQUIRED': return <AlertTriangle size={14} className="text-amber-500" />;
    case 'ERROR': return <XCircle size={14} className="text-rose-500" />;
    default: return null;
  }
};

const StatusLabel = ({ status, language }: { status: ModuleStatus, language: string }) => {
  const isVi = language === 'vi';
  switch (status) {
    case 'NOT_CHECKED': return <span>{isVi ? 'Chưa kiểm tra' : 'Not Checked'}</span>;
    case 'CHECKED': return <span>{isVi ? 'Đã kiểm tra' : 'Checked'}</span>;
    case 'CONFIRMED': return <span>{isVi ? 'Đã xác nhận' : 'Confirmed'}</span>;
    case 'COMPLETED': return <span>{isVi ? 'Đã thực hiện' : 'Completed'}</span>;
    case 'REVIEW_REQUIRED': return <span>{isVi ? 'Cần xem xét' : 'Review Required'}</span>;
    case 'ERROR': return <span>{isVi ? 'Có lỗi' : 'Error'}</span>;
    default: return null;
  }
};

export function WebsiteManagement() {
  const [modules, setModules] = useState<Module[]>(INITIAL_MODULES);
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1); // 1: Analyze, 2: Preview, 3: Confirm
  const [isProcessing, setIsProcessing] = useState(false);

  const stats = {
    objects: 248,
    pages: 12,
    sections: 64,
    components: 38,
    variants: 21,
    duplicates: 17,
    warnings: 8,
    errors: 0,
    health: 94
  };

  const handleModuleAction = (module: Module) => {
    playUiSound('click');
    setActiveModule(module);
    setModalStep(1);
    setIsModalOpen(true);
  };

  const runAnalysis = async () => {
    setIsProcessing(true);
    // Simulate analysis time
    await new Promise(resolve => setTimeout(resolve, 1500));
    setModalStep(2);
    setIsProcessing(false);
    
    // Update local status to CHECKED
    setModules(prev => prev.map(m => m.id === activeModule?.id ? { ...m, status: 'CHECKED' } : m));
  };

  const applyChanges = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setModalStep(3); // Result/Confirmation step
    
    // Update local status to COMPLETED
    setModules(prev => prev.map(m => m.id === activeModule?.id ? { ...m, status: 'COMPLETED' } : m));
  };

  return (
    <PageLayout
      id="website-system"
      pageId="websiteManagement"
      title="Website System Management"
      subtitle="Quản trị cấu trúc, đối tượng và hệ thống Component đồng bộ."
      icon={Settings}
    >
      <div className="max-w-[1400px] mx-auto space-y-8 pb-20">
        
        {/* --- Dashboard Summary --- */}
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {[
            { label: 'Objects', value: stats.objects, icon: Box, color: 'text-blue-500' },
            { label: 'Pages', value: stats.pages, icon: FileText, color: 'text-indigo-500' },
            { label: 'Sections', value: stats.sections, icon: Grid, color: 'text-purple-500' },
            { label: 'Components', value: stats.components, icon: Package, color: 'text-pink-500' },
            { label: 'Variants', value: stats.variants, icon: Dna, color: 'text-amber-500' },
            { label: 'Duplicates', value: stats.duplicates, icon: RotateCcw, color: 'text-rose-500' },
            { label: 'Warnings', value: stats.warnings, icon: AlertTriangle, color: 'text-orange-500' },
            { label: 'Health', value: `${stats.health}%`, icon: Activity, color: 'text-emerald-500' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all">
              <stat.icon size={20} className={cn("mb-2", stat.color)} />
              <span className="text-xl font-black text-[var(--text-primary)]">{stat.value}</span>
              <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </section>

        {/* --- Main Modules Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {modules.map((module) => (
            <div 
              key={module.id} 
              className={cn(
                "group relative bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 transition-all hover:border-[var(--app-primary-hex)] flex flex-col justify-between",
                module.status === 'COMPLETED' ? "ring-2 ring-emerald-500/20 border-emerald-500/30" : ""
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-[var(--surface)] text-[var(--app-primary-hex)] group-hover:bg-[var(--app-primary-hex)] group-hover:text-white transition-all">
                  <module.icon size={24} />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)]">
                    <StatusIcon status={module.status} />
                    <span className="text-[10px] font-black uppercase text-[var(--text-secondary)]">
                      <StatusLabel status={module.status} language="vi" />
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-black text-[var(--text-primary)] mb-1.5">{module.name}</h3>
                <p className="text-xs font-medium text-[var(--muted)] line-clamp-2 leading-relaxed">
                  {module.description}
                </p>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => handleModuleAction(module)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs font-black text-[var(--text-primary)] hover:bg-[var(--app-primary-hex)] hover:text-white hover:border-transparent transition-all active:scale-95"
                >
                  <Play size={14} />
                  KIỂM TRA & THỰC HIỆN
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- History Section (Brief) --- */}
        <section className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500">
                <History size={20} />
              </div>
              <h2 className="text-lg font-black text-[var(--text-primary)]">Change History</h2>
            </div>
            <button className="text-xs font-bold text-blue-500 hover:underline">View Full Log</button>
          </div>
          
          <div className="space-y-4">
            {[
              { action: 'Sync Components', module: 'Sync Components', date: '2026-08-24 10:15', status: 'Success' },
              { action: 'Update Design System', module: 'Design System', date: '2026-08-24 09:42', status: 'Success' },
              { action: 'Add New Section', module: 'Add Section', date: '2026-08-23 16:20', status: 'Success' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-[var(--text-primary)]">{item.action}</h4>
                    <span className="text-[10px] font-bold text-[var(--muted)]">{item.module} • {item.date}</span>
                  </div>
                </div>
                <button className="p-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-all text-[var(--muted)]">
                  <RotateCcw size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* --- Action Modal --- */}
      <AnimatePresence>
        {isModalOpen && activeModule && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isProcessing && setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-[var(--card)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-[var(--border)] flex items-center justify-between bg-[var(--surface)]/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-[var(--app-primary-hex)] text-white shadow-lg shadow-indigo-500/20">
                    <activeModule.icon size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-[var(--text-primary)]">{activeModule.name}</h2>
                    <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider">Module Workflow</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-[var(--surface)] text-[var(--muted)] transition-all"
                >
                  <XCircle size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8">
                {modalStep === 1 && (
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                      {isProcessing ? (
                        <RefreshCw size={40} className="animate-spin" />
                      ) : (
                        <Search size={40} />
                      )}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-black text-[var(--text-primary)]">
                        {isProcessing ? 'Đang phân tích hệ thống...' : 'Sẵn sàng kiểm tra module'}
                      </h3>
                      <p className="text-sm font-medium text-[var(--muted)] max-w-md mx-auto">
                        Hệ thống sẽ thực hiện quét và phân tích dữ liệu liên quan đến module <span className="text-[var(--text-primary)] font-bold">{activeModule.name}</span>. 
                        Không có thay đổi nào được thực hiện ở bước này.
                      </p>
                    </div>

                    <div className="pt-6 flex flex-col gap-3">
                      <button
                        onClick={runAnalysis}
                        disabled={isProcessing}
                        className="w-full py-4 rounded-2xl bg-[var(--app-primary-hex)] text-white font-black text-sm shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
                      >
                        {isProcessing ? <RefreshCw size={18} className="animate-spin" /> : <Play size={18} />}
                        BẮT ĐẦU PHÂN TÍCH
                      </button>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="w-full py-4 rounded-2xl border border-[var(--border)] text-[var(--text-secondary)] font-black text-sm hover:bg-[var(--surface)] transition-all"
                      >
                        HỦY BỎ
                      </button>
                    </div>
                  </div>
                )}

                {modalStep === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-[10px] font-black uppercase">Analysis Result</span>
                        <h3 className="text-lg font-black text-[var(--text-primary)]">Dự kiến thay đổi</h3>
                      </div>
                    </div>

                    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-800 border border-[var(--border)]">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                            <Box size={16} />
                          </div>
                          <span className="text-xs font-bold text-[var(--text-primary)]">Optimize Card Structure</span>
                        </div>
                        <span className="text-[10px] font-black text-emerald-500 uppercase">+ Proposed</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-800 border border-[var(--border)]">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
                            <RefreshCw size={16} />
                          </div>
                          <span className="text-xs font-bold text-[var(--text-primary)]">Redundant Styles Found</span>
                        </div>
                        <span className="text-[10px] font-black text-rose-500 uppercase">- Remove</span>
                      </div>
                      <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                        <p className="text-[11px] font-medium text-blue-600 dark:text-blue-400 leading-relaxed">
                          Dựa trên phân tích, module phát hiện 8 điểm không đồng nhất trong cấu trúc Object. Đề xuất chuẩn hóa 3 Component chính để tối ưu hiệu suất 15%.
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 grid grid-cols-2 gap-4">
                      <button
                        onClick={applyChanges}
                        disabled={isProcessing}
                        className="py-4 rounded-2xl bg-emerald-500 text-white font-black text-sm shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
                      >
                        {isProcessing ? <RefreshCw size={18} className="animate-spin" /> : <ShieldCheck size={18} />}
                        XÁC NHẬN & THỰC HIỆN
                      </button>
                      <button
                        onClick={() => setModalStep(1)}
                        className="py-4 rounded-2xl border border-[var(--border)] text-[var(--text-secondary)] font-black text-sm hover:bg-[var(--surface)] transition-all"
                      >
                        QUAY LẠI
                      </button>
                    </div>
                  </div>
                )}

                {modalStep === 3 && (
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <CheckCircle2 size={40} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-black text-[var(--text-primary)]">Thực hiện thành công!</h3>
                      <p className="text-sm font-medium text-[var(--muted)]">
                        Module <span className="text-emerald-500 font-bold">{activeModule.name}</span> đã hoàn tất quá trình xử lý và đồng bộ dữ liệu.
                      </p>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="w-full py-4 rounded-2xl bg-[var(--text-primary)] text-[var(--card)] font-black text-sm hover:opacity-90 transition-all"
                      >
                        XONG
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}

export default WebsiteManagement;
