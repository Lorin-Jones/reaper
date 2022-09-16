import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const EventDetails = () => {
    const {eventId} = useParams()
    const [event, updateEvent] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/eventMovies?_expand=event&eventId=${eventId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleEvent = data[0]
                    updateEvent(singleEvent)
                })
        },
        [eventId]
    )

    return <section className="event">
    <header className="event_header">{event?.user?.fullName}</header>
    <div>Email: {employee?.user?.email}</div>
    <div>Specialty: {employee.specialty}</div>
    <div>Rate: {employee.rate}</div>
    <footer className="employee__footer">Currently working on {employee?.employeeTickets?.length} tickets.</footer>
</section>
}