import { Outlet, Route, Routes } from "react-router-dom"
import { EventDetails } from "../events/EventDetails"
import { EventForm } from "../events/EventForm"
// import { EventForm } from "../events/EventForm"

import { EventList } from "../events/EventList"
import { MovieDetails } from "../movies/MovieDetails"
import { MovieList } from "../movies/MovieList"
import { UserList } from "../users/UserList"
// import { UserProfile } from "../users/UserProfile"
import { WatchList } from "../watch/WatchList"

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
                <Route path="/movies" element={ <MovieList /> } />
                <Route path="/watchlist" element={ <WatchList /> } />
                <Route path="/movies/:movieId" element={ <MovieDetails /> } />
                <Route path="/events" element={ <EventList />} />
                <Route path="events/:eventId" element={ <EventDetails />} />
                <Route path="/new-event" element={ <EventForm /> } /> 
            </Route>
        </Routes>
    )
}