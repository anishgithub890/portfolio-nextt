'use client';

import { useCallback, useState } from 'react';
import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';
import { signOut } from 'next-auth/react';

import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import { UserAvatar } from '@/components/user-avatar';
import MenuItem from './menu-item';
import { Separator } from '../ui/separator';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  //   const rendModal = useRentModal();
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={toggleOpen}
          className="
          p-[0.35rem]
          border-[1px]
          dark:border-zinc-600
          border-neutral-100
          flex
          flex-row
          items-center
          gap-3
          rounded-md
          cursor-pointer
          hover:bg-neutral-200 
          transition
        "
        >
          <UserAvatar src={currentUser?.image} />
        </div>
      </div>
      {!isOpen && (
        <div
          className="
          absolute
          rounded-xl
          shadow-md
          w-[40vw]
          md:w-[20vw]
          bg-white
          overflow-hidden
          right-0
          top-11
          text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser?.role == 'user' ? (
              <>
                <MenuItem onClick={() => {}} label="Your profile" />
                <MenuItem onClick={() => {}} label="Change language" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : currentUser?.role == 'admin' ? (
              <>
                <MenuItem
                  onClick={() => router.push('/dashboard')}
                  label="Dashboard"
                />
                <MenuItem onClick={() => {}} label="Add Project" />
                <MenuItem onClick={() => {}} label="Add Skill" />
                <MenuItem onClick={() => {}} label="Add Experience" />
                <MenuItem onClick={() => {}} label="Add Testimonial" />
                <MenuItem onClick={() => {}} label="Your profile" />
                <MenuItem onClick={() => {}} label="Change language" />
                <Separator />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />

                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
