import { useEffect, useState } from "react";
import { API } from "../../api/api";
import { DataSource } from "../../../types/dataSource";

export const useDataSources = (projectId: string) => {
  const [dataSources, setDataSources] = useState<DataSource[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const sources = await API.dataSources.getAll(projectId);
      setDataSources(sources);
    } catch (error) {
      console.error("Failed to fetch data sources", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) fetchData();
  }, [projectId]);

  return {
    dataSources,
    setDataSources,
    isLoading,
    refresh: fetchData,
  };
};
