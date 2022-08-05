import { makeStyles } from '@mui/styles';


export const useStyles = makeStyles({
   cardContent: {
      paddingTop: '10px',
      paddingBottom: '5px',
   },
   cardContentHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
   },
   cardContentLogo: {
      position: 'relative',
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      overflow: 'hidden'
   },
   cardContentImg: {
      width: '100%',
      height: '100%'
   },
   cardContentMedia: {
      cursor: 'pointer',
      maxWidth: '100%',
      borderRadius: '10px'
   },
   cardContentInfo: {
      display: 'flex',
      flexDirection: 'column'

   },
   cardContentBody: {
      marginTop: '10px',
      marginLeft: '40px'
   },
   cardContentTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px'
   },
   cardMediaContainer: {
      position: 'relative',
      width: '100%',
      height: '600px',
      padding: '20px'
   },
   cardMediaEdit: {
      position: 'absolute',
      top:'25px',
      right: '70px',
      cursor: 'pointer',
      transition: '.3s all !important',
      '&:hover': {
         transform: 'translateY(-5px) rotate(8deg)'
      }
   },
   cardMediaRemove: {
      position: 'absolute',
      top:'25px',
      right: '20px',
      cursor: 'pointer',
      transition: '.3s all !important',
      '&:hover': {
         transform: 'translateY(-5px) rotate(8deg)'
      }
   },
})