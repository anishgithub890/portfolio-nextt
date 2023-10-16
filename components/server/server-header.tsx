'use client';

import { LogIn, LogOut, PlusCircle } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useModal } from '@/hooks/use-modal-store';
import { SafeUser } from '@/app/types';
import { UserAvatar } from '../user-avatar';
import { Separator } from '../ui/separator';
import { signOut } from 'next-auth/react';

interface ServerHeaderProps {
  currentUser?: SafeUser | null;
}

export const ServerHeader: React.FC<ServerHeaderProps> = ({ currentUser }) => {
  const { onOpen } = useModal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-md font-semibold px-3 flex items-center h-12 transition">
          <UserAvatar src={currentUser?.image} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {currentUser?.role == 'user' ? (
          <>
            <DropdownMenuItem
              onClick={() => onOpen('login')}
              className="px-3 py-2 text-sm cursor-pointer"
            >
              User
              <LogIn className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onOpen('createUser')}
              className="px-3 py-2 text-sm cursor-pointer"
            >
              Sign Up
              <PlusCircle className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem
              onClick={() => signOut()}
              className="px-3 py-2 text-sm cursor-pointer"
            >
              Logout
              <LogOut className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          </>
        ) : currentUser?.role == 'admin' ? (
          <>
            <DropdownMenuItem
              onClick={() => onOpen('login')}
              className="px-3 py-2 text-sm cursor-pointer"
            >
              Dashboard
              <LogIn className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onOpen('createUser')}
              className="px-3 py-2 text-sm cursor-pointer"
            >
              Sign Up
              <PlusCircle className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem
              onClick={() => signOut()}
              className="px-3 py-2 text-sm cursor-pointer"
            >
              Logout
              <LogOut className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem
              onClick={() => onOpen('login')}
              className="px-3 py-2 text-sm cursor-pointer"
            >
              Log in
              <LogIn className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onOpen('createUser')}
              className="px-3 py-2 text-sm cursor-pointer"
            >
              Sign Up
              <PlusCircle className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
