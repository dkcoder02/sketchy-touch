import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { AppwriteException, ID, Models } from "appwrite";
import { account } from "@/models/client/config";

interface IAuthStore {
  session: Models.Session | null;
  jwt: string | null;
  user: Models.User<any> | null;
  hydrated: boolean;

  setHydrated(): void;
  verifySession(): Promise<void>;
  getCurrentUser(): Promise<void>;
  updateCurrentUser(userObj: object): Promise<void>;
  login(
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  createAccount(
    name: string,
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;

  deleteSession(sessionId: string): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  logout(): Promise<void>;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set) => ({
      session: null,
      jwt: null,
      user: null,
      hydrated: false,

      setHydrated() {
        set({ hydrated: true });
      },

      async verifySession() {
        const session = await account.getSession("current");
        set({ session });
      },

      async getCurrentUser() {
        const session = await account.getSession("current");
        const [user] = await Promise.all([account.get()]);
        set({ session, user, jwt: session?.providerAccessToken });
      },

      async updateCurrentUser(userObj: object) {
        set((state) => {
          for (const [key, value] of Object.entries(userObj)) {
            (state.user as any)[key] = value;
          }
        });
      },

      async login(email: string, password: string) {
        try {
          const session = await account.createEmailPasswordSession(
            email,
            password
          );
          const [user, { jwt }] = await Promise.all([
            account.get(),
            account.createJWT(),
          ]);
          set({ session, user, jwt });
          return { success: true };
        } catch (error) {
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async createAccount(name: string, email: string, password: string) {
        try {
          await account.create(ID.unique(), email, password, name);
          return { success: true };
        } catch (error) {
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },
      async deleteSession(sessionId: string) {
        try {
          await account.deleteSession(sessionId);

          return { success: true };
        } catch (error) {
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },
      async logout() {
        set({ session: null, jwt: null, user: null });
        await account.deleteSessions();
      },
    })),
    {
      name: "auth",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
