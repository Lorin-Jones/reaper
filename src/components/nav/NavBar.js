import { Link, useNavigate } from "react-router-dom"
import { UserNav } from "./UserNav"
import "./NavBar.css"

export const NavBar = () => {
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    return UserNav()
}
