import { db } from "@/lib/db";
import { createCrudHandlers } from "@/lib/api/crud-factory";

export const { GET, POST } = createCrudHandlers(() => db.education);
