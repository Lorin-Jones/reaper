import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const UserNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/users">Users</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/movies">Movies</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/watchlist">Watch List</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/events">Events</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/new-event">Create Event</Link>
            </li>
            
            {
                localStorage.getItem("reaper_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("reaper_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}
