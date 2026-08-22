"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2, GripVertical, Plus } from "lucide-react";
import type { Service } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/admin/status-badge";
import { DataTable } from "@/components/admin/data-table";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { deleteService } from "@/app/(admin)/admin/services/actions";
import { toast } from "sonner";

interface ServicesTableProps {
  services: Service[];
}

export function ServicesTable({ services: initialServices }: ServicesTableProps) {
  const router = useRouter();
  const [services, setServices] = useState(initialServices);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id?: string }>({
    open: false,
  });

  async function handleDelete(id: string) {
    const result = await deleteService(id);
    if (result.success) {
      toast.success("Service deleted successfully.");
      setServices(services.filter((s) => s.id !== id));
      router.refresh();
    } else {
      toast.error(result.error);
    }
    setDeleteDialog({ open: false });
  }

  const columns = [
    {
      id: "order",
      header: "Order",
      cell: () => <GripVertical className="h-4 w-4 text-muted-foreground" />,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }: { row: { original: Service } }) => (
        <div>
          <p className="font-medium">{row.original.title}</p>
          <p className="text-sm text-muted-foreground">{row.original.shortDescription}</p>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }: { row: { original: Service } }) => (
        <Badge>{row.original.category}</Badge>
      ),
    },
    {
      accessorKey: "visible",
      header: "Status",
      cell: ({ row }: { row: { original: Service } }) => (
        <StatusBadge status={row.original.visible ? "visible" : "hidden"} />
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: { original: Service } }) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/services/${row.original.id}`}>
            <Button variant="ghost" size="sm">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeleteDialog({ open: true, id: row.original.id })}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {services.length} service{services.length !== 1 ? "s" : ""}
        </p>
        <Link href="/admin/services/new">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </Link>
      </div>

      <DataTable columns={columns} data={services} />

      <ConfirmDeleteDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open })}
        onConfirm={() => deleteDialog.id && handleDelete(deleteDialog.id)}
        title="Delete Service"
        description="Are you sure you want to delete this service? This action cannot be undone."
      />
    </>
  );
}