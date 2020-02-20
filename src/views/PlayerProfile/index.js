/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react'
import { useParams, Route, useLocation, Switch, Redirect } from 'react-router-dom'
import { Typography } from '@material-ui/core'

import { Loading } from 'components/Loading'
import { useAPI } from 'hooks/useAPI'
import { queryGetPlayer } from 'queries'
import { IGBanner } from 'components/IGBanner'
import { CenteredTabs } from 'components/CenteredTabs'
import { PlayerProfileAboutMe } from './PlayerProfileAboutMe';
import { PlayerProfileStats } from './PlayerProfileStats'

export function PlayerProfile() {
  const { playerId, slug } = useParams()
  const location = useLocation()
  const getPlayerFetcher = useAPI(queryGetPlayer(playerId), {})

  const {
    errorMessage: playerErrorMessage,
    loading: playerLoading,
    resource: player
  } = getPlayerFetcher

  useEffect(function initLoaded() {
    getPlayerFetcher.execute()
  }, [])

  const playerAvatarUrl = player.id ? `https://nhl.bamcontent.com/images/headshots/current/168X168/${player.id}.jpg` : undefined

  // the proper approach here would be to store the player state into context so we don't
  // have to prop drill through anonymous functions in every route
  return (
    <Loading loading={playerLoading} error={playerErrorMessage}>
      <IGBanner 
        avatarUrl={playerAvatarUrl}
        header={<Typography variant='h5'>{player.fullName}</Typography>}
        secondary={[]}
      />
      <CenteredTabs tabs={['profile', 'stats', 'etc']} value={slug} />
      <br/>
      <Switch>
        <Route exact={true} path={`/players/:playerId/profile`} component={() =>
          <PlayerProfileAboutMe player={player} />} />
        <Route exact={true} path={`/players/:playerId/stats`} component={PlayerProfileStats} />
        <Redirect to={{ ...location, pathname: `/players/${playerId}/profile` }} />
      </Switch>  
    </Loading>
  )
}
