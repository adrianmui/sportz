import React from 'react';
import { BrowserRouter, useHistory } from 'react-router-dom'

import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import MailIcon from '@material-ui/icons/Mail'
import SearchIcon from '@material-ui/icons/Search';

import { AppRoutes } from 'routes';

const DRAWER_WIDTH = 240;
const DEFAULT_THEME = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3'
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  control: {
    padding: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
  main: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function ListItemLink({ label = '', Icon, to })  {
  const history = useHistory()

  const handleClick = () => history.push(to)

  return (
    <ListItem button key={label.toLowerCase()} onClick={handleClick}>
      <ListItemIcon><Icon /></ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  )
}

function AppContents() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Hidden only='xs'>
        <Drawer
          className={classes.drawer}
          variant='permanent'
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor='left'
        >
          <div className={classes.toolbar} />
          <Divider />
          <List>
            <ListItemLink label='Teams' Icon={MailIcon} to='/teams' />
            <ListItemLink label='Search' Icon={SearchIcon} to='/players/search' />
          </List>
        </Drawer>
      </Hidden>
      <Container maxWidth='md'>
        <div className={classes.toolbar} />
        <main className={classes.main}>
          <AppRoutes />
        </main>
      </Container>
    </div>
  )   
}

export function App() {
  return (
    <ThemeProvider theme={DEFAULT_THEME}>
      <BrowserRouter>
        <AppContents />
      </BrowserRouter>
    </ThemeProvider>
  );
}