import { Grid, Typography } from '@mui/material'
import React from 'react'
import { Comment } from '../../../redux'
import { makeStyles } from '@mui/styles'
import notFoundImage from '../../../static/notFoundImage.png'
import moment from 'moment'
import { blue } from '@mui/material/colors'
// type CommentsItemProps = [P in keyof typeof Comment]: Comment[P]

const useStyles = makeStyles({
   commentImageWrapper: {
      width: '30px',
      height: '30px',
      overflow: 'hidden',
      borderRadius: '50%'
   },
   commentImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
   },
   commentContainer: {
      display: 'flex',
      flexDirection: 'column',
      borderBottom: `1px solid ${blue[800]}`,
      paddingBottom: '10px',
      "& .MuiGrid-item": {
         padding: '0'

      }
   },
   comment__author: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItem: 'center',
      gap: '5px'
   },
   comment__date: {

   },
   comment__text: {
      'wordBreak': 'break-all'
   }
})
export const CommentsItem: React.FC<Comment> = ({ _id, createdAt, postId, text, updatedAt, userId,userInfo: {firstname, lastname, avatar} }) => {
   const styles = useStyles()

   const avataSrcrOfAuthorComment = avatar ? `${process.env.REACT_APP_API_URL}/upload/${avatar}` : notFoundImage

   return (
      <>
      <Grid item flexGrow={1} >
         <Grid container spacing={2}>
            <Grid item>
               <div className={styles.commentImageWrapper}>
                  <img src={avataSrcrOfAuthorComment} className={styles.commentImage} alt={avataSrcrOfAuthorComment} />
               </div>
            </Grid>
            <Grid item flexGrow={1} flexDirection="column" justifyContent="center">
               <div className={styles.comment__author}>
                  <Typography variant="h6">
                     <span>{firstname}</span>
                  </Typography>
                  <Typography variant="h6">
                     <span>{lastname}</span>
                  </Typography>
               </div>
               <div className={styles.comment__date}>
                  <span>
                    Created At:  {moment(createdAt).format('DD/MM/YYYY')}
                  </span>
                  
               </div>
            </Grid>
         </Grid>
         <div className={`${styles.comment__text} ${styles.commentContainer}`}>
            <Typography variant='h6' >
               {text}
            </Typography>
         </div>
      </Grid>
   </>
      
      )
}