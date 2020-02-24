import React from 'react';
import { Link as RouterLink } from 'react-router-dom'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

import { IGBanner } from 'components/IGBanner';
import { DenseTable } from 'components/DenseTable';
import { Loading } from 'components/Loading';


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
  panelDetails: {
    padding: 0,
  },
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

export function TeamProfile({
  teamLoading,
  teamErrorMessage,
  team,
  rosterLoading,
  rosterErrorMessage,
  roster,
}) {
  const classes = useStyles()

  const rosterRows = roster.map(player => {
    const playerAvatarUrl = `https://nhl.bamcontent.com/images/headshots/current/60x60/${player.person.id}.jpg`

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
          <Typography className={classes.nameName} component='span'>
            {player.person.fullName}
          </Typography>
        </Link>
      ),
      position: playerPosition
    }
  })

  const teamDescription = [
    ['Venue', team.venue?.city],
    ['Conference', team.conference?.name],
    ['Division', team.division?.name],
    ['Franchise', team.franchise?.teamName],
  ].filter(([_, value]) => Boolean(value))
    .map(([label, value], index) => `${label}: ${value}`)
    .join(' / ')

  return (
    <Loading loading={teamLoading} error={teamErrorMessage}>
      <IGBanner 
        avatarUrl={`http://www-league.nhlstatic.com/nhl.com/builds/site-core/d1b262bacd4892b22a38e8708cdb10c8327ff73e_1579810224/images/logos/team/current/team-${team.id}-light.svg`}
        header={<Typography variant='h5'>{team.name}</Typography>}
        secondary={teamDescription}
      />
      <ExpansionPanel key='expand-1'>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>Schedule</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.panelDetails}>
          <Typography>
            summary.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel key='expand-2'>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography>Team Stats</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.panelDetails}>
          <Typography>
            stats.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel key='expand-3' defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel3a-content'
          id='panel3a-header'
        >
          <Typography>Roster</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.panelDetails}>
          <Loading loading={false} error={rosterErrorMessage}>
            <DenseTable
              hideColumns
              rows={rosterRows}
              columns={ROSTER_COLUMNS}
            />
          </Loading>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Loading>
  )
}
