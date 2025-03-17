"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight, Kanban, Users, ChartPie, ChartBar } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

const features = [
  {
    icon: <Kanban />,
    title: "Intuitive Kanban Board",
    description: "Manage your projects with ease",
  },
  {
    icon: <Users />,
    title: "Real-Time Collaboration",
    description: "Collaborate with your team effectively",
  },
  {
    icon: <ChartBar />,
    title: "Custom Workflow",
    description: "Create your own workflow",
  },
  {
    icon: <ChartPie />,
    title: "Advanced Analytics",
    description: "Track your progress with ease",
  },
];

export default function LandingPage() {
  const [user, setUser] = useState<User | null>(null);

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return (
    <div className="bg-gradient-to-b from-background dark:from-background to-background/95">
      {/* Hero Section */}
      <div className="container pt-32 pb-20  mx-auto">
        {/* Content */}
        <div className="max-w-[800px] mx-auto text-center space-y-8 mb-20">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Structure and Organize your tasks,
              <br />
              <span className="text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Manage your projects with ease
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
              Goes beyond traditional project management tools to provide a more
              intuitive and flexible way to manage your projects.
            </p>
          </div>

          <div className="mx-5 flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button size="lg" asChild>
                <Link href="/projects">
                  View Projects <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link href="/create-account">
                    Get Started <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
              </>
            )}
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-2 gap-4 justify-center pt-4 max-w-[600px] mx-auto">
            {features.map((feature) => (
              <div key={feature.title} className="text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2">
                  {feature.icon}
                  <h2 className="text-lg font-semibold">{feature.title}</h2>
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Hero Image */}
          <div className="relative p-2 w-full max-w-[1200px] sm:mx-auto mt-20">
            <div className="relative">
              <div className="relative bg-background/95 backdrop-blur rounded-lg shadow-2xl">
                <Image
                  src={"/images/landing-page-dark.png"}
                  alt="Landing Page Image"
                  width={1200}
                  height={1200}
                  className="hidden dark:block rounded-lg w-full"
                />
                <Image
                  src={"/images/landing-page-light.png"}
                  alt="Landing Page Image"
                  width={1200}
                  height={1200}
                  className="block dark:hidden rounded-lg w-full"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
            </div>

            {/* Background Gradient Effect */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
            <div className="fixed inset-0 -z-10 h-full bg-background ">
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-tr from-primary/10 to-background" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
