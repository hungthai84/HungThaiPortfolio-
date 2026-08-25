import React, { useState, useMemo, useEffect } from "react";
import { 
  Search, Package, Layers, Link as LinkIcon, Box, Palette, Layout, 
  Smartphone, FileText, Grid, Settings, Settings2, RefreshCw, 
  Dna, ArrowUpDown, Plus, Globe, Puzzle, Code, Scissors, 
  Zap, CheckCircle2, AlertTriangle, XCircle, Play, Eye, 
  RotateCcw, History, Activity, ShieldCheck, BarChart3, ChevronRight,
  Copy, Check, Sparkles, Filter, Terminal, ExternalLink, Sliders, FolderTree
} from "lucide-react";
import { PageLayout } from "../components/PageLayout";
import { WebsiteTreeManager } from "../components/WebsiteTreeManager";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { playUiSound } from "../lib/sound";
import { SITE_PAGE_OBJECTS, PageObjectItem } from "../data/pageObjectsData";

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
  const [activeTab, setActiveTab] = useState<'modules' | 'tree' | 'objects'>('tree');
  const [modules, setModules] = useState<Module[]>(INITIAL_MODULES);
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1); // 1: Analyze, 2: Preview, 3: Confirm
  const [isProcessing, setIsProcessing] = useState(false);

  // Objects Tab States
  const [objectSearch, setObjectSearch] = useState<string>('');
  const [selectedPageFilter, setSelectedPageFilter] = useState<string>('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [copiedSelectorId, setCopiedSelectorId] = useState<string | null>(null);
  const [isScanningDOM, setIsScanningDOM] = useState<boolean>(false);
  const [domElementsCount, setDomElementsCount] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const stats = {
    objects: SITE_PAGE_OBJECTS.length,
    pages: 12,
    sections: 64,
    components: 38,
    variants: 21,
    duplicates: 17,
    warnings: 8,
    errors: 0,
    health: 94
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCopySelector = (selector: string, id: string) => {
    navigator.clipboard.writeText(selector);
    setCopiedSelectorId(id);
    playUiSound('click');
    showToast(`Đã sao chép selector: ${selector}`);
    setTimeout(() => setCopiedSelectorId(null), 2000);
  };

  const handleScanDOM = () => {
    playUiSound('click');
    setIsScanningDOM(true);
    setTimeout(() => {
      if (typeof document !== 'undefined') {
        const total = document.querySelectorAll('*').length;
        setDomElementsCount(total);
      }
      setIsScanningDOM(false);
      showToast('Đã quét và cập nhật đối tượng DOM thời gian thực!');
    }, 800);
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setDomElementsCount(document.querySelectorAll('*').length);
    }
  }, []);

  const handleModuleAction = (module: Module) => {
    playUiSound('click');
    setActiveModule(module);
    setModalStep(1);
    setIsModalOpen(true);
  };

  const runAnalysis = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setModalStep(2);
    setIsProcessing(false);
    setModules(prev => prev.map(m => m.id === activeModule?.id ? { ...m, status: 'CHECKED' } : m));
  };

  const applyChanges = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setModalStep(3);
    setModules(prev => prev.map(m => m.id === activeModule?.id ? { ...m, status: 'COMPLETED' } : m));
  };

  // Distinct pages from objects data
  const pageList = useMemo(() => {
    const pages = Array.from(new Set(SITE_PAGE_OBJECTS.map(o => o.pageId)));
    return [
      { id: 'all', label: 'Tất cả các trang' },
      { id: 'home', label: 'Trang chủ' },
      { id: 'coverLetter', label: 'Thư ngỏ' },
      { id: 'about', label: 'Giới thiệu' },
      { id: 'education', label: 'Học vấn' },
      { id: 'experience', label: 'Kinh nghiệm' },
      { id: 'industries', label: 'Lĩnh vực' },
      { id: 'skills', label: 'Kỹ năng' },
      { id: 'projects', label: 'Dự án' },
      { id: 'interview', label: 'Phỏng vấn' },
      { id: 'tuvi', label: 'Tử vi' },
      { id: 'systems', label: 'Hệ thống' },
      { id: 'memories', label: 'Kỷ niệm' },
      { id: 'aiChat', label: 'Trợ lý AI' },
      { id: 'global', label: 'Hệ thống chung' },
    ];
  }, []);

  // Filtered Page Objects
  const filteredObjects = useMemo(() => {
    return SITE_PAGE_OBJECTS.filter(item => {
      const matchPage = selectedPageFilter === 'all' || item.pageId === selectedPageFilter;
      const matchType = selectedTypeFilter === 'all' || item.type === selectedTypeFilter;
      const query = objectSearch.trim().toLowerCase();
      const matchSearch = !query || 
        item.nameVi.toLowerCase().includes(query) ||
        item.nameEn.toLowerCase().includes(query) ||
        item.selector.toLowerCase().includes(query) ||
        item.descriptionVi.toLowerCase().includes(query) ||
        item.tags.some(t => t.toLowerCase().includes(query));
      return matchPage && matchType && matchSearch;
    });
  }, [selectedPageFilter, selectedTypeFilter, objectSearch]);

  const objectTypeCounts = useMemo(() => {
    return {
      all: SITE_PAGE_OBJECTS.length,
      section: SITE_PAGE_OBJECTS.filter(o => o.type === 'section').length,
      card: SITE_PAGE_OBJECTS.filter(o => o.type === 'card').length,
      interactive: SITE_PAGE_OBJECTS.filter(o => o.type === 'interactive').length,
      component: SITE_PAGE_OBJECTS.filter(o => o.type === 'component').length,
      media: SITE_PAGE_OBJECTS.filter(o => o.type === 'media').length,
      modal: SITE_PAGE_OBJECTS.filter(o => o.type === 'modal').length,
      navigation: SITE_PAGE_OBJECTS.filter(o => o.type === 'navigation').length,
      banner: SITE_PAGE_OBJECTS.filter(o => o.type === 'banner').length,
    };
  }, []);

  return (
    <PageLayout
      id="website-system"
      pageId="websiteManagement"
      title="Website System Management"
      subtitle="Quản trị cấu trúc, đối tượng và hệ thống Component đồng bộ."
      icon={Settings}
    >
      <div className="max-w-[1400px] mx-auto space-y-6 pb-20">
        
        {/* --- Top Navigation Tabs --- */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-2 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
            <button
              onClick={() => {
                setActiveTab('modules');
                playUiSound('pageSwitch');
              }}
              className={cn(
                "flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-black text-xs transition-all tracking-tight whitespace-nowrap",
                activeTab === 'modules'
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                  : "bg-transparent text-[var(--text-secondary)] hover:bg-[var(--surface)]"
              )}
            >
              <Settings2 size={16} />
              <span>Phân Hệ Quản Trị ({modules.length} Modules)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('tree');
                playUiSound('pageSwitch');
              }}
              className={cn(
                "flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-black text-xs transition-all tracking-tight whitespace-nowrap",
                activeTab === 'tree'
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                  : "bg-transparent text-[var(--text-secondary)] hover:bg-[var(--surface)]"
              )}
            >
              <FolderTree size={16} />
              <div className="flex items-center gap-1.5">
                <span>Cấu Trúc Cây & Sắp Xếp Menu</span>
                <span className={cn(
                  "px-1.5 py-0.5 rounded-md text-[10px] font-mono",
                  activeTab === 'tree' ? "bg-white/20 text-white" : "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                )}>
                  Tree D&D
                </span>
              </div>
            </button>

            <button
              onClick={() => {
                setActiveTab('objects');
                playUiSound('pageSwitch');
              }}
              className={cn(
                "flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-black text-xs transition-all tracking-tight whitespace-nowrap",
                activeTab === 'objects'
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                  : "bg-transparent text-[var(--text-secondary)] hover:bg-[var(--surface)]"
              )}
            >
              <Box size={16} />
              <div className="flex items-center gap-1.5">
                <span>Đối Tượng Trong Trang</span>
                <span className={cn(
                  "px-1.5 py-0.5 rounded-md text-[10px] font-mono",
                  activeTab === 'objects' ? "bg-white/20 text-white" : "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                )}>
                  {SITE_PAGE_OBJECTS.length}
                </span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs font-bold text-[var(--text-secondary)] self-end sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Hệ Thống Sẵn Sàng (Live Engine)</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: MODULES SYSTEM (23 PHÂN HỆ QUẢN TRỊ HIỆN CÓ) */}
        {/* ========================================================================= */}
        {activeTab === 'modules' && (
          <div className="space-y-8">
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

            {/* --- History Section --- */}
            <section className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500">
                    <History size={20} />
                  </div>
                  <h2 className="text-lg font-black text-[var(--text-primary)]">Lịch Sử Cập Nhật & Thay Đổi</h2>
                </div>
                <span className="text-xs font-bold text-indigo-500">System Logs</span>
              </div>
              
              <div className="space-y-3">
                {[
                  { action: 'Sync Page Objects Inventory', module: 'Object Inventory', date: '2026-08-24 10:15', status: 'Success' },
                  { action: 'Update Design System & Tokens', module: 'Design System', date: '2026-08-24 09:42', status: 'Success' },
                  { action: 'Add New Section & STAR Framework', module: 'Add Section', date: '2026-08-23 16:20', status: 'Success' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                        <CheckCircle2 size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-[var(--text-primary)]">{item.action}</h4>
                        <span className="text-[10px] font-bold text-[var(--muted)]">{item.module} • {item.date}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: CẤU TRÚC CÂY & SẮP XẾP MENU (TREE VIEW & DRAG AND DROP REORDER)    */}
        {/* ========================================================================= */}
        {activeTab === 'tree' && (
          <WebsiteTreeManager />
        )}

        {/* ========================================================================= */}
        {/* TAB 3: ĐỐI TƯỢNG TRONG TRANG (PAGE OBJECTS & ELEMENTS INVENTORY) */}
        {/* ========================================================================= */}
        {activeTab === 'objects' && (
          <div className="space-y-6">
            
            {/* Header Toolbar & Controls */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 space-y-5 shadow-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      <Layers size={22} />
                    </div>
                    <h2 className="text-xl font-black text-[var(--text-primary)]">
                      Kho Đối Tượng Toàn Bộ Website ({filteredObjects.length}/{SITE_PAGE_OBJECTS.length})
                    </h2>
                  </div>
                  <p className="text-xs text-[var(--muted)] font-medium">
                    Tra cứu và quản lý các Sections, Cards, Modals, Banners, Media và Components phân bổ trên 12 trang.
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={handleScanDOM}
                    disabled={isScanningDOM}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-black shadow-md shadow-indigo-500/25 hover:bg-indigo-700 transition-all disabled:opacity-50 active:scale-95"
                  >
                    <RefreshCw size={14} className={isScanningDOM ? "animate-spin" : ""} />
                    <span>{isScanningDOM ? 'Đang quét DOM...' : 'Quét Live DOM'}</span>
                  </button>

                  <div className="px-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center gap-2">
                    <Terminal size={14} className="text-emerald-500" />
                    <span className="text-xs font-mono font-bold text-[var(--text-primary)]">
                      {domElementsCount} Live DOM Elements
                    </span>
                  </div>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                {/* Search */}
                <div className="relative flex items-center md:col-span-1">
                  <Search size={16} className="absolute left-3.5 text-[var(--muted)]" />
                  <input
                    type="text"
                    placeholder="Tìm tên đối tượng, thẻ ID, selector..."
                    value={objectSearch}
                    onChange={e => setObjectSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs font-semibold text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
                  />
                  {objectSearch && (
                    <button
                      onClick={() => setObjectSearch('')}
                      className="absolute right-3 text-xs text-[var(--muted)] hover:text-[var(--text-primary)]"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Filter Page Dropdown */}
                <div className="relative flex items-center md:col-span-1">
                  <select
                    value={selectedPageFilter}
                    onChange={e => setSelectedPageFilter(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs font-bold text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
                  >
                    {pageList.map(p => (
                      <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                  </select>
                </div>

                {/* Filter Type Dropdown */}
                <div className="relative flex items-center md:col-span-1">
                  <select
                    value={selectedTypeFilter}
                    onChange={e => setSelectedTypeFilter(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs font-bold text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
                  >
                    <option value="all">Tất cả loại đối tượng ({objectTypeCounts.all})</option>
                    <option value="card">Thẻ nội dung - Card ({objectTypeCounts.card})</option>
                    <option value="section">Khối nội dung - Section ({objectTypeCounts.section})</option>
                    <option value="interactive">Tương tác / Biểu đồ ({objectTypeCounts.interactive})</option>
                    <option value="component">Linh kiện - Component ({objectTypeCounts.component})</option>
                    <option value="media">Đa phương tiện - Media ({objectTypeCounts.media})</option>
                    <option value="modal">Cửa sổ - Modal ({objectTypeCounts.modal})</option>
                    <option value="navigation">Điều hướng - Navigation ({objectTypeCounts.navigation})</option>
                    <option value="banner">Banner / Hero ({objectTypeCounts.banner})</option>
                  </select>
                </div>
              </div>

              {/* Type Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-t border-[var(--border)] pt-4">
                {[
                  { key: 'all', label: `Tất cả (${objectTypeCounts.all})` },
                  { key: 'card', label: `Cards (${objectTypeCounts.card})` },
                  { key: 'section', label: `Sections (${objectTypeCounts.section})` },
                  { key: 'interactive', label: `Interactive (${objectTypeCounts.interactive})` },
                  { key: 'component', label: `Components (${objectTypeCounts.component})` },
                  { key: 'media', label: `Media (${objectTypeCounts.media})` },
                  { key: 'modal', label: `Modals (${objectTypeCounts.modal})` },
                  { key: 'navigation', label: `Navigation (${objectTypeCounts.navigation})` },
                ].map(pill => (
                  <button
                    key={pill.key}
                    onClick={() => setSelectedTypeFilter(pill.key)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all",
                      selectedTypeFilter === pill.key
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--card)]"
                    )}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Objects Cards Grid */}
            {filteredObjects.length === 0 ? (
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-12 text-center">
                <Box size={40} className="mx-auto text-[var(--muted)] mb-3 opacity-50" />
                <h3 className="text-base font-black text-[var(--text-primary)] mb-1">Không tìm thấy đối tượng</h3>
                <p className="text-xs text-[var(--muted)]">Thử thay đổi từ khóa tìm kiếm hoặc chọn lại trang / bộ lọc loại đối tượng.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredObjects.map((obj) => {
                  const isCopied = copiedSelectorId === obj.id;
                  return (
                    <div
                      key={obj.id}
                      className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-indigo-500/40 transition-all group"
                    >
                      <div>
                        {/* Top Meta Tags */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                            {obj.pageNameVi}
                          </span>
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)]">
                            {obj.typeLabelVi}
                          </span>
                        </div>

                        {/* Title & Subtitle */}
                        <h3 className="text-sm font-black text-[var(--text-primary)] mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {obj.nameVi}
                        </h3>
                        <p className="text-[11px] font-bold text-[var(--muted)] mb-3">
                          {obj.nameEn}
                        </p>

                        {/* Description */}
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                          {obj.descriptionVi}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {obj.tags.map((tag, idx) => (
                            <span key={idx} className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[var(--muted)]">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Footer: Selector Code & Actions */}
                      <div className="pt-3 border-t border-[var(--border)] space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--muted)] truncate">
                            <span className="font-bold text-[var(--text-primary)]">ID:</span>
                            <span className="truncate">{obj.selector}</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleCopySelector(obj.selector, obj.id)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--surface)] hover:bg-[var(--border)] text-[var(--text-primary)] text-[10px] font-black transition-colors shrink-0"
                            title="Sao chép Selector ID"
                          >
                            {isCopied ? (
                              <>
                                <Check size={12} className="text-emerald-500" />
                                <span className="text-emerald-500">Đã chép</span>
                              </>
                            ) : (
                              <>
                                <Copy size={12} />
                                <span>Copy ID</span>
                              </>
                            )}
                          </button>
                        </div>

                        {obj.dimensions && (
                          <div className="flex items-center justify-between text-[10px] text-[var(--muted)] font-medium pt-1">
                            <span>Quy cách / Khung:</span>
                            <span className="font-mono font-bold text-[var(--text-secondary)]">{obj.dimensions}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

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

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-xl bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold shadow-2xl z-[99999] border border-slate-700">
          {toastMessage}
        </div>
      )}
    </PageLayout>
  );
}

export default WebsiteManagement;
