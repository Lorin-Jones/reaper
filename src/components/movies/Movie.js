import { useState, useEffect } from "react"
import { Link } from "react-router-dom"





export const Movie = ({ id, image, title, releaseDate, getWatchList, userWatchList }) => {


    const localReaperUser = localStorage.getItem("reaper_user")
    const reaperUserObject = JSON.parse(localReaperUser)
    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const listItemToSendToApi = {
            movieId: id,
            userId: reaperUserObject.id,
            watched: false
        }

        return fetch(`http://localhost:8088/watchList`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(listItemToSendToApi)
        })
            .then(response => response.json())
            .then(() => {
                getWatchList()
            })
    }

    let isInWatchlist = false
    return <section className="movie">
        <div>
            <Link to={`/movies/${id}`}><img src={image}></img></Link>
        </div>
        <div>{title}</div>
        <div>{releaseDate}</div>
            
            {   
                userWatchList.map(
                    (movie) => {
                        
                        if (movie.movieId === id) {
                            isInWatchlist = true

                        }
                    }
                )

            }
            {
                !isInWatchlist && <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="movie_add">
                                    Add To Watchlist
                </button>
            }    
    </section>
}
