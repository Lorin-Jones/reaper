import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import "./Events.css"

export const EventMovies = () => {

        const { eventId } = useParams()
        const [eventMovies, setEventMovies] = useState([])
        const [filteredEventMovies, setFiltered] = useState([])
        
        const localReaperUser = localStorage.getItem("reaper_user")
        const reaperUserObject = JSON.parse(localReaperUser)

    useEffect(() => {
        fetch(`http://localhost:8088/eventMovies?_expand=event&eventId=${eventId}`)
            .then(response => response.json())
            .then((eventArray) => {
                setEventMovies(eventArray)
            })
       
    }, [])
        
    

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


    const deleteButton = (movie) => {
        return <button onClick={() => {
            eventMovies.map((eventMovie) => {
                if (eventMovie.movieId === movie.id) {
                    fetch(`http://localhost:8088/eventMovies/${eventMovie.id}`, {
                        method: "DELETE"
                    })
                    .then(() => {
                        fetch(`http://localhost:8088/eventMovies?_expand=event&eventId=${eventId}`)
                        .then(response => response.json())
                        .then((eventArray) => {
                            setEventMovies(eventArray)
                        })
                    })

                }
            })
        }} className="movie_delete">Remove From Event</button>

    }


    return ( 
        <>
        <h2>Recommend A Movie</h2>

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
                    {deleteButton(filteredMovie)}
                    </section>
                    
                )
            }
        </article>
        
        </>
    
    )        
}