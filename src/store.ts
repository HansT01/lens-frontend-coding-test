import create, { StateCreator } from 'zustand'
import { SearchType } from './api'
import { SearchView } from './models/SearchView'

interface LensState {
  searchType: SearchType
  setSearchType: (type: SearchType) => void
  view: SearchView
  setView: (view: SearchView) => void
  showSearchResults: boolean
  setShowSearchResults: (show: boolean) => void
}

const store: StateCreator<LensState> = (set) => ({
  searchType: SearchType.PATENT,
  setSearchType: (type: SearchType) => set((_state) => ({ searchType: type })),
  view: SearchView.List,
  setView: (view: SearchView) => set((_state) => ({ view: view })),
  showSearchResults: false,
  setShowSearchResults: (show: boolean) => set((_state) => ({ showSearchResults: show }))
})

export const useLensStore = create<LensState>()(store)
