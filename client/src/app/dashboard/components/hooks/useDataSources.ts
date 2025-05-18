import { useEffect, useState } from "react";
import { API } from "../../../api/api";

export interface DataSource {
  id: string;
  name: string;
  type: string;
  fileType: string;
  size: string;
  addedAt: string;
  path: string;
}

export const useDataSources = (projectId: string) => {
  const [dataSources, setDataSources] = useState<DataSource[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const sources = await API.dataSources.getAll(projectId);
      setDataSources(sources);
    } catch (err) {
      console.error("Failed to fetch data sources:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchData();
    }
  }, [projectId]);

  return {
    dataSources,
    setDataSources,
    isLoading,
    refresh: fetchData,
  };
};
