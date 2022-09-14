import { useCallback, useState, useEffect } from "react"
import { User } from "./User"
import "./Users.css"



export const UserList = () => {
    const [users, setUsers] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users`)
                .then(response => response.json())
                .then((userArray) => {
                    setUsers(userArray)
                })
       }, 
       []
    )

    return <article className="users">
        {
            users.map(user => <User key={`user--${user.id}`}
                id={user.id} 
                fullName={user.fullName} 
                email={user.email} 
                address={user.address}/>)
        }
    </article>
}