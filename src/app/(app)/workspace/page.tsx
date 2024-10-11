"use client";

import React, { useState, useEffect } from "react";
import {
  Excalidraw,
  LiveCollaborationTrigger,
  THEME,
} from "@excalidraw/excalidraw";
import { useAuthStore } from "@/store/Auth";
import { useDrawingStore } from "@/store/Canva";
import axios from "axios";
import SyncWorkspaceData from "@/components/SyncWorkspaceData";
import { Loader } from "lucide-react";

export default function page() {
  const { user } = useAuthStore();
  const { storeDrawings, drawingData } = useDrawingStore();
  const [workspaceData, setWorkspaceData] = useState(JSON.parse(drawingData));
  const [isCollaborating, setIsCollaborating] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const fetchWorkspaceData = async () => {
    try {
      if (!user?.$id || drawingData) return;
      setLoading(true);
      const response = await axios.get(`/api/get-user-drawings/${user?.$id}`);
      if (response.data.status) {
        setWorkspaceData(JSON.parse(response.data.data.drawings));
      }
    } catch (error) {
      console.log("fetchWorkspaceData => error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspaceData();
  }, []);

  return !isLoading ? (
    <>
      <div
        style={{ height: "580px" }}
        className="aspect-video w-full bg-accent dark:bg-gray-700 rounded-lg flex items-center justify-center"
      >
        <Excalidraw
          initialData={{
            elements: workspaceData,
            scrollToContent: true,
          }}
          onChange={(canvaData) => {
            if (canvaData?.length > 0) {
              storeDrawings(JSON.stringify(canvaData));
            }
          }}
          theme={THEME.DARK}
          renderTopRightUI={() => (
            <>
              <LiveCollaborationTrigger
                isCollaborating={isCollaborating}
                onSelect={() => {
                  setIsCollaborating(true);
                }}
              />
              <SyncWorkspaceData
                workspaceData={workspaceData}
                ownerId={user?.$id}
              />
            </>
          )}
        />
      </div>
    </>
  ) : (
    <div className="h-64 flex items-center justify-center">
      <Loader size="medium" color="#3498db" />
    </div>
  );
}
