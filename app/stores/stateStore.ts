import create from 'zustand'

interface ContactStore {
    isVisible: boolean
    toggle: () => void
}

export const ContactStore = create<ContactStore>(set => ({
  isVisible: false,
  toggle: () => set((state) => ({ isVisible: !state.isVisible }))
}))



interface ContactGroupStore {
  isVisible: boolean
  toggle: () => void
}

export const ContactGroupStore = create<ContactGroupStore>(set => ({
isVisible: false,
toggle: () => set((state) => ({ isVisible: !state.isVisible }))
}))
