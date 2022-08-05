import { Alert } from '@mui/material'
import React, {  useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeToast, ToastInterface } from '@redux/index'
import { makeStyles } from '@mui/styles'
import { useHover } from '@hooks/useHover'
import { useSkipFirstMount } from '@hooks/useSkipFirstMount'

const useStyles = makeStyles({
   toastItem: {

      transition: '.3s all !important'

   },
   toastAnimationClosing: {
      transform: 'translateX(90%)',

   }
})

interface ToastItemProps extends ToastInterface {}

export const ToastItem: React.FC<ToastItemProps> = ({ id, status, title }) => {
   const [isClosing, setIsClosing] = useState(false)

   const alertRef = useRef<any>()
   const timeoutRef = useRef<NodeJS.Timeout>()
   
   const isHovering = useHover(alertRef)
   const dispatch = useDispatch()

   const styles = useStyles()

   useEffect(() => {

      timeoutRef.current = setTimeout(() => {
         timeoutRef.current = setTimeout(() => dispatch(removeToast(id)) , 3000)
         setIsClosing(true)
      }, 2000)

      return () => {
         clearTimeout(timeoutRef.current)
      }
   }, [])

   useSkipFirstMount(() => {
      if(isHovering) {
         setIsClosing(false)
         clearTimeout(timeoutRef.current)

      }else{
         setIsClosing(true)
         timeoutRef.current = setTimeout(() => dispatch(removeToast(id)) , 3000)
      }

   }, [isHovering])

   return (
      <Alert 
         key={id}
         ref={alertRef}
         className={`${styles.toastItem} ${isClosing ? styles.toastAnimationClosing : ''}`} 
         sx={{
            border: '1px solid #3f51b5'
         }}
         onClose={() => dispatch(removeToast(id))} 
         severity={status}
      >
         {title}
      </Alert>
      )
}