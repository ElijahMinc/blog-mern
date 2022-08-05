import { useEffect, useRef } from "react"


type UseDebounceType = (cb: (value: string) => void, time: number) 
      => () => (e: React.ChangeEvent<HTMLInputElement>) => void

export const useDebounce: UseDebounceType = (cb, time) => {
   const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

   return () => 
      (e: React.ChangeEvent<HTMLInputElement>) => {
         if(!!timeoutRef.current) clearTimeout(timeoutRef.current)

         timeoutRef.current = setTimeout(() => {
            cb(e.target.value)
         }, time)
      }
}
