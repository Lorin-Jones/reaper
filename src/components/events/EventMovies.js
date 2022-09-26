import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import "./Events.css"

export const EventMovies = ({eventMovieArray}) => {

        const { eventId } = useParams()
        const [eventMovies, setEventMovies] = useState([])
        const [eventGuest, setEventGuest] = useState({})
        const [filteredEventMovies, setFiltered] = useState([])
        
        const localReaperUser = localStorage.getItem("reaper_user")
        const reaperUserObject = JSON.parse(localReaperUser)

    useEffect(() => {
        fetch(`http://localhost:8088/eventMovies?_expand=event&eventId=${eventId}`)
        .then(response => response.json())
        .then((eventArray) => {
            setEventMovies(eventArray)
        })
    }, [eventMovieArray])

    useEffect(() => {
        fetch(`http://localhost:8088/eventGuests?eventId=${eventId}&userId=${reaperUserObject.id}`)
        .then(response => response.json())
        .then((guestObj) => {
            setEventGuest(guestObj[0])
        })
    }, [eventId])

    

    useEffect(() => {
            const filteredMovies = []
        Promise.all(eventMovies.map(
            (movie) =>
                fetch(`https://api.themoviedb.org/3/movie/${movie.movieId}?api_key=87b7aa024b105f288752b38c3a90101d&with_genres=27&language=en-US`)
                    .then(response => response.json())
                    .then((filteredObj) => {
                        filteredMovies.push(filteredObj)
                    })
                    ))
                    .then(() => {
                        setFiltered(filteredMovies)
                    })
    }, [eventMovies])

    

    const HandleSaveButtonClick = (clickEvent, eventMovie, eventGuest) => {
        clickEvent.preventDefault()


        let increment = {
            movieId: eventMovie.movieId,
            eventId: eventMovie.eventId,
            numOfVotes: eventMovie.numOfVotes + 1,
            creatorId: eventMovie.creatorId
        }

        let voted = {
            userId: eventGuest.userId,
            eventId: eventGuest.eventId,
            hasVoted: true,
            isHost: eventGuest.isHost
            

        }
        
        
        fetch(`http://localhost:8088/eventGuests/${eventGuest.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(voted)
        })
            .then(response => response.json())
            .then(() => {
                return fetch(`http://localhost:8088/eventGuests?eventId=${eventId}&userId=${reaperUserObject.id}`)
            .then(response => response.json())
            .then((guestObj) => {
                setEventGuest(guestObj[0])
                fetch(`http://localhost:8088/eventMovies/${eventMovie.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(increment)
                })
                    .then(response => response.json())
                    .then(() => {
                        
                        return fetch(`http://localhost:8088/eventMovies?_expand=event&eventId=${eventId}`)
                            .then(response => response.json())
                            .then((eventArray) => {
                                
                                setEventMovies(eventArray)
                        })
                        })
                    })
                })
    }   


    return ( 
        <>
        <h2>Event Movies</h2>

        <article className="movies">
        
            {
                filteredEventMovies.map(
                    (filteredMovie) => 
                    {
                        
                       return eventMovies.map(
                            (eventMovie) => {
                                if (eventMovie.movieId === filteredMovie.id) {
                                        return <section className="movie">
                                    <div>
                                        <Link to={`/movies/${filteredMovie.id}`}><img src={`https://image.tmdb.org/t/p/w154${filteredMovie.poster_path}`}></img></Link>
                                    </div>
                                    <div>{filteredMovie.title}</div>
                                    <div>{filteredMovie.release_date}</div>
                                    <div>Votes: {eventMovie.numOfVotes}</div>
                                    
                                        {
                                            
                                            (!eventGuest.hasVoted) 
                                                ? <>
                                                            <button
                                                                onClick={(clickEvent) => HandleSaveButtonClick(clickEvent, eventMovie, eventGuest)}
                                                                className="movie_vote">
                                                                    Vote on Movie
                                                            </button>
                                                </> 
                                                :<></>
                                            
                                                            
                                        }
                                
                                </section>


                                }
                            }       
                                        
                                     
                                
                        )
                        
                    }
                    
                )
            }
        </article>
        
        </>
    
    )        
}