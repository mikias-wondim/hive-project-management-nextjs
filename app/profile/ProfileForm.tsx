'use client';

import { ProfilePhotoUploader } from '@/components/ProfilePhotoUploader';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { primaryBtnStyles } from '../commonStyles';

const profileFormSchema = z.object({
  name: z
    .string({
      required_error: 'Name must be provided.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  email: z
    .string({
      required_error: 'Email address must be provided.',
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        label: z.string(),
        value: z.string().url({ message: 'Please enter a valid URL.' }),
      })
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  bio: '',
  urls: [{ value: '', label: 'label' }],
};

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'urls',
    control: form.control,
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="w-[24rem] md:w-[36rem]  mx-auto px-6 pb-4">
      <h1 className="text-2xl py-6">Profile</h1>
      <ProfilePhotoUploader />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@projex.com" {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            {fields.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`urls.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && 'sr-only')}>
                      URLs
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && 'sr-only')}>
                      Add links to your website, blog, or social media profiles.
                    </FormDescription>
                    <div className="flex gap-1">
                      <FormControl className="w-[100px]">
                        <Input {...field} placeholder="Platform" />
                      </FormControl>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="https://example.com/username"
                        />
                      </FormControl>
                      {fields.length > 1 && (
                        <Button
                          variant="ghost"
                          className="p-2 text-red-500 hover:bg-red-100 hover:text-red-600 dark:text-red-800 dark:hover:bg-red-900 dark:hover:text-red-300"
                          onClick={() => remove(index)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ value: '', label: '' })}
            >
              Add URL
            </Button>
          </div>
          <Button type="submit" className={cn(primaryBtnStyles)}>
            Update profile
          </Button>
        </form>
      </Form>
    </div>
  );
}
