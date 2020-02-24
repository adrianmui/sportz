import React from 'react'

import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '1.5rem',
    padding: '0 0.75rem 0 0.75rem',
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export function CustomizedInputBase({ onSearch, value }) {
  const classes = useStyles();

  return (
    <Paper component='form' className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder='Search Player (Name)'
        inputProps={{ 'aria-label': 'search players' }}
        onChange={onSearch}
        value={value}
      />
      <IconButton color='primary' type='submit' className={classes.iconButton} aria-label='search'>
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation='vertical' />
      <IconButton className={classes.iconButton} aria-label='directions'>
        <HighlightOffIcon />
      </IconButton>
    </Paper>
  );
}