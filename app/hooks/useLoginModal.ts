import { create } from "zustand";

interface LoginModalStore{
    isOpen: boolean;
    Onopen: () => void;
    Onclose: () => void;
}

const useLoginModal = create<LoginModalStore>((set) => ({
    isOpen: false,
    Onopen: () => set({ isOpen: true }),
    Onclose: () => set({ isOpen: false }),
}));

export default useLoginModal;
