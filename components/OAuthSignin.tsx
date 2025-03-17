"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Suspense } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { auth } from "@/utils/auth"; // Assuming you have an auth utility
import { toast } from "sonner";
import { getAuthError } from "@/utils/auth-errors";
import { useSearchParams } from "next/navigation";
import { Loader2 as Loader } from "lucide-react";
interface OAuthSigninProps {
  redirectUrl?: string;
}

function OAuthButtons({ redirectUrl }: OAuthSigninProps) {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const nextUrl = redirectUrl || searchParams.get("next") || "/projects";

  async function handleOAuthSignIn(provider: "github" | "google") {
    setLoading(true);
    try {
      // Initiate the OAuth sign-in process
      await auth.signInWithOAuth(provider, nextUrl);

      toast.success("Signed in successfully!", {
        description: `Welcome back! You have signed in with ${provider}.`,
        closeButton: true,
      });
    } catch (error) {
      const { message } = getAuthError(error);

      toast.error("Sign in failed", {
        description: message,
        closeButton: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        className="w-full cursor-pointer"
        onClick={() => handleOAuthSignIn("github")}
        disabled={loading}
      >
        {loading ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <FaGithub className="w-4 h-4 mr-2" />
        )}
        Github
      </Button>
      <Button
        variant="outline"
        className="w-full cursor-pointer"
        onClick={() => handleOAuthSignIn("google")}
        disabled={loading}
      >
        {loading ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <FaGoogle className="w-4 h-4 mr-2" />
        )}
        Google
      </Button>
    </div>
  );
}

export default function OAuthSignin() {
  return (
    <div className="w-full">
      <div className="realtive space-y-2 mb-4">
        <div className="relative flex items-center justify-center">
          <span
            className="flex-grow border-t border-border"
            aria-hidden="true"
          ></span>
          <span className="bg-background px-2 text-sm text-muted-foreground">
            Or continue with
          </span>
          <span
            className="flex-grow border-t border-border"
            aria-hidden="true"
          ></span>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full cursor-pointer">
              <FaGithub className="w-4 h-4 mr-2" />
              Github
            </Button>
            <Button variant="outline" className="w-full cursor-pointer">
              <FaGoogle className="w-4 h-4 mr-2" />
              Google
            </Button>
          </div>
        }
      >
        <OAuthButtons />
      </Suspense>
    </div>
  );
}
