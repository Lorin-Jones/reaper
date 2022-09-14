import { Link } from "react-router-dom"

export const Movie = ({ id, image, title, releaseDate }) => {
    return <section className="movies">
        <div>
            <Link to={`/movies/${id}`}><img src={image}></img></Link>
        </div>
        <div>{title}</div>
        <div>{releaseDate}</div>
    </section>
}