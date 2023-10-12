'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import { useCallback, useState } from 'react';

import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';
import { signOut } from 'next-auth/react';

import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import { UserAvatar } from '@/components/user-avatar';

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

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    //open rent modal
    // rendModal.onOpen();
  }, [currentUser, loginModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px]
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
          md:w-3/4
          bg-white
          overflow-hidden
          right-0
          top-12
          text-sm

          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                {/* <MenuItem
                  onClick={() => router.push('/trips')}
                  label="My trips"
                />
                <MenuItem
                  onClick={() => router.push('/favorites')}
                  label="My favourites"
                />
                <MenuItem
                  onClick={() => router.push('/reservations')}
                  label="My reservation"
                />
                <MenuItem
                  onClick={() => router.push('/properties')}
                  label="My properties"
                />
                <MenuItem onClick={rendModal.onOpen} label="Airbnb my home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" /> */}
              </>
            ) : (
              <>
                {/* <MenuItem onClick={loginModal.onOpen} label="Login" />

                <MenuItem onClick={registerModal.onOpen} label="Sign up" /> */}
                <p>Login</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
