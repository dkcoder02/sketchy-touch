"use client";

import React, { useState, useEffect } from "react";
import {
  Pencil,
  Settings,
  Layers,
  Users,
  Upload,
  Menu,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/index";
import Link from "next/link";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    return () => {};
  }, [darkMode]);

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  // const currentUser = async () => {
  //   await getCurrentUser();
  // };

  // useEffect(() => {
  //   currentUser();
  // });
  return (
    <main className="flex-grow bg-base-300">
      <div className="flex h-screen bg-background dark:bg-gray-900 transition-colors duration-200">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-50 w-64 bg-card dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-4 py-6">
              <span className="text-2xl font-bold dark:text-white">
                Sketchy Board
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex-1 space-y-2 px-2">
              <Link href="/workspace">
                <Button variant="ghost" className="w-full justify-start">
                  <Pencil className="mr-2 h-4 w-4" />
                  My Workspace
                </Button>
              </Link>
              <Button variant="ghost" className="w-full justify-start">
                <Layers className="mr-2 h-4 w-4" />
                Templates
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Collaborate
              </Button>
              <Link href="/settings">
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </Link>
            </nav>
            <div className="p-4">
              <Button className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <header className="bg-card dark:bg-gray-800 shadow">
            <div className="flex items-center justify-between px-4 py-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </Button>
              <h1 className="text-2xl font-bold dark:text-white">
                My Workspace
              </h1>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                  <span className="ml-2 sr-only">
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </span>
                </Button>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </header>

          <main className="p-6">{children}</main>
        </div>
      </div>
    </main>
  );
};
export default Layout;
