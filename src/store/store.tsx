import { create } from 'zustand'


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