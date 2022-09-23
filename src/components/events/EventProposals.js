//this should render all the items in the logged in user's watchlist 
//selecting a movie to watch will render the movie in the eventMovies watchlist
//add movie button will add eventmovie to the api and then fetch the current state of eventMovie
//selecting a movie will remove the movie from the user's watchlist.
//html should only print the user's movie if it is not in the eventMovie watchlist
// eventmovies is distinct module, so eventMovies state should pass as a prop to EventMovies.
//refreshing eventMovies should refresh html in EventMovies module
//render should handle filtering, not fetch calls.
//when button updates eventMovies, eventMovies needs to be watching and able to rerender
//state of listMovies should be passed as prop to eventMovies
//user can only add one movie to eventMovies
//on click. map through eventMovies, if creatorId !== reaperUserObj.id, return fetch
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

    // const deleteButton = (movie) => {
    //     return <button onClick={() => {
    //         listMovies.map((listItem) => {
    //             if (listItem.movieId === movie.id) {
    //                 fetch(`http://localhost:8088/watchList/${listItem.id}`, {
    //                     method: "DELETE"
    //                 })
    //                 .then(() => {
    //                     fetch(`http://localhost:8088/watchList?_expand=user&userId=${reaperUserObject.id}`)
    //                     .then(response => response.json())
    //                     .then((listArray) => {
    //                         setList(listArray)
    //                     })
    //                 })

    //             }
    //         })
    //     }} className="movie_delete">Remove From Watchlist</button>

    // }
 
     
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