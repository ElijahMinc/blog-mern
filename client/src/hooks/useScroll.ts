import { MutableRefObject, useEffect, useRef } from "react"


type useScrollType = (parentRef: MutableRefObject<HTMLElement>, childRef: MutableRefObject<HTMLElement>, callback: () => any) => void

export const useScroll: useScrollType = (parentRef, childRef, callback) => {
   const observer = useRef<IntersectionObserver | undefined>(undefined)

   useEffect(() => {
      const childrenElement = childRef.current
      const options = {
         root: parentRef.current,
         rootMargin: '0px',
         threshold: 0
     }
     observer.current = new IntersectionObserver(([target]) => {
      if (target.isIntersecting){
         console.log('intersecting')
         callback()
      }
     }, options)

       observer.current.observe(childrenElement)

     return () => {
      
      if(observer.current){
         observer.current.unobserve(childrenElement)
      }

     }
   }, [callback])
}