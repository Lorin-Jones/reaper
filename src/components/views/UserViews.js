import { Outlet, Route, Routes } from "react-router-dom"
import { UserList } from "../users/UserList"
import { UserProfile } from "../users/UserProfile"
// import { Profile } from "../profile/Profile"

export const UserViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Reaper</h1>
                    <div>A Friendly Fright Night Movie Picker</div>

                    <Outlet />
                </>
            }>

                
                <Route path="/users" element={ <UserList /> } />
            </Route>
        </Routes>
    )
}