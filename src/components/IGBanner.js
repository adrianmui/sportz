import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  root: { 
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0.5rem 5rem 0rem 5rem',
    marginBottom: '1.5rem',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.75rem',
  },
  logo__size: {
    width: '10rem',
    height: '10rem',
  },
  logo__image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  desc: {
    flexGrow: 1,
    textAlign: 'center',
  },
  desc__header: {
    flex: 1,
    marginBottom: '1rem',
    textAlign: 'center',
  },
  desc__secondary: {
    flex: 2,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
})

export function IGBanner({ avatarUrl, header, secondary = [] }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.logo}>
        <Avatar 
          src={avatarUrl}
          imgProps={{ className: classes.logo__image }}
          className={classes.logo__size} 
        />
      </div>
      <div className={classes.desc}> 
        <div className={classes.desc__header}>
          {header}
        </div>
        <div className={classes.desc__secondary}>
          {secondary}
        </div>
      </div>
    </div>
  )
}
