"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Timeline } from "@/components/sections/timeline";
import type { Experience, Education, Skill, Certificate, Project } from "@/types";

export function ResumeTabs({
  experience,
  education,
  skills,
  certificates,
  projects,
}: {
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  certificates: Certificate[];
  projects: Project[];
}) {
  const skillGroups = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    (acc[skill.category] ??= []).push(skill);
    return acc;
  }, {});

  return (
    <Tabs defaultValue="experience" className="mt-10">
      <TabsList>
        <TabsTrigger value="experience">Experience</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="certificates">Certificates</TabsTrigger>
      </TabsList>

      <TabsContent value="experience" className="mt-6">
        {experience.length ? (
          <Timeline
            entries={experience.map((e) => ({
              id: e.id,
              title: e.role,
              subtitle: e.company,
              startDate: e.startDate,
              endDate: e.isCurrent ? null : e.endDate,
              description: e.description,
            }))}
          />
        ) : (
          <p className="text-text-secondary">No experience entries published yet.</p>
        )}
      </TabsContent>

      <TabsContent value="education" className="mt-6">
        {education.length ? (
          <Timeline
            entries={education.map((e) => ({
              id: e.id,
              title: e.degree,
              subtitle: e.institution,
              startDate: e.startDate,
              endDate: e.endDate,
              description: e.description ?? undefined,
            }))}
          />
        ) : (
          <p className="text-text-secondary">No education entries published yet.</p>
        )}
      </TabsContent>

      <TabsContent value="skills" className="mt-6">
        {Object.keys(skillGroups).length ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.entries(skillGroups).map(([category, items]) => (
              <Card key={category}>
                <p className="font-medium">{category}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {items.map((s) => (
                    <Badge key={s.id}>{s.name}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-text-secondary">No skills published yet.</p>
        )}
      </TabsContent>

      <TabsContent value="projects" className="mt-6">
        {projects.length ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((p) => (
              <Card key={p.id}>
                <p className="font-medium">{p.title}</p>
                <p className="mt-1 text-sm text-text-secondary">{p.summary}</p>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-text-secondary">No projects published yet.</p>
        )}
      </TabsContent>

      <TabsContent value="certificates" className="mt-6">
        {certificates.length ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {certificates.map((c) => (
              <Card key={c.id}>
                <p className="font-medium">{c.title}</p>
                <p className="mt-1 text-sm text-text-secondary">{c.issuer}</p>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-text-secondary">No certificates published yet.</p>
        )}
      </TabsContent>
    </Tabs>
  );
}
