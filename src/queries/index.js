async function queryGetTeams() {
  const response = await fetch('https://statsapi.web.nhl.com/api/v1/teams')

  if (!response.ok) {
    throw response.statusText
  }

  const { teams = [] } = await response.json()

  return { resource: teams }
}

function queryGetTeam(teamId) {
  return async () => {
    const response = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}`)
  
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

export {
  queryGetTeams,
  queryGetTeam,
  queryGetTeamRoster,
  queryGetPlayer,
  queryGetPlayerCareerStats,
}
