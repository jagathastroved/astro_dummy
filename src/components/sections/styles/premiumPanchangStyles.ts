/**
 * premiumPanchangStyles.ts
 *
 * This file contains all the extracted massive Tailwind CSS strings for the PremiumPanchang component.
 * By keeping the JSX tree free of these long strings, the layout logic remains extremely simple
 * for a human to read and modify.
 */

// ==========================================
// 1. SECTION & BACKGROUND STYLES
// ==========================================
export const SECTION_STYLES = "relative py-4 md:py-6 overflow-hidden";
export const BACKGROUND_GLOW_STYLES = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[600px] bg-indigo/5 dark:bg-gold/5 blur-[120px] rounded-full pointer-events-none";
export const CONTENT_WRAPPER_STYLES = "max-w-7xl mx-auto px-4 sm:px-6 relative z-10";

// ==========================================
// 2. HEADER STYLES
// ==========================================
export const HEADER_CONTAINER_STYLES = "text-center max-w-3xl mx-auto mb-10";
export const HEADER_SUBTITLE_STYLES = "text-amber-600 dark:text-amber-400 font-sans text-xs md:text-sm uppercase tracking-widest font-bold mb-3";
export const HEADER_TITLE_STYLES = "font-serif text-3xl sm:text-4xl md:text-5xl text-midnight dark:text-cream leading-tight font-bold mb-4";
export const HEADER_TITLE_HIGHLIGHT_STYLES = "text-amber-600 dark:text-amber-400 italic";
export const HEADER_DESC_STYLES = "font-sans text-gray-500 dark:text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto font-medium";

// ==========================================
// 3. MAIN PANEL & TOP BAR STYLES
// ==========================================
export const MAIN_PANEL_STYLES = "bg-white dark:bg-[#0c0f24] rounded-[2rem] p-6 lg:p-10 relative overflow-hidden shadow-2xl border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:border-[#facc15]/50 hover:shadow-[0_0_40px_rgba(250,204,21,0.2)] transition-all duration-500";
export const TOP_BAR_STYLES = "flex flex-col xl:flex-row justify-between items-center gap-6 border-b border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] pb-8 mb-8";
export const DATE_LOCATION_BUTTON_STYLES = "flex items-center gap-1 cursor-pointer hover:underline decoration-dotted text-slate-600 dark:text-slate-400";
export const DOT_DIVIDER_STYLES = "text-purple/30 dark:text-gold/30";

// ==========================================
// 4. POPOVER STYLES
// ==========================================
export const POPOVER_BACKDROP_STYLES = "fixed inset-0 bg-black/40 backdrop-blur-sm z-40 sm:hidden cursor-pointer";
export const CALENDAR_POPOVER_STYLES = "fixed sm:absolute top-[20%] sm:top-full left-4 right-4 sm:left-0 sm:right-auto mx-auto sm:mx-0 mt-2 z-50 w-auto sm:w-[280px] max-w-[340px] sm:max-w-none p-4 bg-white dark:bg-[#110c1c] border border-black/10 dark:border-amber-500/40 rounded-2xl shadow-2xl flex flex-col text-slate-800 dark:text-cream select-none transition-all duration-300";
export const LOCATION_POPOVER_STYLES = "fixed sm:absolute top-[20%] sm:top-full left-4 right-4 sm:left-0 sm:right-auto mx-auto sm:mx-0 mt-2 z-50 w-auto sm:w-[280px] max-w-[340px] sm:max-w-none p-5 bg-white dark:bg-[#110c1c] border border-black/10 dark:border-amber-500/40 rounded-2xl shadow-2xl flex flex-col gap-4 text-left transition-all duration-300";

// Location Popover Inputs
export const LOCATION_INPUT_LABEL_STYLES = "text-[9px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase";
export const LOCATION_SELECT_STYLES = "w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-amber-500/30 rounded-xl px-3 py-2.5 text-xs text-slate-700 dark:text-cream focus:outline-none appearance-none cursor-pointer pr-8";
export const LOCATION_INPUT_STYLES = "w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-amber-500/30 rounded-xl px-3 py-2.5 text-xs text-slate-700 dark:text-cream focus:outline-none focus:border-purple/50 pr-8";
export const SUGGESTIONS_CONTAINER_STYLES = "absolute top-full left-0 right-0 mt-1 max-h-40 overflow-y-auto bg-white dark:bg-[#181226] border border-slate-200 dark:border-amber-500/30 rounded-xl shadow-xl z-50 flex flex-col divide-y divide-slate-100 dark:divide-slate-800 custom-scrollbar";
export const APPLY_LOCATION_BTN_STYLES = "w-full bg-[#2b1845] hover:bg-[#3d245f] text-white py-2.5 rounded-xl text-xs font-bold transition-all text-center shadow-md shadow-[#2b1845]/20 mt-1";

