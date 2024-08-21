import { create } from "zustand";

interface RegisterModalStore{
    isOpen: boolean;
    Onopen: () => void;
    Onclose: () => void;
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
    isOpen: false,
    Onopen: () => set({ isOpen: true }),
    Onclose: () => set({ isOpen: false }),
}));

export default useRegisterModal;
