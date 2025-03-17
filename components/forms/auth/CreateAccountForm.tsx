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
import {
  createAccountSchema,
  type CreateAccountFormData,
} from "@/validation/auth/CreateAccountSchema";
import { auth } from "@/utils/auth";
import { getAuthError } from "@/utils/auth-errors";
import { toast } from "sonner";
import { Loader2 as Loader } from "lucide-react";
import { useRouter } from "next/navigation";
export default function CreateAccountForm() {
  const router = useRouter();

  const form = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
  });

  const onSubmit = async (data: CreateAccountFormData) => {
    try {
      const { user, session } = await auth.signUp(data.email, data.password);

      console.log("User", user);
      console.log("Session", session);

      toast.success("Account created successfully!", {
        description: "Please check your email for verification",
        closeButton: true,
      });

      router.push("/login");
    } catch (error) {
      const errorMessage = getAuthError(error);

      toast.error("Account creation failed", {
        description: errorMessage.message,
        closeButton: true,
      });
    }
  };

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Create an account to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-semibold hover:underline"
              >
                Log in
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
                    <FormLabel>Password</FormLabel>
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
              <FormField
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
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
                "Create Account"
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
