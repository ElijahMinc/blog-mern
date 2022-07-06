import { AccountCircle } from '@mui/icons-material';
import { AppBar, Button, Grid, IconButton, Link, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import React, { ChangeEvent, useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useCheckIsLoginPage } from '../../hooks/useCheckIsLoginPage';
import { deleteAvatarThunk, refreshAuth, resetPosts, selectUser, setAvatarThunk } from '../../redux';
import { AppDispatch } from '../../redux/configureStore';
import { makeStyles } from '@mui/styles'


const useStyles = makeStyles({
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

interface HeaderProps {

}



export const Header: React.FC<HeaderProps> = () => {
   const [file, setFile] = useState<File | undefined>(undefined)

   const styles = useStyles()

   const fileRef = useRef<HTMLInputElement | null>(null)

   const { data: { 
      isAuth,
      user: { firstname, lastname, avatar }
     }} = useSelector(selectUser)
   const dispatch = useDispatch<AppDispatch>()
     console.log('firstname', firstname)
     console.log('lastname', lastname)
   const { push } = useHistory()
   const isLoginPage = useCheckIsLoginPage()

   const infoPage = isAuth ? 'Home' : 'Auth Page' 

   const withAuthLoginText = isAuth ? 'Logout' : 'Login'
   const withNonAuthLoginText = isLoginPage ? 'Register' : 'Login'

   const redirectLoginOrRegisterPage = useCallback(() => push(isLoginPage ? '/register' : '/login'), [isLoginPage])

   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);


   const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () =>  setAnchorEl(null);

   const logout = () => dispatch(refreshAuth())

    const setAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.target
      if(!target?.files) return 

      const file = target?.files[0]
      setFile(file)
      console.log('e', target?.files)

      await dispatch(setAvatarThunk(file))
    }

    const removeAvatar = async () => {
      await dispatch(deleteAvatarThunk())
    }

   return (
         <AppBar position="relative" sx={{
            zIndex: '1000'
         }}>
            <Toolbar >
               <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {infoPage}
               </Typography>
               {isAuth ? (
                     <Grid container sx={{
                        width: 'auto'
                     }} alignItems="center">
                        <Grid item>
                           <Typography variant="h6" component="div">
                                    <b>{firstname} {lastname}</b>
                           </Typography>
                        </Grid>
                        <Grid item>
                           <IconButton
                              size="large"
                              aria-label="account of current user"
                              aria-controls="menu-appbar"
                              aria-haspopup="true"
                              onClick={handleMenu}
                              color="inherit"
                           >
                              {avatar ? <div className={styles.avatarWrapperImg}>
                                    <img className={styles.avatarImg} src={`http://localhost:${process.env.REACT_APP_SERVER_PORT}/upload/${avatar}`} />
                              </div> : (
                                    <AccountCircle />
                              )}  
                           </IconButton>
                        </Grid>
                      
                           <Menu
                              id="menu-appbar"
                              anchorEl={anchorEl}
                              anchorOrigin={{
                                 vertical: 'bottom',
                                 horizontal: 'right',
                              }}
                              keepMounted
                              transformOrigin={{
                                 vertical: 'top',
                                 horizontal: 'right',
                              }}
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                           >
                           <MenuItem onClick={handleClose}>
                              {avatar ? (
                                 <Button variant="contained" color='secondary' onClick={removeAvatar}>
                                    Remove Avatar
                                 </Button>
                              ) : (
                                 <Button variant="contained" color='secondary' onClick={() => fileRef.current?.click()}>
                                    Setup Avatar
                                    <input ref={fileRef} type="file" style={{display: 'none'}} onChange={setAvatar} />
                                 </Button>
                              )}
                           </MenuItem>
                           <MenuItem onClick={handleClose}>
                              <Button variant="contained" color='secondary' onClick={() => {
                                 dispatch(resetPosts())
                                 push('/post', {
                                 isEdit: false
                              })}
                              }>Create New Post!</Button>
                           </MenuItem>
                           <MenuItem onClick={handleClose}>
                              <Button color="secondary" variant="contained"  onClick={logout}>
                                 {withAuthLoginText}
                              </Button>
                           </MenuItem>
                           </Menu>
                     </Grid>
               ) : (
                  <Button color="inherit" variant="text" onClick={redirectLoginOrRegisterPage}>
                     {withNonAuthLoginText}
                  </Button>
               )
              }
              
            </Toolbar>
      </AppBar>
      )
}