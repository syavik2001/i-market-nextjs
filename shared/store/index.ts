export * from "./category";
export * from "./cart";
export * from "./locale";

export { useCartStore } from "./cart";
export { useCategoryStore } from "./category";
export { useLocaleStore } from "./locale";

// Добавляем состояние для модалки товара
export { useProductModalStore } from "./product-modal";
