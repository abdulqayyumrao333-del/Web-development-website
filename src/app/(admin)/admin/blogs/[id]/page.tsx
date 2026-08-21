import { redirect } from "next/navigation";

type Params = Promise<{ id: string }>;

export default async function BlogDetailRedirectPage({ params }: { params: Params }) {
  const { id } = await params;
  redirect(`/admin/blogs/${id}/edit`);
}
