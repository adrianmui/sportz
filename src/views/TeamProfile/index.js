/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { Typography, Link, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import { DenseTable } from 'components/DenseTable'
import { Loading } from 'components/Loading'
import { useAPI } from 'hooks/useAPI'
import { queryGetTeam, queryGetTeamRoster } from 'queries'
import { IGBanner } from 'components/IGBanner'

const ROSTER_COLUMNS = [
  {
    label: 'Player',
    property: 'player',
  },
  {
    label: 'Jersey Number',
    property: 'jerseyNumber',
  },
  {
    label: 'Position',
    property: 'position',
  },
]

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

export function TeamProfile() {
  const classes = useStyles()
  const { teamId } = useParams()

  const getTeamFetcher = useAPI(queryGetTeam(teamId), {})
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

  const rosterRows = roster.map(player => {
    const playerAvatarUrl = player.id ? `https://nhl.bamcontent.com/images/headshots/current/168X168/${player.id}.jpg` : undefined

    let playerPosition = player.position?.type
    
    if (player.position?.name !== playerPosition) {
      const positionName = player.position?.name  
      playerPosition = `${playerPosition} - ${positionName}`
    }

    return {
      ...player,
      player: (
        <Link 
          className={classes.nameContainer}
          component={RouterLink}
          to={`/players/${player.person.id}/profile`}
        >
          <Avatar className={classes.nameLogo} src={playerAvatarUrl} />
          <Typography className={classes.nameName} component="span">
            {player.person.fullName}
          </Typography>
        </Link>
      ),
      position: playerPosition
    }
  })

  const teamAvatarUrl = team.id ? `http://www-league.nhlstatic.com/nhl.com/builds/site-core/d1b262bacd4892b22a38e8708cdb10c8327ff73e_1579810224/images/logos/team/current/team-${team.id}-light.svg` : undefined

  const teamDescriptionTags = [
    ['Venue', team.venue?.city],
    ['Conference', team.conference?.name],
    ['Division', team.division?.name],
    ['Franchise', team.franchise?.teamName],
  ].filter(([_, value]) => Boolean(value))

  return (
    <Loading loading={teamLoading} error={teamErrorMessage}>
      <div>
        <IGBanner 
          avatarUrl={teamAvatarUrl}
          header={<Typography variant='h5'>{team.name}</Typography>}
          secondary={teamDescriptionTags}
        />
        <Loading loading={rosterLoading} error={rosterErrorMessage}>
          <DenseTable
            title='Roster'
            rows={rosterRows}
            columns={ROSTER_COLUMNS}
          />
        </Loading>
      </div>
    </Loading>
  )
}