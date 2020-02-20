/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react'
import { useAPI } from 'hooks/useAPI'
import { queryGetTeams } from 'queries'
import { Avatar, Link, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import { DenseTable } from 'components/DenseTable'
import { Link as RouterLink } from 'react-router-dom'
import { Loading } from 'components/Loading';

const useStyles = makeStyles({
  nameContainer: { 
    display: 'flex', 
    flexDirection: 'row',
  },
  nameLogo: {
    marginRight: '1rem',
  },
  nameName: {
    display: 'flex',
    alignItems: 'center',
  }
})

const TEAM_COLUMNS = [
  {
    label: 'Name',
    property: 'name',
  },
  {
    label: 'Division',
    property: 'division.name',
  },
  {
    label: 'Conference',
    property: 'conference.name',
  },
  {
    label: 'Franchise',
    property: 'franchise.teamName',
  },
]

export function TeamList() {
  const classes = useStyles()
  const getTeamsFetcher = useAPI(queryGetTeams, [])

  const {
    errorMessage: teamsErrorMessage,
    loading: teamsLoading,
    resource: teams
  } = getTeamsFetcher

  useEffect(function initLoaded() {
    getTeamsFetcher.execute()
  }, [])

  const teamRows = teams.map(team => {
    const teamAvatarUrl = `http://www-league.nhlstatic.com/nhl.com/builds/site-core/d1b262bacd4892b22a38e8708cdb10c8327ff73e_1579810224/images/logos/team/current/team-${team.id}-light.svg`

    return {
      ...team,
      name: (
        <Link 
          className={classes.nameContainer} 
          component={RouterLink}
          to={`/teams/${team.id}/profile`}
        >
          <Avatar className={classes.nameLogo} src={teamAvatarUrl} />
          <Typography className={classes.nameName} component="span">
            {team.name}
          </Typography>
        </Link>
      ),
    }
  })

  return (
    <Loading loading={teamsLoading} error={teamsErrorMessage}>
      <DenseTable
        title='Teams'
        rows={teamRows}
        columns={TEAM_COLUMNS}
      />
    </Loading>
  )
}