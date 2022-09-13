import { Outlet, Route, Routes } from "react-router-dom"
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

                
                {/* <Route path="profile" element={ <Profile /> } /> */}
            </Route>
        </Routes>
    )
}