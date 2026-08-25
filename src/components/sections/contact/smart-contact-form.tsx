"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, m } from "framer-motion";
import { 
  CheckCircle2, Briefcase, MessagesSquare, Users, HelpCircle, 
  MoreHorizontal, MessageCircle, Mail, CalendarClock, Paperclip,
  Send, Sparkles, ArrowRight, X, File, Upload, Loader2
} from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { contactFormSchema } from "@/lib/validations";
import { submitContactForm } from "@/app/contact/actions";
import { RelatedProjectsByType } from "@/components/sections/contact/related-projects-by-type";

type FormValues = z.infer<typeof contactFormSchema>;

const PROJECT_TYPES = [
  "Portfolio Website", "Business Website", "AI Application", "SaaS",
  "Workflow Automation", "API Development", "Full Stack Application", "Other",
];
const BUDGET_RANGES = ["Under $500", "$500 – $1,500", "$1,500 – $5,000", "$5,000+", "Not sure yet"];
const TIMELINES = ["ASAP", "Within 1 month", "1–3 months", "3+ months", "Flexible"];

const CONTACT_REASONS = [
  { value: "Hire Me", icon: Briefcase },
  { value: "Project Discussion", icon: MessagesSquare },
  { value: "Collaboration", icon: Users },
  { value: "Technical Question", icon: HelpCircle },
  { value: "Other", icon: MoreHorizontal },
];

