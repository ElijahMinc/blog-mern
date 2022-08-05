import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material'
import React from 'react'

interface TagSelectProps {
   tags: string[]
   value: string[]
   handleChange: (event: SelectChangeEvent<string[]>) => void
}

export const TagSelect: React.FC<TagSelectProps> = ({tags, value, handleChange}) => {

   return (
      <FormControl sx={{  width: 300 }}>
        <InputLabel color='secondary' id="demo-multiple-checkbox-label">Tags</InputLabel>
         <Select
            color='primary'
            multiple
            value={value}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
            // MenuProps={MenuProps}
         >
            {tags.map((name) => (
            <MenuItem key={name} value={name}>
               <Checkbox checked={value.indexOf(name) > -1} />
               <ListItemText primary={name} />
            </MenuItem>
            ))}
         </Select>
      </FormControl>
   )
}