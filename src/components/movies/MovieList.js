//fetch movie data base for only movies from the horror genre

import { Movie } from "./Movie"

//
export const MovieList = () => {
    const [movies, setMovies] = useState([])

    const localReaperUser = localStorage.getItem("reaper_user")
    const reaperUserObject = JSON.parse(localReaperUser)

    useEffect(
        () => {
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=87b7aa024b105f288752b38c3a90101d&with_genres=27&language=en-US`)
                .then(response => response.json())
                .then((horrorArray) => {
                    setMovies(horrorArray)
                })
        
        }, [])

        return <>
      
        <h2>List of Movies</h2>

        <article className="tickets">
            {
                movies.map(
                    (movie) => <Movie users={users}
                    getAllTickets={getAllTickets}
                    currentUser={honeyUserObject} 
                    ticketObject={ticket} />
                )
            }
        </article>
        </>

}

