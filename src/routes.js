import React from 'react'
import { useLocation, Switch, Route, Redirect } from 'react-router-dom'

import { TeamList } from 'views/TeamList'
import { TeamProfile } from 'views/TeamProfile'
import { PlayerProfile } from 'views/PlayerProfile'

export function AppRoutes() {
  const location = useLocation()

  return (  
    <Switch>
      <Route exact={true} path='/teams' component={TeamList} />
      <Route path='/teams/:teamId(\d+)/:slug?' component={TeamProfile} />
      <Route path='/players/:playerId(\d+)/:slug?' component={PlayerProfile} />
      <Redirect to={{ ...location, pathname: '/teams' }} />
    </Switch>
  )
}
