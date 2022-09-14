//fetch movie data base for only movies from the horror genre
import { useState, useEffect } from "react"
import { Movie } from "./Movie"

//
export const MovieList = () => {
    const [movies, setMovies] = useState([])

    const localReaperUser = localStorage.getItem("reaper_user")
    const reaperUserObject = JSON.parse(localReaperUser)

    useEffect(
        () => {
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=87b7aa024b105f288752b38c3a90101d&with_genres=27&language=en-US&page=1`)
                .then(response => response.json())
                .then((horrorListObj) => {
                    setMovies(horrorListObj.results)
                })
        
        }, [])

        return <>
      
        <h2>List of Movies</h2>

        <article className="movies">
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
        </article>
        </>

}

