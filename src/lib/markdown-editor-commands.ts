export type EditResult = { text: string; selectionStart: number; selectionEnd: number };

/** Wraps the current selection with the given prefix/suffix (e.g. bold **text**).
 * If nothing is selected, inserts placeholder text between the markers and
 * selects it, so typing immediately replaces it. */
export function wrapSelection(
  value: string,
  start: number,
  end: number,
  prefix: string,
  suffix: string = prefix,
  placeholder = "text",
): EditResult {
  const selected = value.slice(start, end) || placeholder;
  const text = value.slice(0, start) + prefix + selected + suffix + value.slice(end);
  return {
    text,
    selectionStart: start + prefix.length,
    selectionEnd: start + prefix.length + selected.length,
  };
}

/** Prefixes each selected line with the given marker (e.g. "> " for a quote,
 * "- " for a list, "1. " for an ordered list). If nothing is selected,
 * applies to the current line only. */
export function prefixLines(
  value: string,
  start: number,
  end: number,
  makeMarker: (lineIndex: number) => string,
): EditResult {
  const lineStart = value.lastIndexOf("\n", start - 1) + 1;
  const lineEndSearch = value.indexOf("\n", end);
  const lineEnd = lineEndSearch === -1 ? value.length : lineEndSearch;

  const block = value.slice(lineStart, lineEnd);
  const lines = block.split("\n");
  const newBlock = lines.map((line, i) => `${makeMarker(i)}${line}`).join("\n");
  const text = value.slice(0, lineStart) + newBlock + value.slice(lineEnd);

  return {
    text,
    selectionStart: lineStart,
    selectionEnd: lineStart + newBlock.length,
  };
}

/** Inserts a block on its own line(s), adding surrounding blank lines if the
 * cursor isn't already at the start of an empty line. */
export function insertBlock(value: string, start: number, end: number, block: string): EditResult {
  const needsLeadingNewline = start > 0 && value[start - 1] !== "\n";
  const before = needsLeadingNewline ? "\n\n" : "";
  const needsTrailingNewline = end < value.length && value[end] !== "\n";
  const after = needsTrailingNewline ? "\n\n" : "";

  const insertion = `${before}${block}${after}`;
  const text = value.slice(0, start) + insertion + value.slice(end);
  const cursor = start + before.length + block.length;
  return { text, selectionStart: cursor, selectionEnd: cursor };
}

export const MARKDOWN_COMMANDS = {
  heading: (value: string, start: number, end: number, level: 1 | 2 | 3 = 2) =>
    prefixLines(value, start, end, () => `${"#".repeat(level)} `),
  bold: (value: string, start: number, end: number) => wrapSelection(value, start, end, "**", "**", "bold text"),
  italic: (value: string, start: number, end: number) => wrapSelection(value, start, end, "*", "*", "italic text"),
  underline: (value: string, start: number, end: number) =>
    wrapSelection(value, start, end, "<u>", "</u>", "underlined text"),
  strikethrough: (value: string, start: number, end: number) =>
    wrapSelection(value, start, end, "~~", "~~", "strikethrough text"),
  inlineCode: (value: string, start: number, end: number) => wrapSelection(value, start, end, "`", "`", "code"),
  quote: (value: string, start: number, end: number) => prefixLines(value, start, end, () => "> "),
  unorderedList: (value: string, start: number, end: number) => prefixLines(value, start, end, () => "- "),
  orderedList: (value: string, start: number, end: number) =>
    prefixLines(value, start, end, (i) => `${i + 1}. `),
  taskList: (value: string, start: number, end: number) => prefixLines(value, start, end, () => "- [ ] "),
  codeBlock: (value: string, start: number, end: number, language = "") => {
    const selected = value.slice(start, end) || "your code here";
    return insertBlock(value, start, end, "```" + language + "\n" + selected + "\n```");
  },
  table: (value: string, start: number, end: number) =>
    insertBlock(
      value,
      start,
      end,
      ["| Column 1 | Column 2 |", "| --- | --- |", "| Cell 1 | Cell 2 |", "| Cell 3 | Cell 4 |"].join("\n"),
    ),
  horizontalRule: (value: string, start: number, end: number) => insertBlock(value, start, end, "---"),
  link: (value: string, start: number, end: number) => {
    const selected = value.slice(start, end) || "link text";
    const insertion = `[${selected}](https://)`;
    const text = value.slice(0, start) + insertion + value.slice(end);
    // Select the URL placeholder so typing immediately replaces it.
    const urlStart = start + selected.length + 3; // "[selected](" length
    return { text, selectionStart: urlStart, selectionEnd: urlStart + "https://".length };
  },
  image: (value: string, start: number, end: number, url: string, alt = "") => {
    const insertion = `![${alt}](${url})`;
    const text = value.slice(0, start) + insertion + value.slice(end);
    const cursor = start + insertion.length;
    return { text, selectionStart: cursor, selectionEnd: cursor };
  },
};

/** Strips common inline/block markdown syntax from the selection (or whole
 * text if nothing selected) — a best-effort "clear formatting", not a full
 * markdown parser. */
export function clearFormatting(value: string, start: number, end: number): EditResult {
  const hasSelection = end > start;
  const rangeStart = hasSelection ? start : 0;
  const rangeEnd = hasSelection ? end : value.length;
  const selected = value.slice(rangeStart, rangeEnd);

  const cleaned = selected
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/~~(.+?)~~/g, "$1")
    .replace(/<u>(.+?)<\/u>/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^>\s?/gm, "")
    .replace(/^[-*]\s\[[ x]\]\s/gm, "")
    .replace(/^[-*]\s/gm, "")
    .replace(/^\d+\.\s/gm, "");

  const text = value.slice(0, rangeStart) + cleaned + value.slice(rangeEnd);
  return { text, selectionStart: rangeStart, selectionEnd: rangeStart + cleaned.length };
}

/** Detects a markdown image reference `![alt](url)` overlapping the current
 * cursor position, if any — used so the toolbar's Image button can offer
 * Replace/Remove instead of always inserting a new image. */
export function findImageAtCursor(value: string, cursor: number): { start: number; end: number; alt: string; url: string } | null {
  const regex = /!\[([^\]]*)\]\(([^)]*)\)/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(value)) !== null) {
    const [full = "", alt = "", url = ""] = match;
    const start = match.index;
    const end = start + full.length;
    if (cursor >= start && cursor <= end) {
      return { start, end, alt, url };
    }
  }
  return null;
}