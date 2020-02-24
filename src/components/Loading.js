import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '4rem',
  }
})

export function Loading({ 
  children,
  loading = false,
  error = '',
  ...restProps
}) {
  const classes = useStyles()

  if (loading && !error) {
    return <div className={classes.root}><CircularProgress /></div>
  }

  if (!loading && error) {
    return <h1>{error}</h1>
  }

  if (!children) {
    return null
  }

  return children
}
