import { Link } from "react-router-dom"

export const User = ({ id, fullName, email, address }) => {
    return <section className="user">
        <div>
            <label id={`user--${id}`}>Name: {fullName}</label>    
        </div>
        <div>Email: {email}</div>
        <div>Address: {address}</div>
    </section>
}