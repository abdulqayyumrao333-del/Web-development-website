import type { Metadata } from "next";
import { LoginForm } from "@/components/sections/login-form";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Login",
  description: "Admin login.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col items-center justify-center px-6">
      <h1 className="text-2xl font-semibold">Admin Login</h1>
      <p className="mt-2 text-center text-sm text-text-secondary">
        Sign in to manage projects, blog posts, and site content.
      </p>
      <div className="mt-8 w-full">
        <LoginForm />
      </div>
    </div>
  );
}
