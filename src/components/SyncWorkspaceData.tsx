"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/index";
import axios from "axios";
import toast from "react-hot-toast";

interface Props {
  workspaceData: string;
  ownerId: string | undefined;
}
export default function SyncWorkspaceData(Props: Props) {
  const [isSyncing, setIsSyncing] = useState(false);
  const handleSyncWorkspaceDataToBackend = async () => {
    try {
      setIsSyncing(true);
      const { workspaceData, ownerId } = Props;
      const response = await axios.patch("/api/update-drawing", {
        ownerId,
        drawings: workspaceData,
      });

      if (!response.data.success) {
        toast.error("Data synced failed");
        return;
      }

      toast.success("Data synced successfully");
    } catch (error) {
      toast.error("Data synced failed");
    } finally {
      setIsSyncing(false);
    }
  };
  return (
    <div>
      {isSyncing ? (
        <Button
          variant="outline"
          className="w-full bg-orange-500 text-white"
          disabled={isSyncing}
        >
          Syncing...
        </Button>
      ) : (
        <Button
          variant="outline"
          className="w-full bg-orange-500 text-white"
          onClick={handleSyncWorkspaceDataToBackend}
        >
          Sync Data
        </Button>
      )}
    </div>
  );
}
