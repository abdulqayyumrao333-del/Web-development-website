import { Award, ExternalLink, Calendar, CheckCircle } from "lucide-react";
import { db } from "@/lib/db";
import { Reveal } from "@/components/sections/reveal";
import { formatDate } from "@/lib/utils";

export async function CertificationsSection() {
  let certificates: { id: string; title: string; issuer: string; issueDate: Date; credentialUrl: string | null }[] = [];
  try {
    certificates = await db.certificate.findMany({ orderBy: { order: "asc" } });
  } catch {
    certificates = [];
  }

  const panelShadow =
    "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">

      {/* ── Full-bleed background ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ margin: "0 calc(-50vw + 50%)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, transparent 0%, rgba(99,102,241,0.032) 35%, rgba(99,102,241,0.055) 65%, rgba(99,102,241,0.038) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(99,102,241,0.18) 25%, rgba(99,102,241,0.22) 50%, rgba(99,102,241,0.18) 75%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(99,102,241,0.10) 25%, rgba(99,102,241,0.14) 50%, rgba(99,102,241,0.10) 75%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-[380px]"
          style={{
            background:
              "radial-gradient(55% 100% at 20% 0%, rgba(79,70,229,0.06) 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,15rem)_1fr] gap-10 lg:gap-16 items-start">

        {/* ══ LEFT ══ */}
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent-indigo/60" />
              <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
                Certifications
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Verified
                <br />
                <span className="text-accent-indigo">credentials</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Professional certifications and credentials I've earned through verified programs.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {certificates.length} certifications
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  Verified credentials
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Industry recognized
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT ── Certifications ══ */}
        <Reveal delay={0.1}>
          <div className="relative">

            {/* ambient glows */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-6 left-1/4 h-40 w-40 rounded-full bg-accent-indigo/5 blur-2xl"
            />

            {certificates.length === 0 ? (
              <Reveal delay={0.08}>
                <div
                  className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm px-8 py-16 text-center"
                  style={{ boxShadow: panelShadow }}
                >
                  <Award className="h-10 w-10 text-accent-indigo/30 mx-auto mb-4" strokeWidth={1.5} />
                  <p className="text-sm text-text-secondary max-w-sm mx-auto">
                    No certificates published yet — this section only shows credentials Abdul has actually earned.
                  </p>
                </div>
              </Reveal>
            ) : (
              <div className="flex flex-col gap-3.5">
                {certificates.map((cert, i) => (
                  <Reveal key={cert.id} delay={0.12 + i * 0.06}>
                    <div
                      className="group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5 p-5 sm:p-6"
                      style={{ boxShadow: panelShadow }}
                    >
                      {/* hover gradient overlay */}
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-indigo/[0.04] via-transparent to-transparent"
                      />

                      {/* diagonal texture */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 h-16 opacity-[0.3]"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(135deg, rgba(99,102,241,0.05) 0px, rgba(99,102,241,0.05) 1px, transparent 1px, transparent 12px)",
                          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                        }}
                      />

                      {/* bracket - animated */}
                      <div
                        aria-hidden
                        className="absolute top-3 right-3 h-4 w-4 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
                      />

                      <div className="relative flex items-start gap-4">
                        {/* icon with ring */}
                        <div className="relative shrink-0">
                          <div className="absolute inset-[-6px] rounded-xl border border-accent-indigo/0 group-hover:border-accent-indigo/10 transition-all duration-500 scale-75 group-hover:scale-100" />
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent-indigo/15 bg-accent-indigo/8 group-hover:bg-accent-indigo/14 transition-all duration-300 group-hover:scale-110">
                            <Award className="h-5 w-5 text-accent-indigo" strokeWidth={1.75} />
                          </div>
                        </div>

                        {/* content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="font-semibold text-base sm:text-lg text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
                                {cert.title}
                              </h3>
                              <p className="text-sm text-text-secondary mt-0.5">
                                {cert.issuer}
                              </p>
                            </div>
                            <span className="font-mono text-[10px] text-accent-indigo/20 group-hover:text-accent-indigo/40 transition-colors duration-300 shrink-0">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </div>

                          {/* bottom section with date and link */}
                          <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-accent-indigo/8">
                            <div className="flex items-center gap-2 text-xs text-text-muted/60">
                              <Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />
                              <span className="font-mono">{formatDate(cert.issueDate)}</span>
                              <span className="text-accent-indigo/20">·</span>
                              <span className="flex items-center gap-1">
                                <CheckCircle className="h-3 w-3 text-emerald-500/50" strokeWidth={2} />
                                <span>Verified</span>
                              </span>
                            </div>

                            {cert.credentialUrl && (
                              <a
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link inline-flex items-center gap-1.5 text-xs font-medium text-accent-indigo/60 hover:text-accent-indigo transition-colors duration-300"
                              >
                                <span>View credential</span>
                                <ExternalLink className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" strokeWidth={1.5} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* bottom accent line on hover */}
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
                    </div>
                  </Reveal>
                ))}

                {/* bottom strip */}
                <div className="mt-0.5 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
                  <p className="font-mono text-[11px] text-text-muted">
                    CERTIFICATIONS · {certificates.length} CREDENTIALS · VERIFIED
                  </p>
                  <div className="flex gap-1">
                    {certificates.map((_, i) => (
                      <span
                        key={i}
                        className="h-1 rounded-full transition-all duration-300"
                        style={{
                          width: i === 0 ? "1.25rem" : "0.5rem",
                          backgroundColor: `rgb(99 102 241 / ${i === 0 ? 0.65 : Math.max(0.10, 0.40 - i * 0.06)})`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}