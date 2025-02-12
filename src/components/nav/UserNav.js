import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { AppBar, Box, Button, Toolbar } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { REAPER_LOGO } from "../../assets/constants"

export const UserNav = () => {
    const navigate = useNavigate()
    const classes = useStyles()

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Button color={'inherit'} component={Link} to={'/movies'}>{'Movies'}</Button>
                    <Button color={'inherit'} component={Link} to={'/watchlist'}>{'Watch List'}</Button>
                    <Button color={'inherit'} component={Link} to={'/events'}>{'Events'}</Button>
                    <Button color={'inherit'} component={Link} to={'/new-event'}>{'New Event'}</Button>
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
}

const useStyles = makeStyles(() => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
}))
