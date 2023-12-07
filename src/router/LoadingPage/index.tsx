import { useEffect } from 'react'
import Nprogress from 'nprogress'
import './index.scss'

const LoadingPage = () => {
  useEffect(() => {
    Nprogress.start()

    return () => {
      Nprogress.done(true)
    }
  }, [])


  return (
    <div className="loadingPage">

    </div>
  )
}

export default LoadingPage
