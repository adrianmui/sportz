import React from 'react'
import { Typography, Card, CardContent, Toolbar } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: { 
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: ' wrap',
  },
  field: {
    width: '33%',
    display: 'flex',
    flexDirection: 'row',
  },
  field__propertyName: {
    flex: '40%',
    justifyContent: 'flex-start',
    color: theme.palette.text.disabled,
    marginRight: '0.5rem',
  },
  field__propertyValue: {
    flex: '60%',
    justifyContent: 'flex-start',
  }
}))

export function PlayerProfileAboutMe({ player = {} }) {
  const classes = useStyles()

  let playerPosition = player.position?.type
    
  if (player.position?.name !== playerPosition) {
    const positionName = player.position?.name  
    playerPosition = `${playerPosition} - ${positionName}`
  }

  const fieldTuples = [
    ['Name', player.name],
    ['Age', player.currentAge],
    ['Number', player.primaryNumber],
    ['Position', playerPosition],
    ['Dominant Hand', player.shootsCatches],
    ['Nationality', player.nationality],
    ['Captain', player.captain ? 'Yes' : 'No'],
    ['Rookie', player.rookie ? 'Yes' : 'No'],
  ].filter(([_, fieldValue]) => Boolean(fieldValue))

  const playerProperties = fieldTuples.map(([fieldKey, fieldValue], key) => (
    <div key={key} className={classes.field}>
      <div className={classes.field__propertyName}>
        <Typography variant='body1'>{fieldKey}</Typography>
      </div>
      <div className={classes.field__propertyValue}>
      <Typography variant='body1'>{fieldValue}</Typography>
      </div>
    </div>
  ))

  return (
    <Card>
      <Toolbar>
      <Typography variant="h6">
        Player Profile
      </Typography>
    </Toolbar>
      <CardContent>
        <div className={classes.root}> 
          {playerProperties}
        </div>
      </CardContent>
    </Card>
  )
}