"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Auth";
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
import { signInSchema } from "@/schemas/signInSchema";
import toast from "react-hot-toast";

export default function SignInPage() {
  const { login } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    try {
      const { email, password } = data;
      const signInRes = await login(email.toString(), password.toString());
      if (signInRes?.error) {
        toast.error(signInRes.error.message || 'Login failed')
        return;
      }

      router.push("/workspace");
      toast.success('Login successfully')
    } catch (error: any) {
      toast.error('Something went to wrong while login')
    } finally {
      setIsSubmitting(false);
    }
  };

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
          Sign in to Sketchy Board
        </h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 text-gray-300 space-y-6">
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
              Sign in
            </Button>
          </div>
        </form>
      </Form>
      <div className="text-sm text-center mt-6">
        <span className="text-gray-300">Don&#39;t have an account?</span>{" "}
        <Link
          href="/sign-up"
          className="font-medium text-[#ff7700] hover:underline"
        >
          Sign up here
        </Link>
      </div>
    </>
  );
}
