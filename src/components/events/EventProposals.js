
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import "../watch/WatchList.css"

import { EventMovies } from "./EventMovies"

export const EventProposals = ({}) => {

    
    const [listMovies, setList] = useState([])
    const [filteredMovies, setFiltered] = useState([])
    const [eventMovies, setEventMovies] = useState([])
    const localReaperUser = localStorage.getItem("reaper_user")
    const reaperUserObject = JSON.parse(localReaperUser)
    const {eventId} = useParams()
    useEffect(() => {
        fetch(`http://localhost:8088/watchList?_expand=user&userId=${reaperUserObject.id}`)
            .then(response => response.json())
            .then((listArray) => {
                const nonEventListMovies = listArray.filter(listItem => listItem.movieId !== eventMovies.movieId)
                setList(nonEventListMovies)
            })
       
    }, [eventMovies])
        
    useEffect(() => {
        fetch(`http://localhost:8088/eventMovies?eventId=${eventId}`)
            .then(response => response.json())
            .then((listArray) => {
                setEventMovies(listArray)
            })
    }, [])

    useEffect(() => {
            const filtered = []
        Promise.all(listMovies.map(
            (movie) =>
                fetch(`https://api.themoviedb.org/3/movie/${movie.movieId}?api_key=87b7aa024b105f288752b38c3a90101d&with_genres=27&language=en-US`)
                    .then(response => response.json())
                    .then((filteredObj) => {
                        filtered.push(filteredObj)
                    })
                    ))
                    .then(() => {
                        setFiltered(filtered)
                    })
    }, [listMovies])

    
    const HandleSaveButtonClick = (clickEvent, movie) => {
        clickEvent.preventDefault()


        const listItemToSendToApi = {
            movieId: parseInt(movie.id),
            eventId: parseInt(eventId),
            numOfVotes: 0,
            creatorId: reaperUserObject.id,
            
        }
        
        return fetch(`http://localhost:8088/eventMovies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(listItemToSendToApi)
        })
            .then(response => response.json())
            .then(() => {
                fetch(`http://localhost:8088/eventMovies?eventId=${eventId}`)
                    .then(response => response.json())
                    .then((listArray) => {
                        setEventMovies(listArray)
                        
            
                })
            })
    }

     
    return (
        <>
        <h2>Propose a Movie!</h2>

        <article className="movies">
        
            {
                filteredMovies.map(
                    (movie) => 
                    {       
                        let inMovieList = false
                        let alreadyPromoted = false
                        eventMovies.map(
                            (eventMovieObj) => {
                                if (movie.id === eventMovieObj.movieId) {
                                    inMovieList = true
                                }
                            }
                        )
                        
                        if (!inMovieList) {
                            return <section className="movie">
                        <div>
                            <Link to={`/movies/${movie.id}`}><img src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}></img></Link>
                        </div>
                        <div>{movie.title}</div>
                        <div>{movie.release_date}</div>
                        <button
                            onClick={(clickEvent) => HandleSaveButtonClick(clickEvent, movie)}
                            className="movie_add">
                                Add To Event
                        </button>
                        </section>

                        }


                    }
    
                )
    
            }
        </article>
        <article>
            <EventMovies eventMovieArray={eventMovies}/>
        </article>
        
        </>
    )
            
}