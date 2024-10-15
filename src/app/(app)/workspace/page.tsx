"use client";

import React, { useState, useEffect } from "react";
import {
  Excalidraw,
  THEME,
} from "@excalidraw/excalidraw";
import { useAuthStore } from "@/store/Auth";
import { useDrawingStore } from "@/store/Canva";
import axios from "axios";
import SyncWorkspaceData from "@/components/SyncWorkspaceData";
import ClipLoader from "react-spinners/ClipLoader";

export default function page() {
  const { user } = useAuthStore();
  const { storeDrawings, drawingData } = useDrawingStore();
  const [workspaceData, setWorkspaceData] = useState(JSON.parse(drawingData));
  const [isLoading, setLoading] = useState(false);

  const fetchWorkspaceData = async () => {
    setLoading(true);
    try {
      if (!user?.$id || drawingData) return;
      const response = await axios.get(`/api/get-user-drawings/${user?.$id}`);
      if (response.data.status) {
        setWorkspaceData(JSON.parse(response.data.data.drawings));
      }
    } catch (error) {
      console.log("fetchWorkspaceData => error", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1200);
    }
  };

  useEffect(() => {
    fetchWorkspaceData();
  }, []);

  return !isLoading ? (
    <>
      <div
        style={{ height: "610px" }}
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <ClipLoader
        color="#ff7700"
        loading={true}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
