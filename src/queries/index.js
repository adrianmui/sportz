import queryString from 'query-string'

async function queryGetTeams() {
  const response = await fetch('https://statsapi.web.nhl.com/api/v1/teams')

  if (!response.ok) {
    throw response.statusText
  }

  const { teams = [] } = await response.json()

  return { resource: teams }
}

function queryGetTeamDetails(teamId, params = {}) {
  const qs = queryString.stringify(params)

  return async () => {
    const response = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}?${qs}`)
  
    if (!response.ok) {
      throw response.statusText
    }
  
    const { teams = [] } = await response.json()
  
    return { resource: teams[0] }
  }
}

function queryGetTeamRoster(teamId) {
  return async () => {
    const response = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}/roster`)

    if (!response.ok) {
      throw response.statusText
    }

    const { roster = [] } = await response.json()

    return { resource: roster }
  }
}

function queryGetPlayer(playerId) {
  return async () => {
    const response = await fetch(`https://statsapi.web.nhl.com/api/v1/people/${playerId}`)

    if (!response.ok) {
      throw response.statusText
    }

    const { people = [] } = await response.json()
  
    return { resource: people[0] }
  }
}

function queryGetPlayerCareerStats(playerId) {
  return async () => {
    const response = await fetch(`https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=yearByYear`)

    if (!response.ok) {
      throw response.statusText
    }

    const result = await response.json()

    return { resource: result?.stats?.[0]?.splits || [] }
  }
}

async function queryGetSearchPlayers(threeChar) {
  const response = await fetch(`https://suggest.svc.nhl.com/svc/suggest/v1/minplayers/${threeChar}/99999`)

  if (!response.ok) {
    throw response.statusText
  }

  const { suggestions = [] } = await response.json()

  // here i do some data massaging because this query is really brutal
  // trying to make it look more like the nhl.player model
  // example result = "8459064|Armstrong|Derek|0|0|6' 0\"|197|Ottawa|ON|CAN|1973-04-23|STL|C|17|derek-armstrong-8459064"
  
  const resource = suggestions.map(suggestionStr => suggestionStr.split('|'))
    .map(playerTuple => ({
      id: playerTuple[0],
      lastName: playerTuple[1],
      firstName: playerTuple[2],
      fullName: `${playerTuple[2]} ${playerTuple[1]}`,
      height: playerTuple[5],
      weight: playerTuple[6],
      birthCity: playerTuple[7],
      position: playerTuple[8],
      nationality: playerTuple[9],
      birthDate: playerTuple[10],
      primaryNumber: playerTuple[13],
    }))


  return { resource }  
}

export {
  queryGetTeams,
  queryGetTeamDetails,
  queryGetTeamRoster,
  queryGetPlayer,
  queryGetPlayerCareerStats,
  queryGetSearchPlayers,
}
