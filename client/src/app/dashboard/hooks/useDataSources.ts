import { useState } from "react";

export interface DataSource {
  id: string;
  name: string;
  type: string;
  fileType: string;
  size: string;
  addedAt: string;
}

export interface NewDataSource {
  name: string;
  type: string;
  sourceType: string;
}

export const useDataSources = () => {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);

  const [newDataSource, setNewDataSource] = useState<NewDataSource>({
    name: "",
    type: "",
    sourceType: "File",
  });

  const [showAddDataSourceModal, setShowAddDataSourceModal] = useState(false);
  const [DSPanelOpen, setDSPanelOpen] = useState(false);

  const handleAddDataSource = () => {
    const newSource = {
      id: Date.now().toString(),
      name: newDataSource.name || "Unnamed Source",
      type: newDataSource.type || "CSV",
      fileType: "CSV file",
      size: "2.2 Kb",
      addedAt: "just now",
    };

    setDataSources([...dataSources, newSource]);
    setNewDataSource({ name: "", type: "", sourceType: "File" });
    setShowAddDataSourceModal(false);
  };

  return {
    dataSources,
    newDataSource,
    setNewDataSource,
    showAddDataSourceModal,
    setShowAddDataSourceModal,
    DSPanelOpen,
    setDSPanelOpen,
    handleAddDataSource,
  };
};
