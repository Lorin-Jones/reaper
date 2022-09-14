import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const MovieDetails = () => {
    const {movieId} = useParams()
    const [movie, updateMovie] = useState([])

    useEffect(
        () => {
            fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=87b7aa024b105f288752b38c3a90101d&language=en-US`)
                .then(response => response.json())
                .then((data) => {
                    updateMovie(data)
                })
        },
        [movieId]
    )

    return <section className="movie">
    <div><img src={`https://image.tmdb.org/t/p/w780/${movie?.poster_path}`}></img></div>
    <header className="movie__header">{movie?.title}</header>
    <div>{movie?.overview}</div>
    <div>{movie?.release_date}</div>
    <div>{movie?.runtime} minutes</div>
    
</section>
}