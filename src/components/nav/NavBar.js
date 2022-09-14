import { Link, useNavigate } from "react-router-dom"
import { UserNav } from "./UserNav"
import "./NavBar.css"

export const NavBar = () => {
    const localReaperUser = localStorage.getItem("reaper_user")
    const reaperUserObject = JSON.parse(localReaperUser)

    if (reaperUserObject) {
        return UserNav()

    }
}
