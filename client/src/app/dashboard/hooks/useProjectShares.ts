import { useState, useEffect } from "react";
import { ProjectSharesAPI } from "../../api/projectShares";

export const useProjectShare = (projectId?: string, token?: string) => {
  const [sharedProjectId, setSharedProjectId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [shareToken, setShareToken] = useState<string | null>(null);

  const resolveToken = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const projectIdFromToken = await ProjectSharesAPI.getProjectIdFromToken(token);
      setSharedProjectId(projectIdFromToken);
    } catch (err) {
      console.error("Failed to resolve token:", err);
      setError(err instanceof Error ? err : new Error("Failed to resolve token"));
    } finally {
      setLoading(false);
    }
  };

  const createShareLink = async () => {
    if (!projectId) return null;
    try {
      const token = await ProjectSharesAPI.create(projectId);
      setShareToken(token);
      const url = `https://app.perplexigrid.com/share/${token}`;
      await navigator.clipboard.writeText(url);
      return url;
    } catch (err) {
      console.error("Failed to create share link:", err);
      setError(err instanceof Error ? err : new Error("Failed to create share link"));
      return null;
    }
  };

  const revokeShareLink = async () => {
    if (!projectId) return;
    try {
      await ProjectSharesAPI.revoke(projectId);
      setShareToken(null);
    } catch (err) {
      console.error("Failed to revoke share link:", err);
      setError(err instanceof Error ? err : new Error("Failed to revoke share link"));
    }
  };

  useEffect(() => {
    if (token) {
      resolveToken();
    }
  }, [token]);

  return {
    sharedProjectId,
    shareToken,
    loading,
    error,
    createShareLink,
    revokeShareLink,
  };
};