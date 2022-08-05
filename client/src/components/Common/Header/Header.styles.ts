import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles({
   avatarWrapperImg: {
      width: '35px',
      height: '35px',
      overflow: 'hidden',
      borderRadius: '50%'
   },
   avatarImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
   }
})
