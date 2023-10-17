'use client';

import qs from 'query-string';
import axios from 'axios';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Separator } from '../ui/separator';
import CustomeButton from '../custome-button';
import { useModal } from '@/hooks/use-modal-store';
import { useEffect } from 'react';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required.',
  }),
  email: z.string().min(1, {
    message: 'Email is required.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
});

export const EditProfileModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const params = useParams();

  const { onOpen } = useModal();

  const isModalOpen = isOpen && type === 'editUser';
  const { user } = data;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue('name', user.name);
      form.setValue('email', user.email);
      // form.setValue('password', user.password);
    }
  }, [user, form]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/register/${user?.id}`,
        query: {
          userId: user?.id,
        },
      });
      await axios.post(url, values);

      toast.success('Profile Updated!');
      form.reset();
      router.refresh();
      onClose();
      // onOpen('login');
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold pb-2">
            Edit Profile
          </DialogTitle>
          <Separator />
          <DialogTitle className="pt-4">Welcome to your profile</DialogTitle>
          <DialogDescription>Update an account!</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pb-4">
                <DialogFooter>
                  <CustomeButton label="Update" disabled={isLoading} />
                </DialogFooter>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
