import { makeStyles } from '@mui/styles'


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
      overflow: 'hidden'
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
      position: 'relative'
   },
   cardMediaEdit: {
      position: 'absolute',
      top:'10px',
      right: '50px',
      cursor: 'pointer'
   },
   cardMediaRemove: {
      position: 'absolute',
      top:'10px',
      right: '10px',
      cursor: 'pointer'

   },
   btnBack: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '50px',
      height: '100%',
      zIndex: '1'
   },
   imgPreview: {
      maxWidth: '100%',
      height: '300px',
      display: 'block',
      borderRadius: '10px',
      margin: '0 auto',
      marginBottom: '10px'
   },
   inputTitle: {
         fontSize: '30px'
   }
})