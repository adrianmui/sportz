import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { useHistory, useLocation } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    borderRadius: '1.5rem',
  },
})

export function CenteredTabs({ tabs = [], value }) {
  const classes = useStyles()
  const history = useHistory()
  const { pathname } = useLocation()

  const handlePushRoute = (_, newValue) => {
    const newUrl = pathname.replace(value, tabs[newValue])
    history.push(newUrl)
  }

  const activeTabIndex = Math.max(tabs.findIndex(tab => tab === value), 0)

  return (
    <Paper className={classes.root}>
      <Tabs
        value={activeTabIndex}
        onChange={handlePushRoute}
        indicatorColor='primary'
        textColor='primary'
        centered
      >
        {tabs.map((tabSlug, key) => (
          <Tab key={key} label={tabSlug} />
        ))}
      </Tabs>
    </Paper>
  )
}
