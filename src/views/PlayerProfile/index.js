/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react'
import { useParams, Route, useLocation, Switch, Redirect } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

import { Loading } from 'components/Loading'
import { useAPI } from 'hooks/useAPI'
import { queryGetPlayer } from 'queries'
import { IGBanner } from 'components/IGBanner'
import { CenteredTabs } from 'components/CenteredTabs'

import { PlayerProfileAboutMe } from './PlayerProfileAboutMe';
import { PlayerProfileStats } from './PlayerProfileStats'
import { usePlayerProfileContextProvider, PlayerProfileContext } from './PlayerProfileContext'

export function PlayerProfile() {
  const context = usePlayerProfileContextProvider()

  const { playerId, slug } = useParams()
  const location = useLocation()
  const getPlayerFetcher = useAPI(queryGetPlayer(playerId), {})

  const {
    errorMessage: playerErrorMessage,
    loading: playerLoading,
    resource: player
  } = getPlayerFetcher

  const loadPlayerAndSetContext = async () => {
    const { response } = await getPlayerFetcher.execute()

    context.setPlayer(response.resource)
  }

  useEffect(function initLoaded() {
    loadPlayerAndSetContext()
  }, [])

  return (
    <PlayerProfileContext.Provider value={context}>
      <Loading loading={playerLoading} error={playerErrorMessage}>
        <IGBanner 
          avatarUrl={`https://nhl.bamcontent.com/images/headshots/current/168x168/${player.id}.jpg`}
          header={<Typography variant='h5'>{player.fullName}</Typography>}
        />
        <CenteredTabs tabs={['profile', 'stats']} value={slug} />
        <br/>
        <Switch>
          <Route exact={true} path={`/players/:playerId/profile`} component={PlayerProfileAboutMe} />
          <Route exact={true} path={`/players/:playerId/stats`} component={PlayerProfileStats} />
          <Redirect to={{ ...location, pathname: `/players/${playerId}/profile` }} />
        </Switch>  
      </Loading>
    </PlayerProfileContext.Provider>
  )
}
