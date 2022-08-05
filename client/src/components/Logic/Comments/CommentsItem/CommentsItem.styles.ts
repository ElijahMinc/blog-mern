import { makeStyles } from '@mui/styles'
import { blue } from '@mui/material/colors'


export const useStyles = makeStyles({
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