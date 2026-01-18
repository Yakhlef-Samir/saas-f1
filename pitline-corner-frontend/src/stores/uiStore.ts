import { create } from 'zustand'

export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

export interface Modal {
  id: string
  type: 'upgrade' | 'error' | 'confirm' | 'info'
  title: string
  message?: string
  data?: any
}

interface UIState {
  // Toast notifications
  toasts: Toast[]
  
  // Modal management
  activeModal: Modal | null
  
  // UI states
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  
  // Actions
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  clearToasts: () => void
  
  openModal: (modal: Omit<Modal, 'id'>) => void
  closeModal: () => void
  
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  
  setTheme: (theme: 'light' | 'dark') => void
}

export const useUIStore = create<UIState>((set, get) => ({
  toasts: [],
  activeModal: null,
  sidebarOpen: false,
  theme: 'light',

  addToast: (toast: Omit<Toast, 'id'>): void => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = {
      id,
      duration: 5000, // Default 5 seconds
      ...toast,
    }
    
    set((state) => ({
      toasts: [...state.toasts, newToast]
    }))
    
    // Auto-remove after duration
    setTimeout(() => {
      get().removeToast(id)
    }, newToast.duration)
  },

  removeToast: (id: string): void => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    }))
  },

  clearToasts: (): void => {
    set({ toasts: [] })
  },

  openModal: (modal: Omit<Modal, 'id'>): void => {
    const id = Math.random().toString(36).substr(2, 9)
    set({
      activeModal: { id, ...modal }
    })
  },

  closeModal: (): void => {
    set({ activeModal: null })
  },

  toggleSidebar: (): void => {
    set((state) => ({
      sidebarOpen: !state.sidebarOpen
    }))
  },

  setSidebarOpen: (open: boolean): void => {
    set({ sidebarOpen: open })
  },

  setTheme: (theme: 'light' | 'dark'): void => {
    set({ theme })
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  },
}))

// Selectors (REQUIRED by project-context.md)
export const selectToasts = (state: UIState) => state.toasts
export const selectActiveModal = (state: UIState) => state.activeModal
export const selectSidebarOpen = (state: UIState) => state.sidebarOpen
export const selectTheme = (state: UIState) => state.theme
