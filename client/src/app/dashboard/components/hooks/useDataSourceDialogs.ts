import { useState } from "react";
import { API } from "../../../api/api";

type SourceType = "File" | "Url";

interface Props {
  projectId: string;
  refresh: () => void;
}

export const useDataSourceDialogs = ({ projectId, refresh }: Props) => {
  // --- Add Dialog ---
  const [addOpen, setAddOpen] = useState(false);
  const [name, setName] = useState("");
  const [sourceType, setSourceType] = useState<SourceType>("File");
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const openAdd = () => setAddOpen(true);
  const closeAdd = () => {
    setAddOpen(false);
    setName("");
    setFile(null);
    setUrl("");
    setSourceType("File");
    setAddError(null);
    setAddLoading(false);
  };

  const confirmAdd = async () => {
    if (!name.trim()) return;
    setAddLoading(true);
    setAddError(null);
    try {
      if (sourceType === "File" && file) {
        await API.dataSources.createFile({ file, name, projectId });
      } else if (sourceType === "Url" && url.trim()) {
        await API.dataSources.createLink({ url, name, projectId });
      } else {
        throw new Error("Missing file or URL");
      }
      refresh();
      closeAdd();
    } catch (err) {
      setAddError(err instanceof Error ? err.message : "Add failed");
    } finally {
      setAddLoading(false);
    }
  };

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
      await API.dataSources.delete(deleteId);
      refresh();
      closeDelete();
    } catch (err) {
      console.error("Failed to delete", err);
    } finally {
      setDeleteLoading(false);
    }
  };

  return {
    add: {
      isOpen: addOpen,
      open: openAdd,
      close: closeAdd,
      name,
      setName,
      file,
      setFile,
      url,
      setUrl,
      sourceType,
      setSourceType,
      loading: addLoading,
      error: addError,
      confirm: confirmAdd,
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
