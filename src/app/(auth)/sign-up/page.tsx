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
  const { login, createAccount } = useAuthStore();
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
    } catch (error: any) {
      const axiosError = error as AxiosError<ApiResponse>;
      setUsernameMessage(
        axiosError.response?.data.message || "Error checking username"
      );
      toast.error(axiosError.response?.data.message || "Error checking username")
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
        toast.error(signUpRes.error?.type === "user_already_exists"
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
      toast.error("Something went to wrong while sign up")
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
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Sign up
            </Button>
          </div>
        </form>
      </Form>
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
