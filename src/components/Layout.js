import React from 'react';
import {
  makeStyles,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Avatar,
} from '@material-ui/core';
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { format } from 'date-fns';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3),
    },
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: '#f4f4f4',
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    date: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(2),
    },
  };
});

export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    { text: 'Notes', icon: <SubjectOutlined color="secondary" />, path: '/' },
    { text: 'Create Note', icon: <AddCircleOutlineOutlined color="secondary" />, path: '/create' },
  ];
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar} elevation={1} color="primary">
        <Toolbar>
          <Typography className={classes.date}>Today is the {format(new Date(), 'do MMMM Y')}</Typography>
          <Typography>User 👨‍💻</Typography>
          <Avatar className={classes.avatar} src="/avatar.png" />
        </Toolbar>
      </AppBar>
      <Drawer className={classes.drawer} variant="permanent" anchor="left" classes={{ paper: classes.drawerPaper }}>
        <div>
          <Typography className={classes.title} variant="h5">
            Notes App
          </Typography>
        </div>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              button
              onClick={() => history.push(item.path)}
              className={location.pathname === item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
