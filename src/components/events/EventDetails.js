import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const EventDetails = () => {
    const {eventId} = useParams()
    const [event, updateEvent] = useState({})

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

    return <section className="event">
    <header className="event_header">{event?.name}</header>
    <div>Hosted By {event?.user?.fullName}</div>
    <div>Location: {event?.user?.address}</div>
    <div>Date: {event.date}</div>
    <div>Time: {event.time}</div>
</section>
}