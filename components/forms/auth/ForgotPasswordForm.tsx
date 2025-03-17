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
import { auth } from "@/utils/auth";
import { toast } from "sonner";
import { getAuthError } from "@/utils/auth-errors";
import { ForgotPasswordFormData } from "@/validation/auth/ForgotPasswordSchema";
import { forgotPasswordSchema } from "@/validation/auth/ForgotPasswordSchema";
import { Loader2 as Loader } from "lucide-react";

export default function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await auth.resetPasswordRequest(data.email);

      toast.success("Reset link sent!", {
        description: "Check your email for the reset link.",
        closeButton: true,
      });
    } catch (error) {
      const errorMessage = getAuthError(error);

      toast.error("Failed to send reset link", {
        description: errorMessage.message,
        closeButton: true,
      });
    }
  };

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Enter your email address and we will send you a reset link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
            </div>
            <Button
              className="w-full"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader className="h-4 w-fit animate-spin" />
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <span> Remember your password? </span>
        <Link
          href="/login"
          className="text-primary font-semibold hover:underline"
        >
          Login
        </Link>
      </CardFooter>
    </Card>
  );
}
