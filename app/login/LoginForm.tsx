'use client';

import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export function LoginForm() {
  return (
    <Card className="w-96">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Log in</CardTitle>
        <CardDescription className="text-xs">Welcome back</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          Don&apos;t have an account?{' '}
          <Link href="/create-account" className="text-blue-500">
            Create account
          </Link>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>

        <Button className="w-full">Create account</Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="grid grid-cols-2 gap-6 w-full">
          <Button variant="outline">
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Github
          </Button>
          <Button variant="outline">
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
