import React from 'react'
import { useLocation, Switch, Route, Redirect } from 'react-router-dom'

import { TeamList } from 'views/TeamList'
import { TeamProfile } from 'views/TeamProfile'
import { PlayerProfile } from 'views/PlayerProfile'
import { PlayerList } from 'views/PlayerList'

export function AppRoutes() {
  const location = useLocation()

  return (  
    <Switch>
      <Route exact={true} path='/teams/:slug?' component={TeamList} />
      <Route path='/teams/:teamId(\d+)/:slug?' component={TeamProfile} />
      <Route path='/players/:playerId(\d+)/:slug?' component={PlayerProfile} />
      <Route path='/players/search' component={PlayerList} />
      <Redirect to={{ ...location, pathname: '/teams' }} />
    </Switch>
  )
}
