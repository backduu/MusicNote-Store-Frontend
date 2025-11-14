import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Items } from '../types/Product';
import type { CartItem } from '../types/CartItem';

interface CartState {
    items: CartItem[];
    addToCart: (productId: string, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getCartItems: () => Array<{ product: Items; quantity: number }>;
    getCartTotal: () => number;
  }

  
  
export const useCartStore = create<CartState>()(
    persist(
      (set, get) => ({
        items: [],
  
        addToCart: (productId, quantity = 1) =>
          set((state) => {
            const existing = state.items.find((i) => i.productId === productId);
            if (existing) {
              return {
                items: state.items.map((i) =>
                  i.productId === productId
                    ? { ...i, quantity: i.quantity + quantity }
                    : i
                ),
              };
            }
            return { items: [...state.items, { productId, quantity }] };
          }),
  
        removeFromCart: (productId) =>
          set((state) => ({
            items: state.items.filter((i) => i.productId !== productId),
          })),
  
        updateQuantity: (productId, quantity) => {
          if (quantity <= 0) {
            get().removeFromCart(productId);
            return;
          }
          set((state) => ({
            items: state.items.map((i) =>
              i.productId === productId ? { ...i, quantity } : i
            ),
          }));
        },
  
        clearCart: () => set({ items: [] }),
  
        getCartItems: () =>
          get()
            .items.map((item) => {
              const product = mockProducts.find((p) => p.id === item.productId);
              return { product: product!, quantity: item.quantity };
            })
            .filter((i) => i.product),
  
        getCartTotal: () =>
          get()
            .getCartItems()
            .reduce((total, i) => total + i.product.price * i.quantity, 0),
      }),
      {
        name: 'cart-storage', // localStorage key
      }
    )
  );
  