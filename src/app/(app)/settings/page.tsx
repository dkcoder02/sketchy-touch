"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Tabs,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  TabsContent,
  TabsList,
  TabsTrigger,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/index";
import { changePasswordSchema, changeProfileSchema } from "@/schemas";
import { useAuthStore } from "@/store/Auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDrawingStore } from "@/store/Canva";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { user, logout, updateCurrentUser } = useAuthStore();
  const { storeDrawings } = useDrawingStore()
  const [isProfileSubmitting, setIsProfileSubmitting] = useState(false);
  const [isUpdatePasswordSubmitting, setIsUpdatePasswordSubmitting] =
    useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [username, setUsername] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const router = useRouter();
  const profileForm = useForm<z.infer<typeof changeProfileSchema>>({
    resolver: zodResolver(changeProfileSchema),
    defaultValues: {
      username,
      email,
    },
  });

  const passwordForm = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onProfileSubmit = async (
    values: z.infer<typeof changeProfileSchema>
  ) => {
    setIsProfileSubmitting(true);
    try {
      const { username, email } = values;
      const response = await axios.patch(
        `/api/user/update-profile/${user?.$id}`,
        {
          username,
          email,
        }
      );
      if (!response.data.success) {
        toast.error(response.data.message || "Profile update failed")
        return;
      }
      const updateUserObj = {
        name: username,
        email: email,
      };
      await updateCurrentUser(updateUserObj);

      toast.success(response.data.message)
    } catch (error: any) {
      console.error("Error Profile update::", error);
    } finally {
      setIsProfileSubmitting(false);
    }
  };

  const onPasswordSubmit = async (
    values: z.infer<typeof changePasswordSchema>
  ) => {
    setIsUpdatePasswordSubmitting(true);
    try {
      const { newPassword } = values;
      const response = await axios.patch(
        `/api/user/change-password/${user?.$id}`,
        {
          newPassword,
        }
      );
      if (!response.data.success) {
        toast.error(response.data.message || "Change password failed")
        return;
      }
      toast.success(response.data.message);

      passwordForm.reset();
    } catch (error: any) {
      console.error("Error Password update::", error);
    } finally {
      setIsUpdatePasswordSubmitting(false);
    }
  };

  const onDeleteAccount = async () => {
    setIsDeletingAccount(true);
    try {
      const response = await axios.delete(
        `/api/user/delete-my-account/${user?.$id}`
      );

      await storeDrawings(null);
      await logout();

      router.push("/");
      toast.success(response.data.message);
    } catch (error: any) {
      console.error("Error Delete account::", error);
    } finally {
      setIsDeletingAccount(false);
    }
  };

  return (
    <div className="container mx-auto p-4 w-full max-w-2xl bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-center mt-6">Settings</h1>
      <Tabs defaultValue="profile" className="space-y-4 text-4xl">
        <TabsList className="text-white">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card className="bg-gray-900 border-gray-900 ">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Manage your public profile information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...profileForm}>
                <form
                  onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={profileForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="bg-orange-500 text-white hover:bg-orange-600" disabled={isProfileSubmitting}>
                    Update profile
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="account">
          <Card className="bg-gray-900 border-gray-900">
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Manage your account settings and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your new password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm your new password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="bg-orange-500 text-white hover:bg-orange-600" disabled={isUpdatePasswordSubmitting}>
                    Change Password
                  </Button>
                </form>
              </Form>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Delete Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" disabled={isDeletingAccount}>
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-gray-900 text-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-green-600 hover:bg-green-700">Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-500 text-white hover:bg-red-600" onClick={onDeleteAccount}>
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
