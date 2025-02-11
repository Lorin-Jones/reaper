import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { AppBar, Box, Button, Toolbar } from "@mui/material"

export const UserNav = () => {
    const navigate = useNavigate()

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Button color={'inherit'} component={Link} to={'/movies'}>{'Movies'}</Button>
                    <Button color={'inherit'} component={Link} to={'/watchlist'}>{'Watch List'}</Button>
                    {
                        localStorage.getItem("reaper_user")
                            ? 
                            <Button color={'inherit'} onClick={() => {
                                localStorage.removeItem("reaper_user")
                                navigate("/", {replace: true})
                            }}>{'Logout'}</Button>
                            : ""
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )

    // return (
       
    //     <ul className="navbar">
    //         <li className="navbar__item active">
    //             <Link className="navbar__link" to="/users">Users</Link>
    //         </li>
    //         <li className="navbar__item active">
    //             <Link className="navbar__link" to="/movies">Movies</Link>
    //         </li>
    //         <li className="navbar__item active">
    //             <Link className="navbar__link" to="/watchlist">Watch List</Link>
    //         </li>
    //         <li className="navbar__item active">
    //             <Link className="navbar__link" to="/events">Events</Link>
    //         </li>
    //         <li className="navbar__item active">
    //             <Link className="navbar__link" to="/new-event">Create Event</Link>
    //         </li>
            
    //         {
    //             localStorage.getItem("reaper_user")
    //                 ? <li className="navbar__item navbar__logout">
    //                     <Link className="navbar__link" to="" onClick={() => {
    //                         localStorage.removeItem("reaper_user")
    //                         navigate("/", {replace: true})
    //                     }}>Logout</Link>
    //                 </li>
    //                 : ""
    //         }
    //     </ul>
    // )
}