const CONTACT_METHODS = [
  { value: "whatsapp", label: "WhatsApp", icon: MessageCircle, disabled: false },
  { value: "email", label: "Email", icon: Mail, disabled: false },
  { value: "call", label: "Schedule Call", icon: CalendarClock, disabled: true },
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
  "image/jpeg", "image/png", "image/webp",
  "application/pdf", "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain"
];

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function SmartContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { contactReason: "", preferredContactMethod: "", projectType: "" },
  });

  const projectType = watch("projectType");
  const contactReason = watch("contactReason");
  const preferredContactMethod = watch("preferredContactMethod");

  // ── File Upload Handler ──
  async function handleFileUpload(file: File) {
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setFileError(`File is too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`);
      return;
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setFileError("File type not supported. Please upload JPEG, PNG, PDF, DOC, or TXT files.");
      return;
    }

    setFileError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/contact/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAttachedFile(file);
        // Store the uploaded file URL or public_id
        setValue("attachment", data.fileUrl);
        toast.success("File uploaded successfully!");
      } else {
        setFileError(data.error || "Failed to upload file. Please try again.");
      }
    } catch {
      setFileError("Network error. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  // ── Remove File ──
  function removeFile() {
    setAttachedFile(null);
    setValue("attachment", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function onSubmit(data: FormValues) {
    setIsPending(true);
    setServerError(null);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.set(key, value ?? ""));

    // Add attachment if exists
    if (attachedFile) {
      formData.set("attachment", attachedFile);
    }

    const result = await submitContactForm({ success: false, message: "" }, formData);
    setIsPending(false);

    if (result.success) {
      setSubmitted(true);
      reset();
      setAttachedFile(null);
    } else {
      setServerError(result.message);
    }
  }

  if (submitted) {
    return (
      <m.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm px-6 py-14 text-center"
        style={{ boxShadow: panelShadow }}
      >
        <div
          aria-hidden
          className="absolute top-4 right-4 h-6 w-6 border-t-2 border-r-2 border-accent-indigo/25 rounded-tr-md pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-accent-indigo/25 rounded-bl-md pointer-events-none"
        />

        <m.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 12 }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 mx-auto"
        >
          <CheckCircle2 className="h-8 w-8 text-emerald-500" strokeWidth={1.75} />
        </m.div>
        <h3 className="mt-5 text-2xl font-bold text-text-primary">Message Sent! 🎉</h3>
        <p className="mt-2 max-w-sm mx-auto text-text-secondary">
          Thanks for reaching out — here's what happens next:
        </p>
        <ol className="mt-5 space-y-1.5 text-sm text-text-secondary max-w-xs mx-auto text-left">
          <li className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-indigo/10 text-[10px] font-mono text-accent-indigo">1</span>
            Your message is reviewed (usually within 24 hours)
          </li>
          <li className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-indigo/10 text-[10px] font-mono text-accent-indigo">2</span>
            Abdul follows up on your preferred channel
          </li>
          <li className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-indigo/10 text-[10px] font-mono text-accent-indigo">3</span>
            You discuss the project together
          </li>
        </ol>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-accent-indigo/15 hover:bg-accent-indigo/[0.05] text-text-secondary hover:text-accent-indigo font-medium text-sm transition-all duration-300"
        >
          Send another message
          <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </m.div>
    );
  }

  return (
    <form id="contact-form" onSubmit={handleSubmit(onSubmit)} className="scroll-mt-24 space-y-6">
      
      {/* ── Contact Reason ── */}
      <div>
        <p className="text-sm font-medium text-text-secondary mb-2">What brings you here?</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {CONTACT_REASONS.map(({ value, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setValue("contactReason", value)}
              aria-pressed={contactReason === value}
              className={`group flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-xs transition-all duration-300 ${
                contactReason === value
                  ? "border-accent-indigo bg-accent-indigo/10 text-accent-indigo shadow-sm shadow-accent-indigo/5"
                  : "border-accent-indigo/10 text-text-secondary hover:border-accent-indigo/25 hover:bg-accent-indigo/[0.03] hover:-translate-y-0.5"
              }`}
            >
              <Icon className={`h-4 w-4 transition-colors duration-300 ${
                contactReason === value ? "text-accent-indigo" : "text-text-muted/40 group-hover:text-accent-indigo/60"
              }`} strokeWidth={1.75} />
              {value}
            </button>
          ))}
        </div>
      </div>

      {/* ── Name, Email, Company, Country ── */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-text-secondary mb-1.5 block">Full Name</label>
          <input
            type="text"
            placeholder="Your name"
            className={`w-full rounded-xl border ${
              errors.name ? "border-rose-500/50" : "border-accent-indigo/10"
            } bg-bg-surface-1/50 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/30 focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300`}
            {...register("name")}
          />
          {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="text-xs font-medium text-text-secondary mb-1.5 block">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            className={`w-full rounded-xl border ${
              errors.email ? "border-rose-500/50" : "border-accent-indigo/10"
            } bg-bg-surface-1/50 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/30 focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300`}
            {...register("email")}
          />
          {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>}
        </div>
        <div>
          <label className="text-xs font-medium text-text-secondary mb-1.5 block">Company (optional)</label>
          <input
            type="text"
            placeholder="Your company"
            className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/30 focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
            {...register("company")}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-text-secondary mb-1.5 block">Country</label>
          <input
            type="text"
            placeholder="Your country"
            className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/30 focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
            {...register("country")}
          />
        </div>
      </div>

      {/* ── Project Type ── */}
      <div>
        <label htmlFor="projectType" className="text-sm font-medium text-text-secondary block mb-2">Project Type</label>
        <select
          id="projectType"
          {...register("projectType")}
          className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm text-text-primary focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300 appearance-none"
        >
          <option value="">Select a project type...</option>
          {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* ── Budget & Timeline (conditional) ── */}
      <AnimatePresence>
        {projectType && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="grid gap-4 overflow-hidden sm:grid-cols-2"
          >
            <div>
              <label htmlFor="budgetRange" className="text-xs font-medium text-text-secondary mb-1.5 block">Budget Range</label>
              <select id="budgetRange" {...register("budgetRange")} className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm text-text-primary focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300 appearance-none">
                <option value="">Select a range...</option>
                {BUDGET_RANGES.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="timeline" className="text-xs font-medium text-text-secondary mb-1.5 block">Timeline</label>
              <select id="timeline" {...register("timeline")} className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm text-text-primary focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300 appearance-none">
                <option value="">Select a timeline...</option>
                {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* ── Related Projects ── */}
      <RelatedProjectsByType projectType={projectType} />

      {/* ── Preferred Contact Method ── */}
      <div>
        <p className="text-sm font-medium text-text-secondary mb-2">Preferred Contact Method</p>
        <div className="flex flex-wrap gap-2">
          {CONTACT_METHODS.map(({ value, label, icon: Icon, disabled }) => (
            <button
              key={value}
              type="button"
              disabled={disabled}
              title={disabled ? "Not available yet" : undefined}
              onClick={() => setValue("preferredContactMethod", value)}
              aria-pressed={preferredContactMethod === value}
              className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-all duration-300 ${
                preferredContactMethod === value
                  ? "border-accent-indigo bg-accent-indigo/10 text-accent-indigo shadow-sm shadow-accent-indigo/5"
                  : "border-accent-indigo/10 text-text-secondary hover:border-accent-indigo/25 hover:bg-accent-indigo/[0.03]"
              } disabled:cursor-not-allowed disabled:opacity-40`}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
              {label}{disabled && " (soon)"}
            </button>
          ))}
        </div>
      </div>

      {/* ── Subject ── */}
      <div>
        <label className="text-xs font-medium text-text-secondary mb-1.5 block">Subject (optional)</label>
        <input
          type="text"
          placeholder="Brief subject line"
          className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/30 focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
          {...register("subject")}
        />
      </div>

      {/* ── Message ── */}
      <div>
        <label className="text-xs font-medium text-text-secondary mb-1.5 block">Your Message</label>
        <textarea
          placeholder="Tell me about your project..."
          rows={6}
          className={`w-full rounded-xl border ${
            errors.message ? "border-rose-500/50" : "border-accent-indigo/10"
          } bg-bg-surface-1/50 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/30 focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300 resize-y`}
          {...register("message")}
        />
        {errors.message && <p className="mt-1 text-xs text-rose-500">{errors.message.message}</p>}
      </div>

      {/* ── File Attachment ── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-text-secondary">File Attachment</p>
          <span className="text-[10px] text-text-muted/40">Max 5MB · PNG, JPG, PDF, DOC</span>
        </div>

        {!attachedFile ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-accent-indigo/10 bg-accent-indigo/[0.02] px-4 py-6 cursor-pointer hover:border-accent-indigo/25 hover:bg-accent-indigo/[0.04] transition-all duration-300"
          >
            <Upload className="h-8 w-8 text-accent-indigo/30" strokeWidth={1.5} />
            <p className="text-sm text-text-secondary">Click to upload or drag and drop</p>
            <p className="text-[10px] text-text-muted/30">PNG, JPG, PDF, DOC (max 5MB)</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.txt"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-between rounded-xl border border-accent-indigo/15 bg-accent-indigo/[0.03] px-4 py-3">
            <div className="flex items-center gap-3">
              <File className="h-5 w-5 text-accent-indigo/40" strokeWidth={1.75} />
              <div>
                <p className="text-sm font-medium text-text-primary truncate max-w-[200px]">
                  {attachedFile.name}
                </p>
                <p className="text-[10px] text-text-muted/40">
                  {(attachedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="text-text-muted/40 hover:text-rose-500 transition-colors duration-300"
            >
              <X className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        )}

        {fileError && (
          <p className="mt-1.5 text-xs text-rose-500">{fileError}</p>
        )}
        {isUploading && (
          <div className="mt-2 flex items-center gap-2 text-sm text-text-muted/60">
            <Loader2 className="h-4 w-4 animate-spin" />
            Uploading...
          </div>
        )}
      </div>

      {/* ── Error Message ── */}
      {serverError && (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 px-4 py-3 text-sm text-rose-500">
          {serverError}
        </div>
      )}

      {/* ── Submit Button ── */}
      <button
        type="submit"
        disabled={isPending || isUploading}
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent-indigo hover:bg-accent-indigo/90 text-white font-medium text-sm shadow-lg shadow-accent-indigo/20 hover:shadow-xl hover:shadow-accent-indigo/30 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto"
      >
        {isPending ? (
          <>
            <span className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" strokeWidth={1.75} />
            Send Message
            <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
          </>
        )}
      </button>
    </form>
  );
}