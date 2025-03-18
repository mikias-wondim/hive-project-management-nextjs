"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  KanbanIcon,
  UsersIcon,
  WorkflowIcon,
  LineChartIcon as TrackIcon,
  TagIcon as LabelsIcon,
  CheckCircleIcon as StatusIcon,
  FlagIcon as PriorityIcon,
  ClipboardListIcon as TaskManagementIcon,
  LockIcon as AccessControlIcon,
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";

const features: {
  title: string;
  icon: React.ReactNode;
  description: string;
}[] = [
  {
    title: "Intuitive Kanban boards",
    icon: <KanbanIcon className="h-5 w-5 text-primary" />,
    description: "Easily visualize and manage your projects",
  },
  {
    title: "Custom workflows",
    icon: <WorkflowIcon className="h-5 w-5 text-primary" />,
    description: "Create and manage custom workflows",
  },
  {
    title: "Real-time collaboration",
    icon: <UsersIcon className="h-5 w-5 text-primary" />,
    description: "Collaborate with your team in real-time",
  },
  {
    title: "Advanced task tracking",
    icon: <TrackIcon className="h-5 w-5 text-primary" />,
    description: "Track your tasks and projects",
  },
];

const LandingPage: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <div className="container pt-32 pb-20">
        {/* Content */}
        <div className="max-w-[800px] mx-auto text-center space-y-8 mb-20">
          <div className="space-y-6">
            <h1 className="font-aboreto text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Structure and Organize your Projects
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                One task at a time
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
              Goes beyond basic to-do lists, offering intuitive tools for
              prioritizing and managing projects and tasks with ease.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button size="lg" asChild>
                <Link href="/projects" className="gap-2">
                  View Projects <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link href="/create-account" className="gap-2">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
              </>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-4 max-w-[600px] mx-auto">
            {features.map((feature) => (
              <div
                key={feature.title + feature.description}
                className="flex flex-col items-center gap-2"
              >
                <div className="text-lg font-semibold flex items-center gap-2">
                  {feature.icon}
                  <span className="text-muted-foreground">{feature.title}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* App Screenshot with Fade Effect */}
        <div className="relative w-full max-w-[1200px] mx-auto mt-20">
          <div className="relative">
            <div className="relative bg-background/95 backdrop-blur rounded-lg shadow-2xl">
              <Image
                src={
                  resolvedTheme === "dark"
                    ? "/projex-dark.png"
                    : "/projex-light.png"
                }
                alt="App preview"
                width={1824}
                height={1080}
                className="rounded-lg w-full"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Gradient Effect */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-primary/5 to-background"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[40rem] w-[40rem] rounded-full bg-primary/5 blur-3xl"></div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h2 className="font-aboreto text-2xl font-bold text-center text-gray-700 dark:text-gray-300">
          Pricing
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-around mt-6">
          <div className="bg-white dark:bg-gray-800 px-6 py-12 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 space-y-5">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Basic Plan
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              <span className="text-4xl text-muted-foreground dark:text-white/80 font-bold">
                $
              </span>
              <span className="text-6xl text-gray-500 dark:text-gray-400 font-bold ">
                10
              </span>
              <span className="text-2xl text-muted-foreground dark:text-white/80">
                /month
              </span>
            </p>
            <p className="text-xl text-muted-foreground/90 dark:text-white/90 line-through">
              $12/month
            </p>
          </div>
          <div className="relative bg-gradient-to-r from-primary to-primary/60 px-6 py-12 rounded-lg shadow-lg border border-gray-500 dark:border-gray-100 space-y-5">
            <h3 className="text-xl font-semibold text-white dark:text-black">
              Pro Plan
            </h3>
            <p className="text-primary dark:text-black mt-2">
              <span className="text-4xl text-muted font-bold">$</span>
              <span className="text-6xl text-white/90 dark:text-black/90  font-bold ">
                20
              </span>
              <span className="text-2xl text-muted">/month</span>
            </p>
            <p className="text-xl text-muted/90 dark:text-muted-foreground line-through">
              $25/month
            </p>
            <span className="absolute -top-8 right-2 text-xs text-white dark:text-black bg-primary/80 px-2 py-1 rounded-full">
              Most Popular
            </span>
          </div>
          <div className="bg-white dark:bg-gray-800 px-6 py-12 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 space-y-5">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Enterprise Plan
            </h3>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              <div className="text-4xl text-gray-500 dark:text-gray-400 font-bold ">
                Contact us
              </div>
              <div className="text-2xl text-muted-foreground dark:text-white/80">
                Customized Pricing
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-100 dark:bg-gray-800 py-8 px-4">
        <h2 className="font-aboreto text-2xl font-bold text-center text-gray-700 dark:text-gray-300">
          FAQ
        </h2>
        <div className="flex flex-col items-center mt-4">
          <div className="text-center max-w-[600px]">
            <h3 className="text-lg text-gray-600 dark:text-gray-400">
              What is this service about?
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This service helps you manage projects efficiently.
            </p>
          </div>
          <div className="text-center max-w-[600px] mt-4">
            <h3 className="text-lg text-gray-600 dark:text-gray-400">
              How can I sign up?
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You can sign up by clicking the &apos;Get Started&apos; button
              above.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-8 px-4">
        <h2 className="font-aboreto text-2xl font-bold text-center text-gray-700 dark:text-gray-300">
          Testimonials
        </h2>
        <div className="mt-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 justify-around ">
          <div className="relative bg-gradient-to-r from-muted-foreground/30 to-muted/30 p-6 rounded-lg shadow-lg">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full flex justify-center items-center">
              <div className="">
                <Image
                  src={
                    "https://images.unsplash.com/photo-1557862921-37829c790f19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfDB8MHx8fDI%3D"
                  }
                  alt={"User A"}
                  width={100}
                  height={100}
                  className="rounded-full object-cover h-20 w-20"
                />
              </div>
            </div>
            <div className="mt-10">
              <p className="lg:text-lg ">
                &quot;Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Molestias quam alias saepe, corrupti, nesciunt, quo id et nam
                voluptatum dolores libero adipisci.&quot;
              </p>
              <span className="text-xs ">- User A</span>
            </div>
          </div>

          <div className="relative bg-gradient-to-r from-muted-foreground/30 to-muted/30 p-6 rounded-lg shadow-lg">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full flex justify-center items-center">
              <div className="">
                <Image
                  src={
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
                  }
                  alt={"User A"}
                  width={100}
                  height={100}
                  className="rounded-full object-cover h-20 w-20"
                />
              </div>
            </div>
            <div className="mt-10">
              <p className="lg:text-lg">
                &quot;Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Impedit sed a accusantium itaque voluptatum nemo voluptas veniam
                quae corporis illum.&quot;
              </p>
              <span className="text-xs">- User A</span>
            </div>
          </div>

          <div className="relative bg-gradient-to-r from-muted-foreground/30 to-muted/30 p-6 rounded-lg shadow-lg">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full flex justify-center items-center">
              <div className="relative">
                <Image
                  src={
                    "https://images.unsplash.com/photo-1608391957733-08caeb461b57?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcnNvbiUyMGltYWdlfGVufDB8MHwwfHx8Mg%3D%3D"
                  }
                  alt={"User A"}
                  width={100}
                  height={100}
                  className="bg-gradient-to-b from-transparent to-background"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
              </div>
            </div>
            <div className="mt-10">
              <p className="lg:text-lg">
                &quot; Enim tenetur soluta deserunt illum iste qui, at quaerat
                eaque!&quot;
              </p>
              <span className="text-xs">- User A</span>
            </div>
          </div>

          <div className="relative bg-gradient-to-r from-muted-foreground/30 to-muted/30 p-6 rounded-lg shadow-lg">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full flex justify-center items-center">
              <div className="">
                <Image
                  src={
                    "https://images.unsplash.com/photo-1613937054494-63ee8ee19359?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNhdWNhc2lhbiUyMHBlcnNvbnxlbnwwfDB8MHx8fDI%3D"
                  }
                  alt={"User A"}
                  width={100}
                  height={100}
                  className="rounded-full object-cover h-20 w-20"
                />
              </div>
            </div>
            <div className="mt-10">
              <p className="lg:text-lg">
                &quot;This tool has transformed our workflow!&quot;
              </p>
              <span className="text-xs">- User A</span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-8 px-4">
        <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-300">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-around mt-6">
          <div className="border border-white dark:border-gray-800 p-6 rounded-lg shadow-lg">
            <Image
              src={"/logo.png"}
              alt={"Mikias Wondim"}
              width={1000}
              height={1000}
              className="aspect-square object-cover h-fit w-fit dark:invert"
            />
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Mikias Wondim
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Co-Founder
              </p>
            </div>
          </div>
          <div className="border border-white dark:border-gray-800 p-6 rounded-lg shadow-lg">
            <Image
              src={"/logo.png"}
              alt={"Enyew Anberbir"}
              width={1000}
              height={1000}
              className="aspect-square object-cover h-fit w-fit dark:invert"
            />
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Enyew Anberbir
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Co-Founder
              </p>
            </div>
          </div>
          <div className="border border-white dark:border-gray-800 p-6 rounded-lg shadow-lg">
            <Image
              src={"/logo.png"}
              alt={"Carol White"}
              width={1000}
              height={1000}
              className="aspect-square object-cover h-fit w-fit dark:invert"
            />
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Carol White
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">COO</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog/News Section
      <div className="py-8 px-4">
        <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-300">
          Latest News
        </h2>
        <div className="flex justify-around mt-6">
          <div className="border-white dark:border-gray-800 p-6 rounded-border lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              New Feature Release
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Check out our latest feature...
            </p>
          </div>
          <div className dark:invert="border-white dark:border-gray-800 p-6 rounded-border lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Project Management Tips
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Improve your workflow with these tips...
            </p>
          </div>
          <div className dark:invert="border-white dark:border-gray-800 border p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Upcoming Webinar
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Join us for an insightful session...
            </p>
          </div>
        </div dark:invert>
      </div> */}

      {/* Call to Action Section */}
      <div className="py-8 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
          Ready to Get Started?
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Join thousands of users who are managing their projects more
          effectively.
        </p>
        <br />
        <Link
          href="/create-account"
          className="mt-4 px-6 py-2 bg-gradient-to-r from-primary to-primary/60 text-white dark:text-black rounded-md"
        >
          Sign Up Now
        </Link>
      </div>

      {/* Contact Section */}
      <div className="bg-muted/70 dark:bg-gray-900/50 p-10 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
          Contact Us
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Have questions? Reach out to us at{" "}
          <a href="mailto:support@example.com" className="text-blue-600">
            support@qimemsolutions.vercel.app
          </a>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
