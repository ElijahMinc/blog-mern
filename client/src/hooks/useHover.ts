import {MutableRefObject, useEffect, useState} from 'react'


export const useHover = ( references : MutableRefObject<HTMLElement | undefined> ) => {
   const [isHovering, setHovering] = useState(false)

   const on = () => setHovering(true)
   const off = () => setHovering(false)

   useEffect(() => {
      if(!references) return
      
      const node = references.current
      if(node){
         node.addEventListener('mouseover', on)
         node.addEventListener('mouseenter', on)
         node.addEventListener('mouseleave', off)   
      }
      
      return () => {
         if(node){
            node.removeEventListener('mouseover', on)
            node.removeEventListener('mouseenter', on)
            node.removeEventListener('mouseleave', off)
         }
        
      }
   }, [references])


   return isHovering
}