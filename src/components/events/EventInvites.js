
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { User } from "../users/User"
import { UserList } from "../users/UserList"


export const EventInvites = () => {

    const [users, setUsers] = useState([])
    const [eventGuests, setEventGuests] =useState([])
    const {eventId} = useParams()

    const localReaperUser = localStorage.getItem("reaper_user")
    const reaperUserObject = JSON.parse(localReaperUser)
    

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
    
    
    useEffect(() => {
        fetch(`http://localhost:8088/eventGuests?eventId=${eventId}&_expand=user&_expand=event`)
            .then(response => response.json())
            .then((eventGuestArray) => {
                setEventGuests(eventGuestArray)
            })
        
    }, [users])

    const handleSaveButtonClick = (user) => {
        user.preventDefault()

        const eventItemToSendToApi = {
            eventId: eventId,
            userId: user.id,
            hasVoted: false
            
        }

        return fetch(`http://localhost:8088/eventGuests`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventItemToSendToApi)
        })
            .then(response => response.json())
            .then(() => {
                
            })
    }

    return <article className="users">
        {
            users.map(
                (user) => 
                user.id === 
                <section className="users"></section>)
        }
    </article>
    
        
    
}