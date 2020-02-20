import React from 'react'

import { CircularProgress } from '@material-ui/core'

export function Loading({ 
  children,
  loading = false,
  error = '',
  ...restProps
}) {
  if (loading && !error) {
    return <CircularProgress />
  }

  if (!loading && error) {
    return <h1>{error}</h1>
  }

  if (!children) {
    return null
  }

  return children
}
