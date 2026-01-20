"use client";

import { useEffect, useState } from "react";
import CategoryList from "@/components/categories/category-list";
import CategoryForm from "@/components/categories/category-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import axios from "axios";
import { EndPoint } from "@/lib/api/endpoints";
import { getAccessToken } from "@/lib/auth/storage";
import { useRouter } from "next/navigation";

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const authHeader = () => {
    const token = getAccessToken?.();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    const h = authHeader();
    if (!h) {
      router.replace("/login?next=/categories");
      return;
    }

    (async () => {
      try {
        const res = await axios.get(EndPoint.CATEGORYLIST, { headers: h });
        setCategories(Array.isArray(res.data) ? res.data : res.data?.results || []);
      } catch (e) {
        // token expire ဖြစ်လည်း login ပြန်ပို့
        if (e?.response?.status === 401) {
          router.replace("/login?next=/categories");
          return;
        }
        setError(e?.message || "Failed");
      }
    })();
  }, [router]);

  // ✅ CREATE -> /categories/create/
  const createCategory = async (payload) => {
    const res = await axios.post(EndPoint.CATEGORYCREATE, payload, { headers: authHeader() });
    const created = res.data;
    setCategories((prev) => [created, ...(prev || [])]);
    return created;
  };

  // ✅ UPDATE -> /categories/<id>/update/
  const updateCategory = async (id, payload) => {
    if (!id) throw new Error("Category id missing");
    const res = await axios.patch(EndPoint.CATEGORYUPDATE(id), payload, { headers: authHeader() });
    const updated = res.data;
    setCategories((prev) => (prev || []).map((c) => (c.id === id ? updated : c)));
    return updated;
  };

  // ✅ DELETE -> /categories/<id>/delete/
  const deleteCategory = async (id) => {
    await axios.delete(EndPoint.CATEGORYDELETE(id), { headers: authHeader() });
    setCategories((prev) => (prev || []).filter((c) => c.id !== id));
  };


  const handleSave = async (data) => {
    setError("");
    try {
      const payload = { name: data.name, icon: data.icon };
      if (editing?.id) await updateCategory(editing.id, payload);
      else await createCategory(payload);

      setEditing(null);
      setOpen(false);
    } catch (e) {
      setError(e?.response?.data?.detail || e?.response?.data?.message || e.message || "Save failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Categories
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Organize your income & expense categories.
          </p>
          {loading && <p className="mt-2 text-sm text-slate-500">Loading...</p>}
          {error && <p className="mt-2 text-sm text-rose-500">{error}</p>}
        </div>

        <Dialog
          open={open}
          onOpenChange={(v) => {
            setOpen(v);
            if (!v) setEditing(null);
          }}
        >
          <DialogTrigger asChild>
            <Button className="rounded-xl gap-2">
              <Plus className="h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-3xl rounded-3xl bg-slate-950/95 border-white/10 text-white p-6 sm:p-8">
            <DialogTitle className="text-base font-semibold text-slate-100">
              {editing ? "Edit Category" : "Add Category"}
            </DialogTitle>

            <CategoryForm initialData={editing} onSubmit={handleSave} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-8">
        <CategoryList
          categories={Array.isArray(categories) ? categories : []}
          onEdit={(cat) => {
            setEditing(cat);
            setOpen(true);
          }}
          onDelete={(id) => deleteCategory(id)}
        />
      </div>

      {/* <div className="mt-6">
        <Button variant="outline" className="rounded-xl" onClick={fetchCategories}>
          Refresh
        </Button>
      </div> */}
    </div>
  );
}
