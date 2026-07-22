import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem } from '../types/CartItem'
import type { Items } from '../types/Product'

// NOTE: mockProducts was referenced in the original Zustand store but not defined.
// Assuming it will be provided or fetched. For now, we'll keep the logic but it might need adjustment.
const mockProducts: Items[] = [] 

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const addToCart = (productId: number, quantity = 1) => {
    const existing = items.value.find((i) => i.productId === productId)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ productId, quantity })
    }
  }

  const removeFromCart = (productId: number) => {
    items.value = items.value.filter((i) => i.productId !== productId)
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    const item = items.value.find((i) => i.productId === productId)
    if (item) {
      item.quantity = quantity
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const cartItems = computed(() => {
    return items.value
      .map((item) => {
        const product = mockProducts.find((p) => p.id === item.productId)
        return product ? { product, quantity: item.quantity } : null
      })
      .filter((i): i is { product: Items; quantity: number } => i !== null)
  })

  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, i) => total + i.product.price * i.quantity, 0)
  })

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartItems,
    cartTotal
  }
}, {
  persist: true
})
