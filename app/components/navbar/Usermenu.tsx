"use client";

import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UsermenuProps {
  currentUser?: SafeUser | null;
}

const Usermenu: React.FC<UsermenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const LoginModal = useLoginModal();
  const RentModal = useRentModal();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return LoginModal.Onopen();
    }
    RentModal.Onopen();
  }, [currentUser, LoginModal,RentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className=" hidden md:block text-sm font-semibold py-3 px-4 rounded-full transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 border-[1px] flex flex-row items-center rounded-full transition cursor-pointer"
        >
          <AiOutlineMenu />
          <div>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute text-sm top-14 right-0 w-[50vw] sm:w-[40vw] md:w-[15vw] bg-white rounded-lg shadow-md z-50">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem Onclick={() => router.push("/trips")} label="my trips" />
                <MenuItem Onclick={() => router.push("/favorites")} label="my favourites" />
                <MenuItem Onclick={() => router.push("/reservations")} label="my reservations" />
                <MenuItem Onclick={() =>  router.push("/properties")} label="my properties" />
                <MenuItem Onclick={RentModal.Onopen} label="airbnb my home" />
                <hr />
                <MenuItem Onclick={() => signOut()} label="logout" />
              </>
            ) : (
              <>
                <MenuItem Onclick={LoginModal.Onopen} label="login" />
                <MenuItem Onclick={registerModal.Onopen} label="signup" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Usermenu;
