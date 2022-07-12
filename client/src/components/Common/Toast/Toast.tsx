import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Alert } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { removeToast, selectToast } from '../../../redux'
import { ToastItem } from './ToastItem'

const useStyles = makeStyles({
   toastWrapper: {
      position: 'fixed',
      bottom: '50px',
      right: '20px',
      maxWidth: '300px',
      minWidth: '300px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',

   }
})

interface ToastProps {

}

export const Toast: React.FC<ToastProps> = () => {
   const { toasts } = useSelector(selectToast)

   const styles = useStyles()

   return (
      <div className={styles.toastWrapper}>
         {!!toasts.length && (
            toasts.map(({ id, status, title }) => <ToastItem key={id}  {...{id, status, title }}/>)
         )}
      </div>
      )
}