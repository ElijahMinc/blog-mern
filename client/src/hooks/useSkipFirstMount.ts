import { useEffect, useRef } from "react"

export const useSkipFirstMount = (callback: () => any, array: any[] = []) => {
   const firstMountRef = useRef<boolean>(true)

   useEffect(() => {
      if(!firstMountRef.current){
         callback()
      }
      
      firstMountRef.current = false

   }, array)

}