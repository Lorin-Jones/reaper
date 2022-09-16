import { useEffect, useState } from "react";
import "./Events.css"

export const EventList = () => {
    const [events, setEvents] = useState([])

    const localReaperUser = localStorage.getItem("reaper_user")
    const reaperUserObject = JSON.parse(localReaperUser)

    useEffect(() => {
        fetch(`http://localhost:8088/events?_expand=user`)
            .then(response => response.json())
            .then((eventArray) => {
                setEvents(eventArray)
                
            })
       
    }, [])

    return <>
        <h2>Events</h2>

        <article className="events">
            {
                events.map(
                    (event) => 
                    <section className="event">
                        <header>{event.name}</header>
                        <div>Hosted by: {event.user.fullName} </div>
                        <div>Location: {event.user.address}</div>
                        <div>Date: {event.date}</div>
                        <div>Time: {event.time}</div>
                        <button>
                            
                        </button>
                    </section>
                )
            }
        </article>
    </>
}