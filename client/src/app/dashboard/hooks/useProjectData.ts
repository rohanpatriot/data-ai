import { useState, useEffect } from "react";
import { supabase } from "../../../supabase-client";
import { useNavigate } from "react-router-dom";
import user from '@/assets/dev/user.webp'

export interface Project {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

export interface User {
  email: string;
  avatar_url: string;
}

export const useProjectData = (projectId: string | null) => {
  const navigate = useNavigate();
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [userImage, setUserImage] = useState(user);
  const [userEmail, setUserEmail] = useState<string>();

  // Fetch user data
  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      setUserImage(data.user?.user_metadata.avatar_url);
      setUserEmail(data.user?.user_metadata?.email);
    }
  };

  // Fetch project data
  const fetchProject = async () => {
    if (!projectId) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

      if (error) {
        console.error("Error fetching project:", error);
        navigate("*");
        return;
      }

      if (data) {
        setCurrentProject(data);
      }
    } catch (error) {
      console.error("Exception fetching project:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchProject();
  }, [projectId]);

  return {
    currentProject,
    loading,
    user: { email: userEmail || "", avatar_url: userImage },
  };
};
