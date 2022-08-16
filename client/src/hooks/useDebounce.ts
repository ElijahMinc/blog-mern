import {  useRef } from "react"


type UseDebounceType = (cb: (value: string | undefined) => void, time: number) 
      => () => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => void

export const useDebounce: UseDebounceType = (cb, time) => {
   const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

   return () => 
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
         if(!!timeoutRef.current) clearTimeout(timeoutRef.current)

         timeoutRef.current = setTimeout(() => {
            const value = e ? e.target.value : undefined
            cb(value)
         }, time)
      }
}
