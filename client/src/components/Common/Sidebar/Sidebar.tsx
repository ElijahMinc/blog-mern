import { Button, Grid, Paper, SelectChangeEvent, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTagsByPopularPostThunk, selectPost } from '@redux/index'
import { AppDispatch } from '@redux/configureStore'
import { TagSelect } from '@Common/TagSelect/TagSelect'
import { setTagsValue as setTags } from '@redux/Filter'

export const Sidebar: React.FC = () => {
   const [tagsValue, setTagsValue] = React.useState<string[]>([]);

      const {
            data:{
                  tags
            }
      } = useSelector(selectPost)
      const dispatch = useDispatch<AppDispatch>()

      useEffect(() => {
            dispatch(getTagsByPopularPostThunk())
      }, [])

      const handleChange = (event: SelectChangeEvent<typeof tagsValue>) => {
            const {
              target: { value },
            } = event;
            setTagsValue(
              typeof value === 'string' ? value.split(',') : value,
            );
            
      };

      const handleClearTags = () =>  setTagsValue([])

      useEffect(() => {
            dispatch(setTags(tagsValue))
      }, [tagsValue])

   return (
      <Paper sx={{
            padding: '15px'
      }}>
            <Typography variant="h5" sx={{ marginBottom: '20px'}}>Popular tags:</Typography>


            {!!tags?.length ? (
                  <>
                  <TagSelect tags={tags} value={tagsValue} handleChange={handleChange}/>
                 {!!tagsValue.length  && (<Button onClick={handleClearTags} sx={{margin: '10px 0'}}>Clear</Button>)} 
                  {!!tagsValue.length 
                     && (
                        <Grid container gap={3} justifyContent="space-evenly" alignItems="center">
                              {tagsValue.map(tag => (
                              <Grid item>
                                    <Typography key={`tag-#${tag}`} paragraph>
                                          {`# ${tag}`}
                                    </Typography>
                              </Grid>
                              ))}
                        </Grid>
                       
                     )}
                  </>
            ) : (
                  <Typography paragraph>No popular tags</Typography>
            )} 

      </Paper>
    
      )
}