import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { setupInterceptors } from "./Interceptors"


function InjectAxiosInterceptors () {
  const navigate = useNavigate()

  useEffect(() => {
    console.log('this effect is called once')
    setupInterceptors(navigate)

  }, [navigate])

  // not rendering anything
  return null
}

export default InjectAxiosInterceptors