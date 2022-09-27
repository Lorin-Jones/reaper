//fetch movie data base for only movies from the horror genre
import { useState, useEffect } from "react"
import { Movie } from "./Movie"
import Button from 'react-bootstrap/Button';
import "./Movies.css"

export const MovieList = () => {
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState({})
    const [userWatchList, setUserWatchList] = useState([])

    const localReaperUser = localStorage.getItem("reaper_user")
    const reaperUserObject = JSON.parse(localReaperUser)

    const getWatchList = () => {
        fetch(`http://localhost:8088/watchList?userId=${reaperUserObject.id}`)
                .then(response => response.json())
                .then((watchListArray) => {
                    setUserWatchList(watchListArray)
                })
    }
    
    getWatchList()

    useEffect(
        () => {
            

            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=87b7aa024b105f288752b38c3a90101d&with_genres=27&language=en-US&page=1`)
                .then(response => response.json())
                .then((horrorListObj) => {
                    setMovies(horrorListObj.results)
                    setPage(horrorListObj.page)
                })
        
        }, [])
    //fetch user's watchlist in a function. store the function as a prop. pass prop to movie mod.
    
    const pageUpButton = (event) => {
        event.preventDefault()

        const pageUp = page + 1

        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=87b7aa024b105f288752b38c3a90101d&with_genres=27&language=en-US&page=${pageUp}`)
                .then(response => response.json())
                .then((horrorListObj) => {
                    setMovies(horrorListObj.results)
                    setPage(horrorListObj.page)
                })
           
    
    }
    const pageDownButton = (event) => {
        event.preventDefault()

        if (page > 1) {
            const pageDown = page - 1

            
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=87b7aa024b105f288752b38c3a90101d&with_genres=27&language=en-US&page=${pageDown}`)
            .then(response => response.json())
            .then((horrorListObj) => {
                setMovies(horrorListObj.results)
                setPage(horrorListObj.page)
            })
        }
           
    
    }

        return <>
                
                <Button
                    variant="danger"
                    onClick={(clickEvent) => pageDownButton(clickEvent)}
                    className="page">
                    Page Down
                </Button>
                <Button
                    variant="danger"
                    onClick={(clickEvent) => pageUpButton(clickEvent)}
                    className="page">
                    Page Up
                </Button>
      
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
                    getWatchList={getWatchList} 
                    userWatchList={userWatchList}
                    />
                )
               
            }
        </article>
        </>

}

