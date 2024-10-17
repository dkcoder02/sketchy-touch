import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import { AppwriteException, ID, Models, OAuthProvider } from "appwrite";
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
  oAuth2Login(provider: string): Promise<{
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
        try {
          const session = await account.getSession("current");
          set({ session });
        } catch (error) {
          console.log("verifySession => error", error);
        }
      },

      async getCurrentUser() {
        try {
          const session = await account.getSession("current");
          const [user] = await Promise.all([account.get()]);
          set({ session, user, jwt: session?.providerAccessToken });
        } catch (error) {
          console.log("getCurrentUser => error", error);
        }
      },

      async updateCurrentUser(userObj: object) {
        try {
          set((state) => {
            for (const [key, value] of Object.entries(userObj)) {
              state.user![key] = value;
            }
          });
        } catch (error) {
          console.log("updateCurrentUser => error", error);
        }
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
          console.log("login => error", error);
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
          console.log("createAccount => error", error);
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
          console.log("deleteSession => error", error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },
      async oAuth2Login(provider: string) {
        try {
          if (provider === "Google") {
            await account.createOAuth2Session(
              OAuthProvider.Google,
              "http://localhost:3000/workspace",
              "http://localhost:3000/error"
            );
          }

          if (provider === "Github") {
            await account.createOAuth2Session(
              OAuthProvider.Github,
              "http://localhost:3000/workspace",
              "http://localhost:3000/error",
              ["user"]
            );
          }
          return { success: true };
        } catch (error) {
          console.log(error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async logout() {
        try {
          set({ session: null, jwt: null, user: null });
          await account.deleteSessions();
        } catch (error) {
          console.log(error);
        }
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
