import { create } from "zustand";
import { ProductWithRelations } from "@/@types/prisma";

interface ProductModalState {
	isOpen: boolean;
	product: ProductWithRelations | null;
	openModal: (product: ProductWithRelations) => void;
	closeModal: () => void;
}

export const useProductModalStore = create<ProductModalState>((set) => ({
	isOpen: false,
	product: null,
	openModal: (product) => set({ isOpen: true, product }),
	closeModal: () => set({ isOpen: false, product: null }),
}));
