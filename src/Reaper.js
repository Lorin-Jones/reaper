import { Route, Routes } from "react-router-dom"
import { ApplicationViews } from "./components/views/ApplicationViews"
import { Authorized } from "./components/views/Authorized"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { NavBar } from "./components/nav/NavBar"


import "./Reaper.css"
import { Box } from "@mui/material"
import { makeStyles } from "@mui/styles"



export const Reaper = () => {
	const classes = useStyles();

	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<Authorized>
				<Box className={classes.root}>
					<NavBar />
					<ApplicationViews />
				</Box>
			</Authorized>

		} />
	</Routes>
}

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.main
	}
}))