"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { mainNav } from "@/config/nav";
import { Search, Command, X, Sparkles, ArrowRight, Code2, BookOpen, FolderGit2, User, Briefcase, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ── CommandPalette ──
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Navigation items with icons ──
  const navItems = mainNav.map((item) => {
    const icons: Record<string, any> = {
      "About": User,
      "Skills": Code2,
      "Projects": FolderGit2,
      "Services": Briefcase,
      "Blog": BookOpen,
      "Contact": FileText,
    };
    return {
      ...item,
      icon: icons[item.label] || Sparkles,
    };
  });

  // ── Search results ──
  const filteredItems = query.trim() === ""
    ? navItems
    : navItems.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        if (!open) setQuery("");
      }
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filteredItems.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && filteredItems[selectedIndex]) {
        router.push(filteredItems[selectedIndex].href);
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, filteredItems, selectedIndex, router]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    setSelectedIndex(0);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* ── Modal ── */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed left-1/2 top-[15vh] z-[80] w-full max-w-lg -translate-x-1/2"
          >
            <div
              className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/98 to-bg-surface-1/90 backdrop-blur-xl shadow-2xl shadow-accent-indigo/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Diagonal texture ── */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.03] overflow-hidden"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(99,102,241,0.05) 0px, rgba(99,102,241,0.05) 1px, transparent 1px, transparent 12px)",
                  maskImage: "radial-gradient(80% 60% at 50% 50%, black 0%, transparent 100%)",
                  WebkitMaskImage: "radial-gradient(80% 60% at 50% 50%, black 0%, transparent 100%)",
                }}
              />

              {/* ── Header ── */}
              <div className="relative flex items-center gap-3 border-b border-accent-indigo/8 px-4 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent-indigo/12 bg-accent-indigo/6">
                  <Command className="h-4 w-4 text-accent-indigo" strokeWidth={1.75} />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted/30">
                  Command Palette
                </span>
                <span className="ml-auto text-[8px] font-mono text-text-muted/20 flex items-center gap-1">
                  <span className="px-1 py-0.5 rounded border border-accent-indigo/10">⌘K</span>
                  <span className="text-accent-indigo/10">or</span>
                  <span className="px-1 py-0.5 rounded border border-accent-indigo/10">Ctrl+K</span>
                </span>
              </div>

              {/* ── Search Input ── */}
              <div className="relative px-4 py-3">
                <Search className="absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-accent-indigo/30" strokeWidth={1.75} />
                <input
                  ref={inputRef}
                  autoFocus
                  placeholder="Search pages, projects, posts..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent pl-8 pr-4 py-2 text-sm text-text-primary placeholder:text-text-muted/30 outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-text-muted/30 hover:text-text-muted transition-colors"
                  >
                    <X className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                )}
              </div>

              {/* ── Results ── */}
              <div className="relative border-t border-accent-indigo/8 px-2 py-2 max-h-[300px] overflow-y-auto">
                {filteredItems.length === 0 ? (
                  <div className="flex flex-col items-center py-8 text-center">
                    <Search className="h-8 w-8 text-accent-indigo/20 mb-2" strokeWidth={1.5} />
                    <p className="text-sm text-text-muted/40">No results found</p>
                    <p className="text-[10px] text-text-muted/20">Try adjusting your search</p>
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    {filteredItems.map((item, index) => {
                      const Icon = item.icon;
                      const isSelected = index === selectedIndex;
                      return (
                        <button
                          key={item.href}
                          onClick={() => {
                            router.push(item.href);
                            setOpen(false);
                          }}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-200 ${
                            isSelected
                              ? "bg-accent-indigo/10 border border-accent-indigo/20"
                              : "hover:bg-accent-indigo/[0.03]"
                          }`}
                        >
                          <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
                            isSelected
                              ? "border-accent-indigo/20 bg-accent-indigo/8 text-accent-indigo"
                              : "border-accent-indigo/10 bg-accent-indigo/4 text-text-muted/40"
                          } transition-all duration-200`}>
                            <Icon className="h-4 w-4" strokeWidth={1.75} />
                          </div>
                          <span className={`text-sm font-medium transition-colors duration-200 ${
                            isSelected ? "text-accent-indigo" : "text-text-secondary"
                          }`}>
                            {item.label}
                          </span>
                          <span className="ml-auto text-[9px] font-mono text-text-muted/20">
                            {isSelected ? "↵" : ""}
                          </span>
                          {isSelected && (
                            <span className="flex h-1.5 w-1.5 rounded-full bg-accent-indigo" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* ── Footer ── */}
              <div className="relative flex items-center justify-between border-t border-accent-indigo/8 px-4 py-2">
                <div className="flex items-center gap-3 text-[8px] font-mono text-text-muted/20">
                  <span className="flex items-center gap-1">
                    <span className="px-1 py-0.5 rounded border border-accent-indigo/8">↑↓</span>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="px-1 py-0.5 rounded border border-accent-indigo/8">↵</span>
                    Select
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="px-1 py-0.5 rounded border border-accent-indigo/8">Esc</span>
                    Close
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-2.5 w-2.5 text-accent-indigo/20" strokeWidth={1.5} />
                  <span className="text-[7px] font-mono uppercase tracking-wider text-text-muted/15">
                    v1.0
                  </span>
                </div>
              </div>

              {/* ── Decorative bracket ── */}
              <div
                aria-hidden
                className="absolute top-3 right-3 h-4 w-4 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/15 rounded-tr-sm transition-colors duration-300 pointer-events-none"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}