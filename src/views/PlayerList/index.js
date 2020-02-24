/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import { DenseTable } from 'components/DenseTable';
import { Loading } from 'components/Loading';
import { CustomizedInputBase } from 'components/CustomizedInputBase';
import { useAPI } from 'hooks/useAPI';
import { queryGetSearchPlayers } from 'queries';
import { useGoogleStyles } from 'styles';
import { useQueryParam } from 'hooks/useQueryParam';

const SEARCH_COLUMNS  = [
  {
    label: 'Player Name',
    property: 'fullName',
  },
  {
    label: 'Position',
    property: 'position',
  },
  {
    label: 'Height',
    property: 'height',
  },
  {
    label: 'Weight',
    property: 'weight',
  },
  {
    label: '#',
    property: 'primaryNumber',
  },
  {
    label: 'Nationality',
    property: 'nationality',
  },
]

const useStyles = makeStyles(theme => ({
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
  hint: {
    color: theme.palette.text.secondary,
  },
}))

export function PlayerList() {
  const classes = useStyles()
  const googleStyles = useGoogleStyles()

  const [cachedPlayers, setCachedPlayers] = useState([])
  const getPlayersFetcher = useAPI(queryGetSearchPlayers, [])
  const { query: { search = '' }, mergeQuery } = useQueryParam()

  const {
    errorMessage: searchErrorMessage,
    loading: searchLoading,
    resource: players
  } = getPlayersFetcher

  useEffect(function initLoaded() {
    const loadAndSetCachedPlayers = async () => {
      const exactlyThree = search.length === 3
      const queryingIntoPage = (search.length > 3 && players.length === 0)

      if (exactlyThree || queryingIntoPage) {
        const { response } = await getPlayersFetcher.execute(search)

        setCachedPlayers(response.resource)
      }
    }

    loadAndSetCachedPlayers()
  }, [search])
  
  const handleSetSearch = event => {
    const searchValue = event.target?.value || ''
    
    mergeQuery({ search: searchValue })
    
    if (searchValue.length > 3) {
      const filteredPlayers = players.filter(({ fullName }) =>
        fullName.includes(searchValue))

      setCachedPlayers(filteredPlayers)
    }

    if (!searchValue.length) {
      setCachedPlayers([])
    }
  }

  const cachedPlayerRows = cachedPlayers.map(player => {
    const playerAvatarUrl = `https://nhl.bamcontent.com/images/headshots/current/60x60/${player.id}.jpg`

    return {
      ...player,
      fullName: (
        <Link
          className={classes.nameContainer}
          component={RouterLink}
          to={`/players/${player.id}/profile`}
        >
          <Avatar className={classes.nameLogo} src={playerAvatarUrl} />
          <Typography className={classes.nameName} component='span'>
            {player.fullName}
          </Typography>
        </Link>
      ),
    }
  })

  return (
    <div>
      <CustomizedInputBase onSearch={handleSetSearch} value={search} />
      <br/>
      {search.length >= 3 && (
        <Typography className={classes.hint} variant='body1' gutterBottom>
          Note: This is a note that hints to the user how this search is done.
        </Typography>
      )}
      <br/>
      <Divider />
      <br />
      <Loading loading={searchLoading} errorMessage={searchErrorMessage}>
        <DenseTable 
          className={googleStyles.cards}
          rows={cachedPlayerRows}
          columns={SEARCH_COLUMNS}
        />
      </Loading>
    </div>
  )
}
