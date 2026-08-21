import type { Prisma } from "@prisma/client";

// Draft projects (visible: false) are hidden from every public-facing query.
export const visibleProjectWhere: Prisma.ProjectWhereInput = { visible: true };
