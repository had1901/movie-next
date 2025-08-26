/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'



// ==================================================================================
// Player film
interface MovieLink {
  link: string | null
  setLink: (src: string) => void
  reset: () => void
}
export const useMovieLink = create<MovieLink>((set) => ({
  link: '',
  setLink: (src) => set(() => ({ link: src })),
  reset: () => set(() => ({ link: '' }))
}))

// ==================================================================================
// Theme
interface LightProps {
  light: boolean
  setLight: () => void,
  
}
export const useLight = create<LightProps>((set, get) => ({
  light: false,
  setLight: () => set(() => ({ light: !get().light })),
}))

// ==================================================================================
// Message Notification
interface NotificationProps {
  show: boolean,
  status: 'pending' | 'success' | 'warning' | 'error' | string,
  message: string,
  toast: (status: string, message: string) => void,
  setStatus: (status: string) => void,
  setMessage: (message: string) => void,
  reset: () => void,
  
}
export const useNotification = create<NotificationProps>((set, get) => ({
  show: false,
  status: '',
  message: '',
  toast: (status, message) => {
    const { show } = get() // lấy state hiện tại
    if (show) {
      // ẩn toast cũ trước
      set({ show: false })
    }

    // hiển thị toast mới
    set({ show: true, status, message })

    // tự động ẩn sau 4s
    setTimeout(() => {
      // check lại state để tránh bug khi gọi toast liên tiếp
      if (get().show && get().message === message) {
        set({ show: false, status: '' })
      }
    }, 3500)
  },
  setStatus: (status) => set(() => ({ status: status })),
  setMessage: (message) => set(() => ({ message: message})),
  reset: () => set(() => ({ show: false, status: '' })),
  
}))


// ==================================================================================
// Auth
interface UserProps {
  user: any | null
  showModal: boolean,
  showMessage: boolean,
  loading: boolean,
  setUser: (info: unknown) => void,
  setShowMessage: (boo: boolean) => void,
  setShowModal: (boo: boolean) => void,
  setLoading: (boo: boolean) => void,
  
}
export const useAuth = create<UserProps>((set) => ({
  user: null,
  showMessage: false,
  showModal: false,
  loading: true,
  setUser: (info) => set(() => ({ user: info })),
  setShowMessage: (boo) => set(() => ({ showMessage: boo })),
  setShowModal: (boo) => set(() => ({ showModal: boo })),
  setLoading: (boo) => set(() => ({ loading: boo })),
}))