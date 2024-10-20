import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

interface DrawingStore {
  drawingData: any | null;
  hydrated: boolean;

  setHydrated(): void;
  storeDrawings(drawingData: any | null): Promise<{
    success: boolean;
  }>;
}

export const useDrawingStore = create<DrawingStore>()(
  persist(
    immer((set) => ({
      drawingData: null,
      hydrated: false,

      setHydrated() {
        set({ hydrated: true });
      },

      async storeDrawings(drawingData: any | null) {
        if (!drawingData) {
          set({ drawingData: null })
          return {
            success: true,
          };
        }
        set((state) => {
          state.drawingData = drawingData;
        });
        return {
          success: true,
        };
      },
    })),
    {
      name: "user-drawing",
      onRehydrateStorage() {
        return (state, error) => {
          if (state && !error) {
            state.setHydrated();
          }
        };
      },
    }
  )
);
