'use client';

import { LayoutDashboard, LogIn, LogOut, PlusCircle } from 'lucide-react';

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
import { GiSkills } from 'react-icons/gi';
import { AiOutlineProfile } from 'react-icons/ai';

interface ServerHeaderProps {
  currentUser?: SafeUser | null;
}

export const ServerHeader: React.FC<ServerHeaderProps> = ({ currentUser }) => {
  const { onOpen } = useModal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-md font-semibold px-3 flex items-center h-12 transition">
          <div
            className="
              p-[0.35rem]
              border-[1px]
              border-zinc-[1px]
              dark:border-zinc-700
              dark:bg-zinc-900
              flex
              flex-row
              items-center
              gap-3
              rounded-md
              cursor-pointer
              dark:hover:bg-zinc-800
              hover:bg-zinc-100  
              transition
            "
          >
            <UserAvatar src={currentUser?.image} />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {currentUser?.role == 'user' ? (
          <>
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => onOpen('editUser')}
            >
              <AiOutlineProfile className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => signOut()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </>
        ) : currentUser?.role == 'admin' ? (
          <>
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => {}}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => onOpen('editUser')}
            >
              <AiOutlineProfile className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => {}}
            >
              <GiSkills className="mr-2 h-4 w-4" />
              <span>Create Skill</span>
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => signOut()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
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
