import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import Web3ConnectionButtons from './Web3ConnectionButtons';

export default function NavBar(
  {toggleLeftSideDrawer, setShowBookingModal, showBookingModal}:
    {toggleLeftSideDrawer: any, setShowBookingModal: any, showBookingModal: any}) {
  return (
    <Box component="div" sx={{ flexGrow: 1 }} className="navBar" >
      <AppBar position="fixed" color="transparent">
        <Toolbar>
          <Typography className="main-title" variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={(event:any) => {toggleLeftSideDrawer(event)}}>
            {process.env.REACT_APP_NAV_TITLE}
          </Typography>
          {/*<Button color="error" variant="contained" onClick={() => {setShowBookingModal(!showBookingModal)}}>Book Boardroom</Button>*/}
          {/*<Web3ConnectionButtons className='connect-button' />*/}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
