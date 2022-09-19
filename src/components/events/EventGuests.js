import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { EventUser } from "./EventUser"



export const EventGuests = () => {
    
    const [guests, setGuests] = useState([])
    const {eventId} = useParams()


    useEffect(
        () => {
            fetch(`http://localhost:8088/eventGuests?eventId=${eventId}&_expand=user`)
                .then(response => response.json())
                .then((userArray) => {
                    setGuests(userArray)
                })
       }, 
       []
    )

    return <>
                <h2>Event Guests</h2>

                <article className="users">
                    {
                        
                        guests.map(
                            (guest) => <EventUser key={`event_user--${guest.id}`}
                            id={guest.id}
                            name={guest.user.fullName} />
                            
                        )
                    
                    
                    }
                </article>
    </>
}
