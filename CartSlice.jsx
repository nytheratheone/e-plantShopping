// CartSlice.jsx
// Redux Toolkit slice for Paradise Nursery shopping cart state management

import { createSlice, configureStore } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],          // Array of { ...plant, quantity }
    addedIds: [],       // Track which plant IDs have been added (for disabling buttons)
  },
  reducers: {
    // Add a plant to the cart — if already present, increment quantity
    addItem(state, action) {
      const plant = action.payload
      const existing = state.items.find(item => item.id === plant.id)

      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...plant, quantity: 1 })
        state.addedIds.push(plant.id)
      }
    },

    // Remove a plant entirely from the cart
    removeItem(state, action) {
      const id = action.payload
      state.items = state.items.filter(item => item.id !== id)
      state.addedIds = state.addedIds.filter(addedId => addedId !== id)
    },

    // Increase quantity of a specific cart item by 1
    increaseQuantity(state, action) {
      const id = action.payload
      const item = state.items.find(item => item.id === id)
      if (item) item.quantity += 1
    },

    // Decrease quantity — removes item if quantity would reach 0
    decreaseQuantity(state, action) {
      const id = action.payload
      const item = state.items.find(item => item.id === id)
      if (!item) return

      if (item.quantity <= 1) {
        state.items = state.items.filter(i => i.id !== id)
        state.addedIds = state.addedIds.filter(addedId => addedId !== id)
      } else {
        item.quantity -= 1
      }
    },

    // Clear all items from the cart
    clearCart(state) {
      state.items = []
      state.addedIds = []
    },
  },
})

export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions

// Selectors
export const selectCartItems = state => state.cart.items
export const selectAddedIds = state => state.cart.addedIds

export const selectTotalItems = state =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0)

export const selectTotalCost = state =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

// Configure and export the Redux store
export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
})

export default cartSlice.reducer
