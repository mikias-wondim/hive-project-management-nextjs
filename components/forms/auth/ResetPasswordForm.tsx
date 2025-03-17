"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { auth, type AuthError } from "@/utils/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 as Loader } from "lucide-react";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/validation/auth/ResetPasswordForm";

export function ResetPasswordForm() {
  const router = useRouter();
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await auth.resetPassword(data.password);

      toast.success("Password reset successfully!", {
        description: "You can now log in with your new password.",
        closeButton: true,
      });

      router.push("/login");
    } catch (error) {
      const authError = error as AuthError;

      toast.error("Password reset failed", {
        description: authError.message,
        closeButton: true,
      });
    }
  };

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-2xl">Reset password</CardTitle>
        <CardDescription className="text-xs">
          Enter your new password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your new password"
                        {...field}
                        className="placeholder:text-sm placeholder:text-muted-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your new password"
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
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Reset password"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
