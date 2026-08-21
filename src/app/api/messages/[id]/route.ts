import { db } from "@/lib/db";
import { createItemCrudHandlers } from "@/lib/api/crud-factory";

// Only status (NEW/READ/REPLIED/ARCHIVED) is ever updated via PATCH — the
// message content itself is never editable, only its triage state.
export const { PATCH, DELETE } = createItemCrudHandlers(() => db.contactSubmission);
