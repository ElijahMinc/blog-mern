import { MutableRefObject, useEffect, useRef } from "react"


type useScrollType = (parentRef: MutableRefObject<HTMLDivElement | null>, childRef: MutableRefObject<HTMLDivElement | null>, callback: () => void,  options?: IntersectionObserverInit) => IntersectionObserver | undefined

export const useScroll: useScrollType = (parentRef, childRef, callback, options?: IntersectionObserverInit) => {
   const observer = useRef<IntersectionObserver | undefined>(undefined)

   useEffect(() => {
      
      const parentElement = parentRef?.current || null
      const childrenElement = childRef?.current || null

      if(!parentElement && !childrenElement) return
  

      const rootOptions = {
         ...options, 
     }
     observer.current = new IntersectionObserver(([target], observer) => {
      if (target.isIntersecting){
         callback()
      }
     }, rootOptions)

       observer.current.observe(childrenElement!)

     return () => {
      
      if(observer.current){
         observer.current.unobserve(childrenElement!)
      }

     }
   }, [callback])


   return observer.current
}