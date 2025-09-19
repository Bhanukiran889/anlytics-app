import React, { useEffect } from "react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

const Dashboard = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect if no token
    if (!Cookies.get("jwt_token")) {
      navigate("/login", { replace: true })
    }
  }, [navigate])

  const handleLogout = () => {
    Cookies.remove("jwt_token")
    navigate("/login", { replace: true })
  }

  return (
    <div className="p-4">
        <div className="flex justify-between items-center">
            
      <Button variant="default" onClick={handleLogout}>
        Logout
      </Button>
      <ModeToggle />
        </div>
      <h1 className="mt-4 text-2xl font-bold">
        Welcome to the Dashboard
      </h1>
    </div>
  )
}

export default Dashboard
