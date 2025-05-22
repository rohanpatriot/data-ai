import { useState } from "react";
import { API } from "../../../api/api";

interface Props {
    widgetId: string;
  refresh: () => void;
}

export const useWidgetDialogs = ({ widgetId, refresh }: Props) => {
    console.debug("useWidgetDialogs", { widgetId });

  // --- Delete Dialog ---
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const openDelete = (id: string) => setDeleteId(id);
  const closeDelete = () => {
    setDeleteId(null);
    setDeleteLoading(false);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      await API.widgets.delete(deleteId);
      refresh();
      closeDelete();
    } catch (err) {
      console.error("Failed to delete widget", err);
    } finally {
      setDeleteLoading(false);
    }
  };

  // --- Edit Dialog ---
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const openEdit = (id: string, name: string) => {
    setEditId(id);
    setEditName(name);
  };

  const closeEdit = () => {
    setEditId(null);
    setEditName("");
    setEditError(null);
    setEditLoading(false);
  };

  const confirmEdit = async () => {
    if (!editId || !editName.trim()) return;
    setEditLoading(true);
    setEditError(null);
    try {
      await API.widgets.update(editId, {
        name: editName,
      });
      refresh();
      closeEdit();
    } catch (err) {
      setEditError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setEditLoading(false);
    }
  };

  return {
    edit: {
      isOpen: !!editId,
      open: openEdit,
      close: closeEdit,
      id: editId,
      name: editName,
      setName: setEditName,
      loading: editLoading,
      error: editError,
      confirm: confirmEdit,
    },
    del: {
      id: deleteId,
      isOpen: !!deleteId,
      open: openDelete,
      close: closeDelete,
      loading: deleteLoading,
      confirm: confirmDelete,
    },
  };
};