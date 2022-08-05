import { Card, CardActions, CardContent, CardMedia, Collapse, Grid, IconButton, IconButtonProps, Typography } from '@mui/material'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { deletePostThunk, likePostThunk, Post as PostInterface, selectFilter, selectUser } from '@redux/index'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import notFoundImage from '@static/notFoundImage.png'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux'
import blue from '@mui/material/colors/blue'
import { useHistory } from 'react-router-dom'
import { AppDispatch } from '@redux/configureStore'
import { ContentState, EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import htmlToDraft from 'html-to-draftjs';
import { ExpandMore } from '@/components/Common/ExpandMore/ExpandMore';
import { Like } from '@/components/Common/Like/Like';
import { useStyles } from './PostItem.styles';



interface PostProps {
   post: PostInterface
}

export const PostItem: React.FC<PostProps> = ({ post: {_id, title, text, cloudinaryId, cloudinaryUrl, userId: userIdPost, tags, updatedAt, createdAt, userInfo: {firstname, lastname, cloudinaryAvatarUrl},  likes: {likes, userIds}} }) => {
   const {
      data: {
         user: {
            _id: authUserId
         }
      }
   } = useSelector(selectUser)
   const filters = useSelector(selectFilter)


   const isLikedStatus = userIds.indexOf(authUserId) !== -1

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
   const handleDeletePost =  useCallback(() => dispatch(deletePostThunk({_id, filters})), [_id])

   const [editorState, setEditorState] = useState<EditorState>(
         () => EditorState.createEmpty()
      )

      useEffect(() => {
         const contentBlock = htmlToDraft(text as string);

         setEditorState( contentBlock ? 
            EditorState.createWithContent(ContentState.createFromBlockArray(contentBlock.contentBlocks)) 
         : 
            () => EditorState.createEmpty())
      }, [text])

   return  (
       <Grid item >
         <Card variant="outlined" sx={{

                 boxShadow: '0px 0px 5px 0px rgb(63 81 181)',
               // boxShadow: '0px 0px 5px 0px rgb(216, 27, 96)',
               borderRadius: '10px'
         }}>
            <div className={classes.cardMediaContainer}>
               <CardMedia
                  onClick={handleRedirectToPost}
                  component="img"
                  className={classes.cardContentMedia}
                  height="100%"
                  image={cloudinaryUrl ? cloudinaryUrl : notFoundImage}
                  alt={cloudinaryId ?? ''}
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
                     <img className={classes.cardContentImg} src={cloudinaryAvatarUrl ? cloudinaryAvatarUrl : notFoundImage} alt={cloudinaryAvatarUrl ?? ''} />
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
                     gap={1}
                     color="primary"
                     sx={{
                        marginLeft: '5px',
                        marginBottom: '10px',
                        '& .MuiGrid-item': {
                           padding: '10px 20px',
                           borderRadius: '10px',
                           background: '#3f51b5'
                        }
                     }}>
                        {!!tags?.length && tags.map((tag) => (
                           <Grid key={`tag-${tag}`} item sx={{
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
                  <CardContent sx={{
                     borderTop: '1px solid rgb(63 81 181)',
                     borderBottom: '1px solid rgb(63 81 181)',
                  }}>
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