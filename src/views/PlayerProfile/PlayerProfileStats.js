/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react'

import { queryGetPlayerCareerStats } from 'queries'
import { useAPI } from 'hooks/useAPI'
import { useParams } from 'react-router-dom'
import { Loading } from 'components/Loading'
import { DenseTable } from 'components/DenseTable'

const PLAYER_STAT_COLUMNS = [
  {
    label: 'Season',
    property: 'season',
  },
  {
    label: 'League',
    property: 'league.name',
  },
  {
    label: 'Team',
    property: 'team.name',
  },
  {
    label: 'Assists',
    property: 'stat.assists',
    defaultValue: 'N/A',
  },
  {
    Goals: 'Goals',
    property: 'stat.goals',
    defaultValue: 'N/A',
  },
  {
    label: 'Time On Ice',
    property: 'stat.timeOnIce',
    defaultValue: 'N/A',
  },
  {
    label: 'Wins',
    property: 'stat.wins',
    defaultValue: 'N/A',
  },
  {
    label: 'Losses',
    property: 'stat.losses',
    defaultValue: 'N/A',
  },
  {
    label: 'Games Played',
    property: 'stat.games',
    defaultValue: 'N/A',
  },
]

export function PlayerProfileStats() {
  const { playerId } = useParams()

  const getPlayerStatsFetcher = useAPI(queryGetPlayerCareerStats(playerId), [])
  const {
    errorMessage: playerStatsErrorMessage,
    loading: playerStatsLoading,
    resource: splits
  } = getPlayerStatsFetcher

  useEffect(function initLoaded() {
    getPlayerStatsFetcher.execute()
  }, [])
  
  return (
    <Loading loading={playerStatsLoading} error={playerStatsErrorMessage}>
      <DenseTable
        title='Year By Year Stats'
        rows={splits}
        columns={PLAYER_STAT_COLUMNS}
      />
    </Loading>
  )
}