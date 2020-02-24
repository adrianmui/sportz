import { useContext, createContext, useState } from 'react'

export const PlayerProfileContext = createContext({})

export function usePlayerProfileContext() {
  return useContext(PlayerProfileContext)
}

export function usePlayerProfileContextProvider() {
  const [player, setPlayer] = useState({})

  return {
    player,
    setPlayer
  }
}