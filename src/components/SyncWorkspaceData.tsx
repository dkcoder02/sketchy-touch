"use client";

import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/index";
import axios from "axios";

interface Props {
  workspaceData: string;
  ownerId: string | undefined;
}
export default function SyncWorkspaceData(Props: Props) {
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();
  const handleSyncWorkspaceDataToBackend = async () => {
    try {
      setIsSyncing(true);
      const { workspaceData, ownerId } = Props;

      const response = await axios.patch("/api/update-drawing", {
        ownerId,
        drawings: workspaceData,
      });

      if (response.data.success) {
        toast({
          title: "Syncing successful",
          description: "Data synced successfully",
          variant: "default",
        });
      }
    } catch (error) {
      console.log("Syncing failed", error);
    } finally {
      setIsSyncing(false);
    }
  };
  return (
    <div>
      {isSyncing ? (
        <Button
          variant="outline"
          className="w-full bg-gray-500 text-black"
          disabled={isSyncing}
        >
          Syncing...
        </Button>
      ) : (
        <Button
          variant="outline"
          className="w-full bg-gray-500 text-black"
          onClick={handleSyncWorkspaceDataToBackend}
        >
          Sync
        </Button>
      )}
    </div>
  );
}
