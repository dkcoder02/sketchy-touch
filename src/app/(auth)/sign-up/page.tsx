"use client";
import { useEffect, useState } from "react";
import { z } from "zod";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/Auth";
import { useForm } from "react-hook-form";
import { useDebounceCallback } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  Input,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/index";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const { login, createAccount, loginWithGithub } = useAuthStore();
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isUsernameChecking, setIsUsernameChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounced = useDebounceCallback(setUsername, 1000);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const handleCheckUniqueUsername = async () => {
    if (!username) return;
    setIsUsernameChecking(true);
    setUsernameMessage("");
    try {
      const response = await axios.get(
        `/api/check-username-unique?username=${username}`
      );
      setUsernameMessage(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      setUsernameMessage(
        axiosError.response?.data.message || "Error checking username"
      );
    } finally {
      setIsUsernameChecking(false);
    }
  };

  const onSubmit = async (sign_up_data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);

    try {
      const { username, email, password } = sign_up_data;
      const signUpRes = await createAccount(
        username,
        email.toString(),
        password.toString()
      );
      if (signUpRes.error) {
        toast.error( signUpRes.error?.type === "user_already_exists"
          ? "User already exists with this email or username"
          : "Something went to wrong while sign up")
        return;
      } else {
        const signInRes = await login(email.toString(), password.toString());
        if (signInRes.error) {
          toast.error(signInRes.error!.message || "Automatic login failed")
        }
      }
      
      router.push("/workspace");
      toast.success("Sign up successfully");
    } catch (error: any) {
      console.error("Error register user::", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    handleCheckUniqueUsername();
  }, [username]);

  return (
    <>
      <div>
        <Link href="/">
          <svg
            className="mx-auto h-12 w-auto text-[#ff7700]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#ff7700]">
          Sign up to Sketchy Board
        </h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 text-gray-300 space-y-6">
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      debounced(e.target.value);
                    }}
                  />
                </FormControl>
                {isUsernameChecking && <Loader2 className="animate-spin" />}
                {!isUsernameChecking && usernameMessage && (
                  <p
                    className={`text-sm ${usernameMessage === "Username is available"
                      ? "text-green-500"
                      : "text-red-500"
                      }`}
                  >
                    {usernameMessage}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Sign up
            </Button>
          </div>
        </form>
      </Form>
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-600 text-gray-300">
              Or continue with
            </span>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              disabled={isSubmitting}
            >
              <svg
                className="h-5 w-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              <span>Google</span>
            </Button>
          </div>
          <div>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-900 shadow-sm text-sm font-medium rounded-md text-gray-400 bg-gray-800 hover:bg-gray-750"
              disabled={isSubmitting}
              onClick={async () => {
                await loginWithGithub();
              }}
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>GitHub</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="text-sm text-center mt-6">
        <span className="text-gray-300">Already got an account?</span>{" "}
        <Link
          href="/sign-in"
          className="font-medium text-[#ff7700] hover:underline"
        >
          Sign in
        </Link>
      </div>
    </>
  );
}
