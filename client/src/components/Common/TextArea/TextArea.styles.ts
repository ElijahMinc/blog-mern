import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles({
   textAreaWrapper: {
      "& .rdw-editor-toolbar": {
         background: '#121212',
         border: 'none',
         '& .rdw-block-wrapper': {
            color:'#121212',
          
         },
      }
   }
})