import React, { useEffect } from 'react'
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/system';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

export type Anchor = 'top' | 'left' | 'bottom' | 'right';

export type StateAnchor = {
  [K in Anchor]: boolean
} 

interface DrawerProps {
  anchor: Anchor
  state: StateAnchor
  handleGetRoom: (name: string) => void
  rooms: string[]
  toggleDrawer: (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void
}

export const ThemedDrawer: React.FC<DrawerProps> = ({ state, anchor,  rooms = [], toggleDrawer, handleGetRoom }) => {


  // useEffect(() => {
  //   setState({ ...state, [anchor]: isShow })
  // }, [isShow])

   return (
      <Drawer
        anchor={anchor}
        open={state[anchor] as boolean}
        onClose={toggleDrawer(anchor, false)}
      >
          <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
          >
              <List>
                {!!rooms.length && rooms.map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton onClick={() => handleGetRoom(text)}>
                      <ListItemIcon>
                          <MeetingRoomIcon />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
        </Box>
      </Drawer>
      )
}