import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import "./Events.css"

export const EventMovies = ({eventMovieArray}) => {

        const { eventId } = useParams()
        const [eventMovies, setEventMovies] = useState([])
        const [filteredEventMovies, setFiltered] = useState([])
        
        const localReaperUser = localStorage.getItem("reaper_user")
        const reaperUserObject = JSON.parse(localReaperUser)

    
    

    useEffect(() => {
            const filteredMovies = []
        Promise.all(eventMovieArray.map(
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
    }, [eventMovieArray])

    

    const HandleSaveButtonClick = (clickEvent, eventMovie) => {
        clickEvent.preventDefault()


        let increment = {
            movieId: eventMovie.movieId,
            eventId: eventMovie.eventId,
            numOfVotes: eventMovie.numOfVotes + 1,
            creatorId: eventMovie.creatorId
        }

        return fetch(`http://localhost:8088/eventMovies/${eventMovie.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(increment)
        })
            .then(response => response.json())
            .then(() => {
                fetch(`http://localhost:8088/eventMovies?_expand=event&eventId=${eventId}`)
                    .then(response => response.json())
                    .then((eventArray) => {
                        setEventMovies(eventArray)
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
                     <section className="movie">
                    <div>
                        <Link to={`/movies/${filteredMovie.id}`}><img src={`https://image.tmdb.org/t/p/w154${filteredMovie.poster_path}`}></img></Link>
                    </div>
                    <div>{filteredMovie.title}</div>
                    <div>{filteredMovie.release_date}</div>
                        {
                            eventMovies.map(
                                (eventMovie) => {
                                    if (filteredMovie.id === eventMovie.movieId) {
                                        return <>
                                            <div>Votes: {eventMovie.numOfVotes}</div>
                                            <button
                                                onClick={(clickEvent) => HandleSaveButtonClick(clickEvent, eventMovie)}
                                                className="movie_add">
                                                    Vote on Movie
                                            </button>
                                        </>
                                        
                                    }   
                                }
                            )
                        }
                    </section>
                    
                )
            }
        </article>
        
        </>
    
    )        
}