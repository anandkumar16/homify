import { create } from "zustand";

interface RentModalStore{
    isOpen: boolean;
    Onopen: () => void;
    Onclose: () => void;
}

const useRentModal = create<RentModalStore>((set) => ({
    isOpen: false,
    Onopen: () => set({ isOpen: true }),
    Onclose: () => set({ isOpen: false }),
}));

export default useRentModal;