// ==========================================
// 5. ASTRONOMY TICKER STYLES
// ==========================================
export const ASTRO_TICKER_CONTAINER_STYLES = "grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-4 sm:gap-6 bg-white/60 dark:bg-[#0c0f24]/50 backdrop-blur-md px-6 py-4 rounded-2xl border border-purple/10 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] w-full xl:w-auto shadow-sm dark:shadow-none";
export const TICKER_ITEM_STYLES = "flex items-center gap-2";
export const TICKER_DIVIDER_STYLES = "w-px h-8 bg-black/10 dark:bg-white/10 hidden sm:block";

// ==========================================
// 6. CONTENT GRID & COLUMNS STYLES
// ==========================================
export const CONTENT_GRID_STYLES = "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12";
export const DATA_BOX_BASE_STYLES = "bg-white/70 dark:bg-black/20 p-5 rounded-2xl border border-purple/10 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] shadow-sm space-y-3 relative overflow-hidden";
export const DATA_BOX_ALT_STYLES = "bg-white/70 dark:bg-black/20 p-5 rounded-2xl border border-indigo/10 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] shadow-sm space-y-3 relative overflow-hidden";

export const DATA_ROW_LABEL_STYLES = "text-[12px] font-bold text-slate-500 dark:text-slate-400";
export const DATA_ROW_VALUE_STYLES = "text-[13px] font-medium text-slate-700 dark:text-slate-300";
export const DATA_DIVIDER_STYLES = "relative z-10 w-full h-px bg-black/5 dark:bg-white/5";

export const ELEMENT_TITLE_STYLES = "text-[14px] font-sans font-bold text-midnight dark:text-cream mb-4 flex items-center gap-2";
export const ELEMENT_LIST_STYLES = "space-y-3 pl-2 border-l-2 border-purple/20 dark:border-gold/20";
export const ELEMENT_ALT_LIST_STYLES = "space-y-3 pl-2 border-l-2 border-indigo/20 dark:border-saffron/20";
export const ACTIVE_ITEM_TITLE_STYLES = "text-[13px] font-semibold text-midnight dark:text-cream flex items-center gap-2";
export const ACTIVE_ALT_ITEM_TITLE_STYLES = "text-[13px] font-semibold text-midnight dark:text-cream flex flex-wrap items-center gap-2";
export const ITEM_DATE_STYLES = "text-[11px] font-mono text-slate-600 dark:text-slate-400 mt-1";

// ==========================================
// 7. CHART STYLES (SOUTH INDIAN ASTROLOGY)
// ==========================================
export const CHART_CONTAINER_STYLES = "bg-white/80 dark:bg-[#080b1a] rounded-2xl p-6 w-full max-w-[280px] flex flex-col items-center justify-center relative overflow-hidden border border-purple/10 dark:border-gold/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] dark:shadow-2xl transition-colors duration-500";
export const CHART_GRID_STYLES = "grid grid-cols-4 grid-rows-4 gap-[2px] bg-purple/20 dark:bg-gold/30 p-[2px] relative z-10 w-full aspect-square rounded-sm mx-auto shadow-[0_0_20px_rgba(104,105,249,0.05)] dark:shadow-[0_0_30px_rgba(251,191,36,0.05)] transition-colors duration-500";
export const CHART_CELL_STYLES = "bg-white dark:bg-[#0c0f24] flex items-center justify-center p-1 relative group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default overflow-hidden";
export const CHART_CELL_TEXT_STYLES = "text-[10px] font-mono text-slate-600 dark:text-cream/60 group-hover:text-purple dark:group-hover:text-gold transition-colors font-bold dark:font-semibold text-center";
export const CENTER_CHART_CELL_STYLES = "col-span-2 row-span-2 bg-ivory/50 dark:bg-[#080b1a] flex flex-col items-center justify-center relative border border-purple/5 dark:border-gold/10";

// ==========================================
// 8. DYNAMIC HELPER FUNCTIONS
// ==========================================

/**
 * Returns exact dynamic Tailwind classes for calendar day buttons.
 * @param {boolean} isSelected - Whether this day is currently selected.
 * @param {boolean} isToday - Whether this day is today.
 * @param {boolean} isCurrentMonth - Whether this day belongs to the currently viewed month.
 * @returns {string} - Computed class string.
 */
export function getCalendarDayStyles(isSelected: boolean, isToday: boolean, isCurrentMonth: boolean) {
  let base = "text-[11px] py-1 rounded-lg transition-all ";
  if (isSelected) {
    base += "bg-[#2b1845] text-white font-bold shadow-md";
  } else if (isToday) {
    base += "border border-[#2b1845]/80 bg-[#ece9f2] dark:bg-[#2b1845]/30 dark:border-amber-500/50 text-[#2b1845] dark:text-amber-400 font-bold";
  } else if (isCurrentMonth) {
    base += "text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5";
  } else {
    base += "text-slate-300 dark:text-slate-600 hover:bg-slate-100/50 dark:hover:bg-white/5";
  }
  return base;
}
