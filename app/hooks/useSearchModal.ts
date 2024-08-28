import { create } from "zustand";

interface SearchModalStore{
    isOpen: boolean;
    Onopen: () => void;
    Onclose: () => void;
}

const useSearchModal = create<SearchModalStore>((set) => ({
    isOpen: false,
    Onopen: () => set({ isOpen: true }),
    Onclose: () => set({ isOpen: false }),
}));

export default useSearchModal;
