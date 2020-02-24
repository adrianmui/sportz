/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAPI } from 'hooks/useAPI'
import { queryGetTeamDetails, queryGetTeamRoster } from 'queries'

import { TeamProfile as TeamProfileView } from './TeamProfile'

export function TeamProfile() {
  const { teamId } = useParams()

  const getTeamFetcher = useAPI(queryGetTeamDetails(teamId), {})
  const getTeamRosterFetcher = useAPI(queryGetTeamRoster(teamId), [])

  const {
    errorMessage: teamErrorMessage,
    loading: teamLoading,
    resource: team
  } = getTeamFetcher
  const {
    errorMessage: rosterErrorMessage,
    loading: rosterLoading,
    resource: roster
  } = getTeamRosterFetcher

  useEffect(function initLoaded() {
    getTeamFetcher.execute()
    getTeamRosterFetcher.execute()
  }, [])

  const props = {
    teamLoading,
    teamErrorMessage,
    team,  
    rosterLoading,
    rosterErrorMessage,
    roster,
  }

  return <TeamProfileView {...props} />
}