import React from 'react'
import styles from './Loader.module.css'

interface LoaderProps {

}

export const Loader: React.FC<LoaderProps> = () => {

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