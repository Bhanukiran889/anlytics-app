import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!Cookies.get("jwt_token")) {
          navigate("/login", { replace: true });
        }
        }, [navigate]);

     const handleLogout = () => {
        Cookies.remove("jwt_token");
        navigate("/login", { replace: true });
      };
  return (
      <div className="p-6">
        <div className="flex justify-between items-center">
          <Button variant="default" onClick={handleLogout}>
            Logout
          </Button>
          <ModeToggle />
        </div>
      </div>
  )
}

export default Navbar
