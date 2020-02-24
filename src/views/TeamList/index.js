/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react'
import { useAPI } from 'hooks/useAPI'
import { queryGetTeams } from 'queries'

import { TeamList as TeamListView } from './TeamList'

export function TeamList() {
  const getTeamsFetcher = useAPI(queryGetTeams, [])

  const {
    errorMessage: teamsErrorMessage,
    loading: teamsLoading,
    resource: teams
  } = getTeamsFetcher

  useEffect(function initLoaded() {
    getTeamsFetcher.execute()
  }, [])
  
  return (
    <TeamListView 
      teams={teams}
      teamsErrorMessage={teamsErrorMessage}
      teamsLoading={teamsLoading}
    />
  )
}