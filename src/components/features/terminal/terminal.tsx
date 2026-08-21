"use client";

import { useEffect, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

type TerminalData = {
  name: string;
  title: string;
  links: Record<string, string>;
  skills: { name: string; category: string }[];
  experience: { role: string; company: string; isCurrent: boolean }[];
  education: { degree: string; institution: string }[];
  projects: { title: string; slug: string; summary: string }[];
  posts: { title: string; slug: string }[];
  unavailable?: boolean;
};

const COMMANDS = [
  "help", "about", "skills", "projects", "experience", "education",
  "resume", "contact", "socials", "github", "blog", "whoami", "clear",
];

type HistoryEntry = { command: string; output: string[] };

function buildOutput(command: string, data: TerminalData | null): string[] {
  if (!data) return ["Loading portfolio data — try again in a moment."];

  switch (command) {
    case "help":
      return [
        "Available commands:",
        ...COMMANDS.map((c) => `  ${c}`),
      ];
    case "about":
      return [`${data.name} — ${data.title}.`, `Type 'skills', 'projects', or 'experience' to learn more.`];
    case "whoami":
      return [data.name];
    case "skills":
      return data.skills.length
        ? data.skills.map((s) => `  [${s.category}] ${s.name}`)
        : ["No skills published yet — check back soon."];
    case "projects":
      return data.projects.length
        ? data.projects.map((p) => `  ${p.title} — ${p.summary} (/projects/${p.slug})`)
        : ["No projects published yet — check back soon."];
    case "experience":
      return data.experience.length
        ? data.experience.map((e) => `  ${e.role} @ ${e.company}${e.isCurrent ? " (current)" : ""}`)
        : ["No experience entries published yet."];
    case "education":
      return data.education.length
        ? data.education.map((e) => `  ${e.degree} — ${e.institution}`)
        : ["No education entries published yet."];
    case "blog":
      return data.posts.length
        ? data.posts.map((p) => `  ${p.title} (/blog/${p.slug})`)
        : ["No articles published yet."];
    case "resume":
      return ["Opening /resume ...", "(navigate there directly if this doesn't redirect)"];
    case "contact":
      return [`Email: ${data.links.email}`, `WhatsApp: ${data.links.whatsapp}`];
    case "socials":
    case "github":
      return [`GitHub: ${data.links.github}`, `LinkedIn: ${data.links.linkedin}`, `Fiverr: ${data.links.fiverr}`];
    default:
      return [`Command not found: ${command}`, `Type 'help' to see available commands.`];
  }
}

export function Terminal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [data, setData] = useState<TerminalData | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    fetch("/api/terminal-data")
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData(null));
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  function runCommand(raw: string) {
    const command = raw.trim().toLowerCase();
    if (!command) return;

    if (command === "clear") {
      setHistory([]);
    } else {
      setHistory((h) => [...h, { command, output: buildOutput(command, data) }]);
      if (command === "resume" && typeof window !== "undefined") {
        window.location.href = "/resume";
      }
    }
    setCmdHistory((h) => [...h, command]);
    setHistoryIndex(-1);
    setInput("");
    setSuggestion(null);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      runCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(cmdHistory[nextIndex] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(cmdHistory[nextIndex] ?? "");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestion) setInput(suggestion);
    }
  }

  function handleChange(value: string) {
    setInput(value);
    const match = value.length > 0 ? COMMANDS.find((c) => c.startsWith(value.toLowerCase())) : undefined;
    setSuggestion(match && match !== value ? match : null);
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[85] bg-black/70 backdrop-blur-sm" />
        <DialogPrimitive.Content
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            inputRef.current?.focus();
          }}
          className="fixed left-1/2 top-1/2 z-[90] w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-md border border-[#232A44] bg-[#0B0F1A] font-mono text-sm text-[#F5F6FA] shadow-xl"
        >
          <DialogPrimitive.Title className="sr-only">Interactive terminal</DialogPrimitive.Title>
          <div className="flex items-center justify-between border-b border-[#232A44] px-4 py-2.5">
            <div className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
            </div>
            <span className="text-xs text-[#6B7280]">abdul@portfolio — zsh</span>
            <DialogPrimitive.Close aria-label="Close terminal" className="text-[#6B7280] hover:text-white">
              <X className="h-4 w-4" />
            </DialogPrimitive.Close>
          </div>

          <div
            ref={scrollRef}
            className="h-80 overflow-y-auto px-4 py-3"
            onClick={() => inputRef.current?.focus()}
          >
            <p className="text-[#6B7280]">
              Welcome. Type <span className="text-accent-blue">help</span> to see available commands.
            </p>
            {history.map((entry, i) => (
              <div key={i} className="mt-2">
                <p>
                  <span className="text-accent-blue">$</span> {entry.command}
                </p>
                {entry.output.map((line, j) => (
                  <p key={j} className="whitespace-pre-wrap text-[#9AA1B9]">
                    {line}
                  </p>
                ))}
              </div>
            ))}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-accent-blue">$</span>
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => handleChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  aria-label="Terminal command input"
                  autoComplete="off"
                  spellCheck={false}
                  className="w-full bg-transparent outline-none"
                />
                {suggestion && (
                  <span className="pointer-events-none absolute left-0 top-0 whitespace-pre">
                    <span className="opacity-0">{input}</span>
                    <span className="text-[#4B5563]">{suggestion.slice(input.length)}</span>
                    <span className="ml-1 text-[10px] text-[#4B5563]">(Tab)</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
