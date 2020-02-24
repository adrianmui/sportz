import { useLocation, useHistory } from 'react-router-dom'
import queryString from 'query-string'

function useQueryParam() {
  const { search, pathname } = useLocation()
  const history = useHistory()
  const query = queryString.parse(search, {
    arrayFormat: 'bracket'
  })

  const makeQuery = (obj: Object) => (
    queryString.stringify(obj, {
      arrayFormat: 'bracket',
      skipNull: true
    })
  )

  const setQuery = (obj: Object) => history.push(`?${makeQuery(obj)}`)

  const mergeQuery = (obj: Object) => history.push(`?${makeQuery({ ...query, ...obj })}`)

  const clearQuery = () => history.push(pathname)

  return {
    query,
    makeQuery,
    setQuery,
    mergeQuery,
    clearQuery
  }
}
export { useQueryParam }
