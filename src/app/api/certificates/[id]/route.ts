import { db } from "@/lib/db";
import { createItemCrudHandlers } from "@/lib/api/crud-factory";

export const { PATCH, DELETE } = createItemCrudHandlers(() => db.certificate);
