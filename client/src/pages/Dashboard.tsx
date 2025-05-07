import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  IconButton,
  AppBar,
  Toolbar,
  Grid,
} from "@mui/material";
// import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from "motion/react";
import UserMenu from "../components/UserMenu";
import ChatSidePanel from "../components/ChatSidePanel";
import DataSourcesModal from "../components/DataSourcesModal";
import AddDataSource from "../components/AddDataSource";
import DataSourcesSidePanel from "../components/DataSourcesSidePanel";
import { supabase } from "../supabase-client";
import ShareModal from "../components/ShareModal";
import ExportMenu from "../components/ExportMenu";
import TripleDotIcon from "../assets/icons/TripleDotIcon";
import EditProjectModal from "../components/EditProjectModal";
import MoreMenu from "../components/MoreMenu";

interface Message {
  sender: "user" | "system";
  text: string;
  timestamp: Date;
}

interface DataSource {
  id: string;
  name: string;
  type: string;
  fileType: string;
  size: string;
  addedAt: string;
}

// @ TODO
// 1. Hey Ale, this is a huge fucking component, let's break it down before shipping.
// 2. Chat needs some sort of a web socket connection to send and receive messages, let's think about it.
// 3. When you add a data source, what's the scope here? Is it a global data source or a project specific one?
const Dashboard: React.FC = () => {
  //   const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(true);
  const [DSPanelOpen, setDSPanelOpen] = useState(false);
  const [userImage, setUserImage] = useState("/src/assets/dev/user.webp");
  const [userEmail, setUserEmail] = useState();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [shareMenuAnchor, setShareMenuAnchor] = useState<HTMLElement | null>(null);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [moreMenuAnchor, setMoreMenuAnchor] = useState<HTMLElement | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "user",
      text: "Who the heck is Bombordillo Croccodrillo?",
      timestamp: new Date(),
    },
    {
      sender: "system",
      text: "It is an italian brainrot name",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [showDataSourcesModal, setShowDataSourcesModal] = useState(false);
  const [showAddDataSourceModal, setShowAddDataSourceModal] = useState(false);
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: "1",
      name: "Financial Report 2025",
      type: "CSV",
      fileType: "CSV file",
      size: "2.2 Kb",
      addedAt: "2m ago",
    },
    {
      id: "2",
      name: "Financial Report 2025",
      type: "CSV",
      fileType: "CSV file",
      size: "2.2 Kb",
      addedAt: "2m ago",
    },
    {
      id: "3",
      name: "Financial Report 2025",
      type: "CSV",
      fileType: "CSV file",
      size: "2.2 Kb",
      addedAt: "2m ago",
    },
  ]);
  const [newDataSource, setNewDataSource] = useState({
    name: "",
    type: "",
    sourceType: "File",
  });

  // Perhaps we move these to some api/ directory or fetch them at entry point then cache? It doesnt change. @ale
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUserImage(data.user?.user_metadata.avatar_url);
        setUserEmail(data.user?.user_metadata?.email);
      }
    };

    useEffect(() => {
      fetchUser();
    }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { sender: "user", text: newMessage, timestamp: new Date() },
      ]);
      setNewMessage("");

      // Simulate response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "system",
            text: "I've received your message and will get back to you shortly.",
            timestamp: new Date(),
          },
        ]);
      }, 1000);
    }
  };

  const handleAddDataSource = () => {
    const newSource = {
      id: Date.now().toString(),
      name: newDataSource.name || "Untitled Source",
      type: newDataSource.type || "CSV",
      fileType: "CSV file",
      size: "2.2 Kb",
      addedAt: "just now",
    };

    setDataSources([...dataSources, newSource]);
    setNewDataSource({ name: "", type: "", sourceType: "File" });
    setShowAddDataSourceModal(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <AnimatePresence>
          {/* Chat sidebar */}
          {chatOpen && (
            <motion.div
              key="chat-sidebar"
              initial={{ x: -330, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -330, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <ChatSidePanel
                messages={messages}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleSendMessage={handleSendMessage}
                setChatOpen={setChatOpen}
                setShowDataSourcesModal={setShowDataSourcesModal}
                user={{email: userEmail || "", avatar_url: userImage}}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {/* Toolbar */}
          <AppBar
            position="static"
            color="transparent"
            elevation={0}
            sx={{ borderBottom: "1px solid #eaeaea" }}
          >
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {!chatOpen && (
                  <IconButton
                    onClick={() => setChatOpen(true)}
                    sx={{ mr: 0.5 }}
                  >
                    <Box
                      component="span"
                      sx={{
                        width: 24,
                        height: 24,
                        display: "flex",
                      }}
                    >
                      <svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 2V19M1 7.9C1 5.66 1 4.54 1.436 3.684C1.81949 2.93139 2.43139 2.31949 3.184 1.936C4.04 1.5 5.16 1.5 7.4 1.5H12.6C14.84 1.5 15.96 1.5 16.816 1.936C17.5686 2.31949 18.1805 2.93139 18.564 3.684C19 4.54 19 5.66 19 7.9V13.1C19 15.34 19 16.46 18.564 17.316C18.1805 18.0686 17.5686 18.6805 16.816 19.064C15.96 19.5 14.84 19.5 12.6 19.5H7.4C5.16 19.5 4.04 19.5 3.184 19.064C2.43139 18.6805 1.81949 18.0686 1.436 17.316C1 16.46 1 15.34 1 13.1V7.9Z"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </Box>
                  </IconButton>
                )}
                <Typography variant="h5">Untitled Project</Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="medium"
                  onClick={() => setDSPanelOpen(true)}
                >
                  Data sources
                </Button>

                <Button variant="outlined" size="medium" color="secondary" onClick={(e) => {setShareMenuAnchor(e.currentTarget); setExportMenuOpen(true);}}>
                  Export
                </Button>
                <ExportMenu
                  setExportMenuOpen={setExportMenuOpen}
                  exportMenuOpen={exportMenuOpen}
                  shareMenuAnchor={shareMenuAnchor}
                  setIsShareModalOpen={setIsShareModalOpen}
                />

                <IconButton onClick={(e) => {setMoreMenuAnchor(e.currentTarget); setMoreMenuOpen(true);}}>
                  <Box
                    component="span"
                    sx={{
                      width: 20,
                      height: 20,
                      display: "flex",
                    }}
                  >
                    <TripleDotIcon />
                  </Box>
                </IconButton>
                <MoreMenu 
                  setIsShareModalOpen={setIsShareModalOpen}
                  setEditProjectModalOpen={() => {
                    setIsEditProjectModalOpen(true);
                    setMoreMenuOpen(false);
                  }}
                  moreMenuAnchor={moreMenuAnchor}
                  moreMenuOpen={moreMenuOpen}
                  setMoreMenuOpen={setMoreMenuOpen}
                />
                <UserMenu />
              </Box>
            </Toolbar>
          </AppBar>

          {/* Dashboard content placeholder */}
          <Box sx={{ flexGrow: 1, p: 4, overflowY: "auto" }}>
            <Container maxWidth="xl">
              <Box sx={{ mb: 3 }}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Dashboard
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  This is your dashboard area. You can add widgets here to
                  visualize your data.
                </Typography>
              </Box>

              <Grid container spacing={3}>
                {/* Empty placeholder for future widgets */}
              </Grid>
            </Container>
          </Box>
        </Box>

        <DataSourcesSidePanel
          setDSPanelOpen={setDSPanelOpen}
          DSPanelOpen={DSPanelOpen}
          dataSources={dataSources}
          setShowAddDataSourceModal={setShowAddDataSourceModal}
        />

        {/* Data Sources Modal */}
        <DataSourcesModal
          showDataSourcesModal={showDataSourcesModal}
          setShowDataSourcesModal={setShowDataSourcesModal}
          setShowAddDataSourceModal={setShowAddDataSourceModal}
          dataSources={dataSources}
        />

        {/* Add Data Source Modal */}
        <AddDataSource
          showAddDataSourceModal={showAddDataSourceModal}
          setShowAddDataSourceModal={setShowAddDataSourceModal}
          newDataSource={newDataSource}
          setNewDataSource={setNewDataSource}
          handleAddDataSource={handleAddDataSource}
        />

        <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
          />

        <EditProjectModal 
          isOpen={isEditProjectModalOpen}
          onClose={() => setIsEditProjectModalOpen(false)}
          projectName="Untitled Project"
          projectDescription="This is a sample project description."
          onSave={(name, description) => {
            console.log("Project name:", name);
            console.log("Project description:", description);
            // @Ale - logic here to save the project name and description
            setIsEditProjectModalOpen(false);
          }}
          />
      </Box>
    </motion.div>
  );
};

export default Dashboard;
