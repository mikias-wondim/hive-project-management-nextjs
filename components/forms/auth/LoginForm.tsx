"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import OAuthSignin from "../../OAuthSignin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema } from "@/validation/auth/LoginSchema";
import { LoginFormData } from "@/validation/auth/LoginSchema";
import { auth } from "@/utils/auth";
import { toast } from "sonner";
import { getAuthError } from "@/utils/auth-errors";
import { useRouter } from "next/navigation";
import { Loader2 as Loader } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await auth.signIn(data.email, data.password);

      toast.success("Signed in successfully!", {
        description: "Welcome back to Hive!",
        closeButton: true,
      });

      router.push("/");
    } catch (error) {
      const errorMessage = getAuthError(error);

      toast.error("Sign in failed", {
        description: errorMessage.message,
        closeButton: true,
      });
    }
  };

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Log in</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Welcome back to Hive.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/create-account"
                className="text-primary font-semibold hover:underline"
              >
                Create Account
              </Link>
            </div>
            <div className="grid w-full items-center gap-4">
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        {...field}
                        className="placeholder:text-sm placeholder:text-muted-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-baseline justify-between gap-4">
                      <FormLabel className="">Password</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        className="placeholder:text-sm placeholder:text-muted-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className="w-full"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader className="h-4 w-fit animate-spin" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <OAuthSignin />
      </CardFooter>
    </Card>
  );
}
