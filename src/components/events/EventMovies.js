import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./WatchList.css"

export const EventDetails = ({}) => {

    
        const [eventMovies, setEventMovies] = useState([])
        const [filteredMovies, setFiltered] = useState([])
        
        const localReaperUser = localStorage.getItem("reaper_user")
        const reaperUserObject = JSON.parse(localReaperUser)

    useEffect(() => {
        fetch(`http://localhost:8088/eventMovies?_expand=event&eventId=${reaperUserObject.id}`)
            .then(response => response.json())
            .then((eventArray) => {
                setEventMovies(eventArray)
            })
       
    }, [])
        
    

    useEffect(() => {
            const filteredMovies = []
        Promise.all(listMovies.map(
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
    }, [listMovies])


    const deleteButton = (movie) => {
        return <button onClick={() => {
            listMovies.map((listItem) => {
                if (listItem.movieId === movie.id) {
                    fetch(`http://localhost:8088/watchList/${listItem.id}`, {
                        method: "DELETE"
                    })
                    .then(() => {
                        fetch(`http://localhost:8088/watchList?_expand=user&userId=${reaperUserObject.id}`)
                        .then(response => response.json())
                        .then((listArray) => {
                            setList(listArray)
                        })
                    })

                }
            })
        }} className="movie_delete">Remove From Watchlist</button>

    }


    return ( 
        <>
        <h2>{reaperUserObject.fullName}'s Watch List</h2>

        <article className="movies">
        
            {
                filteredMovies.map(
                    (movie) => 
                    <section className="movie">
                    <div>
                        <Link to={`/movies/${movie.id}`}><img src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}></img></Link>
                    </div>
                    <div>{movie.title}</div>
                    <div>{movie.release_date}</div>
                    {deleteButton(movie)}
                    </section>
                    
                )
            }
        </article>
        
        </>
    
    )        
}