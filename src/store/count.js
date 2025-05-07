import { create } from 'zustand'

// Create and export the store hook
const useBearStore = create((set) => ({
  // State
  count: 0,
  
  // Actions
  increasePopulation: () => set((state) => ({ 
    count: state.count + 1 
  })),
  
  removeAllBears: () => set({ count: 0 }),
}))

export default useBearStore
