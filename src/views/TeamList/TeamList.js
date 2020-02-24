import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { sortBy } from 'lodash'

import Avatar from '@material-ui/core/Avatar'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';

import { DenseTable } from 'components/DenseTable'
import { Loading } from 'components/Loading';

const TEAM_COLUMNS = [
  {
    label: 'Name',
    property: 'name',
  },
  {
    label: 'Division',
    property: 'division.name',
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
  },
  mui: {
    borderRadius: '1.5rem',
    boxShadow: '0 1px 6px 0 rgba(32, 33, 36, 0.28)',
    borderColor: 'rgba(223, 225, 229, 0)',
  },
})

export function TeamList({
  teams,
  teamsLoading,
  teamsErrorMessage,
}) {
  const classes = useStyles()

  const teamRows = sortBy(teams.map(team => {
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
          <Typography className={classes.nameName} component='span'>
            {team.name}
          </Typography>
        </Link>
      ),
    }
  }), 'division.name')
  const westernTeamRows = teamRows.filter(({ conference }) =>
    conference?.name === 'Western')
  const easternTeamRows = teamRows.filter(({ conference }) =>
    conference?.name === 'Eastern')

  return (
    <Grid container spacing={4}>
      <Loading loading={teamsLoading} error={teamsErrorMessage}>
        <Grid item xs={12} md={6}>
          <DenseTable
              className={classes.mui}
              hideColumns
              title='Eastern Conference'
              rows={easternTeamRows}
              columns={TEAM_COLUMNS}
              u
            />
        </Grid>
        <Grid item xs={12} md={6}>
          <DenseTable
            hideColumns
            className={classes.mui}
            title='Western Conference'
            rows={westernTeamRows}
            columns={TEAM_COLUMNS}
          />
        </Grid>
      </Loading>
    </Grid>
  )
}
