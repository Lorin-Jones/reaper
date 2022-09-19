import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { EventUser } from "./EventUser"



export const EventUsersList = () => {
    const [users, setUsers] = useState([])
    const [event, setEvent] = useState([])
    const [guests, setGuests] = useState([])
    const {eventId} = useParams()

    const localReaperUser = localStorage.getItem("reaper_user")
        const reaperUserObject = JSON.parse(localReaperUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/users`)
                .then(response => response.json())
                .then((userArray) => {
                    setUsers(userArray)
                })
       }, 
       []
    )

    return <>
                <h2>Create A Guest List</h2>

                <article className="users">
                    {
                        
                        users.map(
                            (user) => <EventUser key={`event_user--${user.id}`}
                            id={user.id}
                            name={user.fullName} />
                            
                        )
                    
                    
                    }
                </article>
    </>

    

{/* <article className="movies">
{
    movies.map(
        (movie) => <Movie key={`movie--${movie.id}`}
        id={movie.id}
        image={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
        title={movie.title} 
        releaseDate={movie.release_date}
        description={movie.overview}
         />
    )
   
}
</article> */}
}
