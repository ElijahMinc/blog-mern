import React, { useContext, useEffect } from 'react'
import { createTheme, PaletteMode } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import { ThemedProviderProps } from "./types";
import { LocalStorageKeys, LocalStorageService } from '../../service/LocalStorageService';


const ThemedProviderContext = createContext<ThemedProviderProps>({} as ThemedProviderProps)

interface ThemedProverProps{
   children: React.ReactNode
}

export const ThemeCustomProvider = ({ children }: ThemedProverProps) => {
   const themeFromLocalStorage =  useMemo(() => LocalStorageService.get<PaletteMode>(LocalStorageKeys.THEME), [])

   const [toggleTheme, setToggleTheme] = useState<PaletteMode>(themeFromLocalStorage || 'light')

  const handleToggleTheme = (theme: PaletteMode) => {
   setToggleTheme(theme)
   LocalStorageService.set(LocalStorageKeys.THEME, theme)
  }

   const value: ThemedProviderProps = useMemo(() => ({
         handleToggleTheme,
         toggleTheme
   }), [toggleTheme])

   return <ThemedProviderContext.Provider value={value}>{children}</ThemedProviderContext.Provider>
}


export const useCustomTheme = () => useContext(ThemedProviderContext)