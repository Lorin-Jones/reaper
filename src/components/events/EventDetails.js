import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { EventGuests } from "./EventGuests"

import { EventUsersList } from "./EventUsersList"

export const EventDetails = () => {
    const {eventId} = useParams()
    const [event, updateEvent] = useState({})

    const localReaperUser = localStorage.getItem("reaper_user")
        const reaperUserObject = JSON.parse(localReaperUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/events?id=${eventId}&_expand=user&_embed=eventMovies`)
                .then(response => response.json())
                .then((data) => {
                    const singleEvent = data[0]
                    updateEvent(singleEvent)
                })
        },
        [eventId]
    )

    return <><section className="event">
    <header className="event_header">{event?.name}</header>
    <div>Hosted By {event?.user?.fullName}</div>
    <div>Location: {event?.user?.address}</div>
    <div>Date: {event.date}</div>
    <div>Time: {event.time}</div>
    
    </section>
        {
            reaperUserObject.id === event.userId
            ? <>
                <EventUsersList />
                <EventGuests />
            </>
            : <>
                <EventGuests />
            </>
        }
    </>
    
}