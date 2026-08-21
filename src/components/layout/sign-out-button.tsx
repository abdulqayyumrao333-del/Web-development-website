"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm text-text-secondary hover:bg-bg-surface hover:text-danger"
    >
      <LogOut className="h-4 w-4" /> Sign out
    </button>
  );
}
