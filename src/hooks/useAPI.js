import { useEffect, useState, useRef, useDebugValue } from 'react'

const DEFAULT_OPTIONS = {
  allowErrorMessage: false,
  errorMessage: 'An error occurred.',
}

export function useAPI(
  fn,
  initResourceValue = null,
  options = DEFAULT_OPTIONS
) {
  useDebugValue(fn.name || 'useAPI')

  const [result, setResult] = useState(null)
  const [resource, setResource] = useState(initResourceValue)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const mounted = useRef(false)
  const callsRef = useRef(0)

  useEffect(function mountUnmount() {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])


  const execute = async () => {
    callsRef.current += 1
    const callNum = callsRef.current

    setLoading(true)
    setErrorMessage(null)

    let response, err

    try {
      response = await fn()
    } catch (e) {
      err = e
    }

    // if execute has been called again, or we are no longer mounted, return.
    // in the case of execute being called again, only the final pass will complete through.
    if (callNum !== callsRef.current || mounted.current === false) {
      return undefined
    }

    setLoading(false)

    if (err) {
      setErrorMessage(options.allowErrorMessage ? err.message : options.errorMessage)
      if (process.env.NODE_ENV === 'development') {
        console.error('DEVELOPMENT ERROR', err)
      }
    } else {
      setResult(response)
      setResource(response?.resource)
    }

    return { response, err }
  }

  return {
    execute,
    result,
    resource,
    errorMessage,
    loading
  }
}
