"use client";
import { Excalidraw } from "@excalidraw/excalidraw";
import {
    THEME,
} from "@excalidraw/excalidraw";
import SyncWorkspaceData from "./SyncWorkspaceData";
import { useDrawingStore } from "../store/Canva";

interface ExcalidrawWrapperProps {
    workspaceData: any;
    setWorkspaceData: any;
    user: any;
}
const ExcalidrawWrapper: React.FC<ExcalidrawWrapperProps> = ({ workspaceData, setWorkspaceData, user }) => {
    const { storeDrawings } = useDrawingStore();
    return (
        <>
            <Excalidraw theme={THEME.DARK}
                initialData={{
                    elements: workspaceData,
                    scrollToContent: true,
                }}
                onChange={(canvaData) => {
                    if (canvaData?.length > 0) {
                        setWorkspaceData(canvaData);
                        storeDrawings(JSON.stringify(canvaData));
                    }
                }}
                renderTopRightUI={() => (
                    <>
                        <SyncWorkspaceData
                            workspaceData={workspaceData}
                            ownerId={user?.$id}
                        />
                    </>
                )}

            />
        </>
    );
};

export default ExcalidrawWrapper;