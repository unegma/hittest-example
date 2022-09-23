// Thanks to bertdida for this one https://codesandbox.io/s/lucid-lichterman-s5uhm?fontsize=14&hidenavigation=1&theme=dark&file=/src/menu.js

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {Link} from "react-router-dom";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {useState} from "react";
import {Collapse} from "@mui/material";

export const MultiLevel = ({ item, setInfoText, setInfoTitle }: any) => {
  const { items: children } = item;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <ListItem button className="js-ignore-close" onClick={handleClick}>
        <ListItemText primary={item.title} />
        {open ? <ExpandLess className="js-ignore-close" /> : <ExpandMore className="js-ignore-close" />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map((child: any, key: any) => (
            <SingleLevel key={key} item={child} setInfoText={setInfoText} setInfoTitle={setInfoTitle} />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export const SingleLevel = ({ item, setInfoText, setInfoTitle }: any) => {
  return (
    <Link to={`/${item.key}`} className="drawer-link" onClick={() => {setInfoText(item.infoText); setInfoTitle(item.infoTitle)}}>
      <ListItem key={`${item.key}`} disablePadding>
        <ListItemButton>
          <ListItemText primary={`${item.name}`} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};
