import { PaletteMode } from "@mui/material";

export interface ThemedProviderProps{
   handleToggleTheme: (theme: PaletteMode) => void
   toggleTheme: PaletteMode | undefined
}