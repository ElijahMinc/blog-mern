import React from 'react'
import {styled} from '@mui/material/styles'
import { IconButton, IconButtonProps } from '@mui/material';
 
export interface LikeProps extends IconButtonProps {
   like: boolean;
 }

export const Like = styled((props: LikeProps) => {
   const { like, ...other } = props;

   return <IconButton {...other} />
 })(({ theme, like }) => ({
   color: like ? theme.palette.error['light']  : theme.palette.grey['300']
   ,
 })); 