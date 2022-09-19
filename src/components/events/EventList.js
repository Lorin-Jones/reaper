import { useEffect, useState } from "react";
import { Event } from "./Event"
import "./Events.css"

export const EventList = () => {
    const [events, setEvents] = useState([])
    const [filteredEvents, setFiltered] = useState([])

    const localReaperUser = localStorage.getItem("reaper_user")
    const reaperUserObject = JSON.parse(localReaperUser)

    useEffect(() => {
        fetch(`http://localhost:8088/events?_expand=user&_embed=eventGuests`)
            .then(response => response.json())
            .then((eventArray) => {
                setEvents(eventArray)
                
            })
       
    }, [])


    useEffect(() => {
        const filtered = []
        events.map(
            (event) => {
                if (reaperUserObject.id === event.userId || reaperUserObject.id == event.eventGuests.userId) {
                    filtered.push(event)
                }
                
            }
        )
        setFiltered(filtered)
    }, [events])


    const deleteButton = (event) => {
        return <button onClick={() => {
           
                {
                    fetch(`http://localhost:8088/events/${event.id}`, {
                        method: "DELETE"
                    })
                    .then(() => {
                        
                            fetch(`http://localhost:8088/events?_expand=user`)
                                .then(response => response.json())
                                .then((eventArray) => {
                                    setEvents(eventArray)
                                    
                                })
                           
                            }, [events])
                        
                    
    
                }
            
        }} className="delete_event">Delete Event</button>
    
    }
    

    return <>
        <h2>Events</h2>

        <article className="events">
            {
                filteredEvents.map(
                    (event) => <Event key={`event--${event.id}`}
                        id={event.id}
                        eventName={event.name}
                        host={event.user.fullName}
                        hostId={event.user.id}
                        deleteButton={deleteButton(event)}
                        eventObj={event} />     
                )
            }
        </article>
    </>
}
                    // <section className="event">
                    //     <header>{event.name}</header>
                    //     <div>Hosted by: {event.user.fullName} </div>
                    //     <div>Location: {event.user.address}</div>
                    //     <div>Date: {event.date}</div>
                    //     <div>Time: {event.time}</div>
                    //     <button>
                            
                    //     </button>
                    // </section>