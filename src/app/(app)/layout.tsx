"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  LogOut,
} from "lucide-react";
import { Button, Avatar, AvatarFallback, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut } from "@/components/ui/index";
import Link from "next/link";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import { useDrawingStore } from "@/store/Canva";
import toast from "react-hot-toast";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { session, user, logout, getCurrentUser } = useAuthStore();
  const { storeDrawings } = useDrawingStore()
  const router = useRouter();

  const onLogout = async () => {
    await logout();
    await storeDrawings(null);
    toast.success("You have been successfully logout")
    router.push("/");
  };

  useEffect(() => {
    document.documentElement.classList.add("dark");
    ; (async () => {
      await getCurrentUser();
    })();
  }, []);


  useEffect(() => {
    if (!session) {
      router.push("/sign-in");
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  return (
    <main className="flex-grow bg-base-300">
      <div className="flex h-screen bg-background dark:bg-gray-900 transition-colors duration-200">
        <div className="flex-1 overflow-auto">
          <header className="bg-card dark:bg-gray-800 shadow">
            <div className="flex items-center justify-between px-4 py-6">
              <Link href="/workspace">
                <h1 className="text-2xl cursor-pointer font-bold text-gray-400">
                  Sketchy Board
                </h1>
              </Link>
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-orange-500 text-white">{user?.name}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-gray-700 text-white" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <Link href="/settings">
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          <main className="p-0">{children}</main>
        </div>
      </div>
    </main>
  );
};
export default Layout;
