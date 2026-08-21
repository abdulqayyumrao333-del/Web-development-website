"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CharacterCounter } from "@/components/admin/blog/character-counter";
import { SlugInput } from "@/components/admin/blog/slug-input";
import { TagInput } from "@/components/admin/blog/tag-input";
import { StatusSelector } from "@/components/admin/blog/status-selector";
import { FeaturedToggle } from "@/components/admin/blog/featured-toggle";

const TITLE_MAX = 200;
const EXCERPT_MAX = 300;
const NEW_CATEGORY_VALUE = "__new__";

export type BasicInfoFields = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  featured: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
};

export function BasicInfoSection({
  value,
  onChange,
  onTitleChange,
  onSlugManualEdit,
  categories,
  errors,
}: {
  value: BasicInfoFields;
  onChange: (fields: Partial<BasicInfoFields>) => void;
  onTitleChange: (title: string) => void;
  onSlugManualEdit: () => void;
  categories: string[];
  errors: Partial<Record<keyof BasicInfoFields, string>>;
}) {
  const [addingCategory, setAddingCategory] = useState(false);

  return (
    <Card className="p-5">
      <h2 className="text-sm font-semibold text-text-primary">Basic Information</h2>

      <div className="mt-4 space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="title" className="text-xs font-medium text-text-secondary">
              Title <span className="text-danger">*</span>
            </label>
            <CharacterCounter current={value.title.length} max={TITLE_MAX} />
          </div>
          <Input
            id="title"
            value={value.title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="How to Learn Next.js"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "title-error" : undefined}
            className="mt-1.5 text-lg"
          />
          {errors.title && (
            <p id="title-error" className="mt-1 text-xs text-danger">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label className="text-xs font-medium text-text-secondary">
            Slug <span className="text-danger">*</span>
          </label>
          <div className="mt-1.5">
            <SlugInput value={value.slug} onChange={(slug) => onChange({ slug })} onManualEdit={onSlugManualEdit} />
          </div>
          {errors.slug && <p className="mt-1 text-xs text-danger">{errors.slug}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="excerpt" className="text-xs font-medium text-text-secondary">
              Excerpt <span className="text-danger">*</span>
            </label>
            <CharacterCounter current={value.excerpt.length} max={EXCERPT_MAX} />
          </div>
          <Textarea
            id="excerpt"
            value={value.excerpt}
            onChange={(e) => onChange({ excerpt: e.target.value })}
            rows={3}
            placeholder="A short summary shown in blog listings and search results"
            aria-invalid={Boolean(errors.excerpt)}
            className="mt-1.5"
          />
          {errors.excerpt && <p className="mt-1 text-xs text-danger">{errors.excerpt}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className="text-xs font-medium text-text-secondary">
              Category <span className="text-danger">*</span>
            </label>
            {addingCategory ? (
              <Input
                autoFocus
                value={value.category}
                onChange={(e) => onChange({ category: e.target.value })}
                onBlur={() => {
                  if (!value.category.trim()) setAddingCategory(false);
                }}
                placeholder="New category name"
                className="mt-1.5"
              />
            ) : (
              <select
                id="category"
                value={categories.includes(value.category) ? value.category : ""}
                onChange={(e) => {
                  if (e.target.value === NEW_CATEGORY_VALUE) {
                    onChange({ category: "" });
                    setAddingCategory(true);
                  } else {
                    onChange({ category: e.target.value });
                  }
                }}
                aria-invalid={Boolean(errors.category)}
                className="mt-1.5 h-10 w-full rounded-sm border border-border bg-bg-surface px-3 text-sm outline-none focus:border-accent-indigo"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
                <option value={NEW_CATEGORY_VALUE}>+ Add new category</option>
              </select>
            )}
            {errors.category && <p className="mt-1 text-xs text-danger">{errors.category}</p>}
          </div>

          <div>
            <label htmlFor="author" className="text-xs font-medium text-text-secondary">
              Author
            </label>
            <Input
              id="author"
              value={value.author}
              onChange={(e) => onChange({ author: e.target.value })}
              className="mt-1.5"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-text-secondary">Tags</label>
          <div className="mt-1.5">
            <TagInput value={value.tags} onChange={(tags) => onChange({ tags })} />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
          <div>
            <p className="text-xs font-medium text-text-secondary">Status</p>
            <div className="mt-1.5">
              <StatusSelector value={value.status} onChange={(status) => onChange({ status })} />
            </div>
          </div>

          <label className="flex items-center gap-2.5">
            <span className="text-xs font-medium text-text-secondary">Featured</span>
            <FeaturedToggle checked={value.featured} onChange={(featured) => onChange({ featured })} />
          </label>
        </div>
      </div>
    </Card>
  );
}
