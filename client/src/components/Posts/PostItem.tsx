import { Button, Card, CardActions, CardContent, CardMedia, Collapse, Grid, IconButton, IconButtonProps, Paper, Typography } from '@mui/material'
import moment from 'moment'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import { deletePostThunk, likePostThunk, Post as PostInterface, selectUser } from '../../redux'
import {styled} from '@mui/material/styles'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';
import notFoundImage from '../../static/notFoundImage.png'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux'
import blue from '@mui/material/colors/blue'
import { useHistory } from 'react-router-dom'
import { AppDispatch } from '../../redux/configureStore'
import { TextArea } from '../TextArea/TextArea'
import { convertToHTML } from 'draft-convert'
import { ContentState, EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import htmlToDraft from 'html-to-draftjs';

export interface ExpandMoreProps extends IconButtonProps {
   expand: boolean;
 }
 export interface LikeProps extends IconButtonProps {
   like: boolean;
 }

export const ExpandMore = styled((props: ExpandMoreProps) => {
   const { expand, ...other } = props;

   return <IconButton {...other} />;
 })(({ theme, expand }) => ({
   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
   marginLeft: 'auto',
   transition: theme.transitions.create('transform', {
     duration: theme.transitions.duration.shortest,
   }),
 }));
 
export const Like = styled((props: LikeProps) => {
   const { like, ...other } = props;

   return (
          <IconButton {...other} />
   )
 })(({ theme, like }) => ({
   color: like ? theme.palette.error['light']  : theme.palette.grey['300']
   ,
 })); 


const useStyles = makeStyles({
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
      // position: 'absolute',
      // top: '0',
      // left: '0',
      // objectFit: 'cover'
   },
   cardContentMedia: {
      cursor: 'pointer',
      width: '100%',
      height: '500px',
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
      cursor: 'pointer',
      transition: '.3s all',
      '&:hover': {
         transform: 'translateY(-5px)'
      }
   },
   cardMediaRemove: {
      position: 'absolute',
      top:'10px',
      right: '10px',
      cursor: 'pointer',
      transition: '.3s all',
      '&:hover': {
         transform: 'translateY(-5px)'
      }
   },
})

interface PostProps {
   post: PostInterface
}

export const PostItem: React.FC<PostProps> = ({ post: {_id, title, text, imageName, userId: userIdPost, tags, updatedAt, createdAt, userInfo: {firstname, lastname, avatar},  likes: {likes, userIds}} }) => {
   const {
      data: {
         user: {
            _id: authUserId
         }
      }
   } = useSelector(selectUser)

   const isLikedStatus = userIds.indexOf(authUserId) !== -1
   // console.log('isLikedStatus', isLikedStatus)
   // console.log('userIds', userIds)
   // console.log('authUserId', authUserId)

   const [expanded, setExpanded] = useState(false);
   const [like, setLike] = useState(isLikedStatus)
   const [likesCount, setLikesCount] = useState(likes)

   const isAuthor = authUserId === userIdPost
   const { push } = useHistory()
   const dispatch = useDispatch<AppDispatch>()
   const classes = useStyles()


   const handleExpandClick = () =>  setExpanded(!expanded)
   const handleLikeClick = async () =>  {
      await dispatch(likePostThunk(_id))
      setLikesCount(like ? likesCount - 1 : likesCount + 1)
      setLike(!like)
   }

   const handleRedirectToEditPost = useCallback(() => push(`post/edit/${_id}`, {
      isEdit: true
   }), [_id])
   const handleRedirectToPost = useCallback(() => push(`post/${_id}`), [_id])
   const handleDeletePost =  useCallback(() => dispatch(deletePostThunk(_id)), [_id])


   const contentBlock = htmlToDraft(text as string);

   const [editorState] = useState(
      contentBlock ? 
         EditorState.createWithContent(ContentState.createFromBlockArray(contentBlock.contentBlocks)) 
      : 
         () => EditorState.createEmpty()
      )

   return  (
       <Grid item>
         <Card variant="outlined">
            <div className={classes.cardMediaContainer}>
               <CardMedia
                  onClick={handleRedirectToPost}
                  component="img"
                  className={classes.cardContentMedia}
                  height="300px"
                  image={imageName ? `http://localhost:${process.env.REACT_APP_SERVER_PORT}/upload/${imageName}` : notFoundImage}
                  alt={imageName ?? ''}
               />
               {isAuthor && (
                  <>
                     <EditIcon fontSize="large" sx={{ color: blue['200'] }} onClick={handleRedirectToEditPost} className={classes.cardMediaEdit}/>
                     <DeleteIcon fontSize="large" sx={{ color: blue['200'] }} onClick={handleDeletePost} className={classes.cardMediaRemove}/>
                  </>
               )}
         
            </div>
            <CardContent className={classes.cardContent}>
               <div className={classes.cardContentHeader}>
                  <div className={classes.cardContentLogo} >
                     <img className={classes.cardContentImg} src={avatar ? `http://localhost:${process.env.REACT_APP_SERVER_PORT}/upload/${avatar}` : notFoundImage} alt={avatar ?? ''} />
                  </div>
                  <div className={classes.cardContentInfo} >
                     <Grid item container spacing={1} alignItems="center">
                        <Grid item>
                           <span >
                              User:
                           </span>
                        </Grid>
                        <Grid item>
                           <Typography variant='h6'>
                              {firstname} {lastname}
                           </Typography>
                        </Grid>
                     </Grid>
                     <span>{moment(createdAt).format('DD.MM.YYYY')}</span>
                  </div>
               </div>
               <div className={classes.cardContentBody}>
                  <Typography variant="h4" gutterBottom>
                     {title}
                  </Typography>
                  <Grid 
                     container
                     spacing={0}
                     color="primary"
                     sx={{
                        marginLeft: '5px',
                        marginBottom: '10px',
                        '& .MuiGrid-item': {
                           padding: '10px 20px',
                           borderRadius: '10px',
                           background: blue[800]
                        }
                     }}>
                        {!!tags?.length && tags.map((tag) => (
                           <Grid key={`tag-${tag}`} item sx={{
                              marginLeft: '10px',
                              position: 'relative',
                              color: 'white'

                           }}>
                              {`#${tag}`}
                           </Grid>
                        ))}
                     </Grid>
               </div>
               <CardActions disableSpacing>
                     <Like 
                        like={like}
                        onClick={handleLikeClick}
                        aria-label="like"
                     >
                        <FavoriteIcon/>
                     </Like>
                     {likesCount}
                  {/* <IconButton aria-label="share">
                     <ShareIcon />
                  </IconButton> */}
                  <ExpandMore
                     expand={expanded}
                     onClick={handleExpandClick}
                     aria-expanded={expanded}
                     aria-label="show more"
                  >

                        <ExpandMoreIcon />
                  
                  </ExpandMore>
               </CardActions>
               <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                     <Editor 
                        toolbarHidden
                        readOnly
                        editorState={editorState}
                     />
                  </CardContent>
               </Collapse>
            </CardContent>
         </Card>
      </Grid> 
   )
}