import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {ChevronLeft, ChevronRight, InfoOutlined} from "@mui/icons-material";
import BuyButton from "./BuyButton";

export default function RightSideDrawer(
  {infoOpen, toggleRightSideDrawer, setDrawerRightOpen, drawerRightOpen, infoTitle = 'The Title', infoText = 'This is info about this piece'}: any) {

  return (
    <>
      <Drawer
        className="rightDrawer"
        open={drawerRightOpen}
        onClose={(event:any) => {toggleRightSideDrawer(event)}}
        anchor={'right'}
      >
        <Box
          component="div"
          sx={{ width: '50vw'}}
          role="presentation"
          // onClick={(event: any) => {toggleRightSideDrawer(event)}}
          // onKeyDown={(event: any) => {toggleRightSideDrawer(event)}}
        >

          {/*<List>*/}

          {/*  <Link to="/" className="drawer-link">*/}
          {/*    <ListItem key={'nav'} disablePadding>*/}
          {/*      <Typography className={`main-title main-title-navbar`} variant="h6" component="div" sx={{ flexGrow: 1 }}*/}
          {/*                  onClick={(event:any) => {toggleRightSideDrawer(event)}}>*/}
          {/*        {process.env.REACT_APP_NAV_TITLE}*/}
          {/*      </Typography>*/}
          {/*    </ListItem>*/}
          {/*  </Link>*/}
          {/*</List>*/}

          {/*<Divider/>*/}

          {/*<div className={`buttons-container buttons-container--right`}>*/}
          {/*  <InfoOutlined className="pointer" style={{ color: "black", margin: "0 4px" }} onClick={(event) => {toggleRightSideDrawer(event)}}/>*/}
          {/*</div>*/}

          <div className="buttons-container">
            {/*<InfoOutlined className="pointer" style={{ color: "black", margin: "0 4px" }} onClick={() => {setShowInfoModal(!showInfoModal)}}/>*/}

            <div className="pointer" onClick={(event) => {toggleRightSideDrawer(event)}}>
              <InfoOutlined className="pointer" style={{ color: "black", margin: "0 4px" }} />
              { drawerRightOpen && (
                <ChevronRight style={{ color: "black", margin: "0 4px" }} />
              )}
              { !drawerRightOpen && (
                <ChevronLeft style={{ color: "black", margin: "0 4px" }} />
              )}
            </div>
          </div>

          <div className="rightDrawer-text-container">
            <Typography className="rightDrawer-text-container__title">
              {infoTitle}
            </Typography>
            <Typography className="rightDrawer-text-container__description">
              {infoText}
            </Typography>
            <Typography className="rightDrawer-text-container__buy-button">
              <BuyButton />
            </Typography>
          </div>

        </Box>
      </Drawer>

      {/*/!*hacky way to avoid the opacity*!/*/}
      {/*{ drawerRightOpen && (*/}
      {/*  <div className="rightDrawer-text-container">*/}
      {/*    <Typography className="rightDrawer-text-container__title">*/}
      {/*      {infoTitle}*/}
      {/*    </Typography>*/}
      {/*    <Typography className="rightDrawer-text-container__description">*/}
      {/*      {infoText}*/}
      {/*    </Typography>*/}
      {/*  </div>*/}
      {/*) }*/}
    </>
  )
}
