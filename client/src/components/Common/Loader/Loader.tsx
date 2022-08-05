import React from 'react'
import styles from './Loader.module.css'

export const Loader: React.FC = () => {

   return (
      <div className={styles.loader}>
         <div className={styles.cube}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
         </div>
      </div>
   )
}