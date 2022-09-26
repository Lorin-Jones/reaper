import { useEffect, useState } from "react";
import { Event } from "./Event"
import "./Events.css"

export const EventList = () => {
    const [hostedEvents, setHostedEvents] = useState([])
    const [invitedEvents, setInvitedEvents] = useState([])

    const localReaperUser = localStorage.getItem("reaper_user")
    const reaperUserObject = JSON.parse(localReaperUser)

    useEffect(() => {
        fetch(`http://localhost:8088/events?userId=${reaperUserObject.id}&_expand=user&_embed=eventGuests`)
            .then(response => response.json())
            .then((eventArray) => {
                setHostedEvents(eventArray)
                
            })
       
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8088/events?_expand=user&_embed=eventGuests`)
            .then(response => response.json())
            .then((eventArray) => {
                let guestArray = []
                eventArray.map(
                    (event) => {
                        event.eventGuests.map(
                            (guest) => {
                                if (guest.userId === reaperUserObject.id && guest.isHost === false) {
                                    guestArray.push(event)
                                }
                            }
                        )
                    }
                )
                setInvitedEvents(guestArray)
                
            })
       
    }, [])
    


    const deleteButton = (event) => {
        return <button onClick={() => {
           
                {
                    fetch(`http://localhost:8088/events/${event.id}`, {
                        method: "DELETE"
                    })
                    .then(() => {
                        
                            fetch(`http://localhost:8088/events?userId=${reaperUserObject.id}_expand=user`)
                                .then(response => response.json())
                                .then((eventArray) => {
                                    setHostedEvents(eventArray)
                                    
                                })
                           
                            }, [hostedEvents])
                        
                    
    
                }
            
        }} className="delete_event">Delete Event</button>
    
    }
    

    return <>
    
        <h2>Events</h2>

        <article className="events">
            {
                hostedEvents.map(
                    (event) => <Event key={`event--${event.id}`}
                        id={event.id}
                        eventName={event.name}
                        host={event.user.fullName}
                        hostId={event.user.id}
                        isHost={true}
                        deleteButton={deleteButton(event)}
                        eventObj={event} />     
                )
            }
        </article>
        <article className="events">
            {
                invitedEvents.map(
                    (event) => <Event key={`event--${event.id}`}
                        id={event.id}
                        eventName={event.name}
                        host={event.user.fullName}
                        hostId={event.user.id}
                        isHost={false}
                        deleteButton={deleteButton(event)}
                        eventObj={event} />     
                )
            }
        </article>
        
        </>
}