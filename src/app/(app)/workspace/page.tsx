'use client';
import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/store/Auth";
import { useDrawingStore } from "@/store/Canva";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
const ExcalidrawWithClientOnly = dynamic(
  async () => (await import("../../../components/ExcalidrawWrapper")).default,
  {
    ssr: false,
  },
);

export default function WorkspacePage() {
  const { user } = useAuthStore();
  const { drawingData } = useDrawingStore();
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
    } catch (error: any) {
      toast.error("Something went to wrong while fetching workspace data");
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
        style={{ height: "1000px" }}
        className="aspect-video w-full bg-accent dark:bg-gray-700 rounded-lg flex items-center justify-center"
      >
        <ExcalidrawWithClientOnly user={user} workspaceData={workspaceData} setWorkspaceData={setWorkspaceData} />
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
