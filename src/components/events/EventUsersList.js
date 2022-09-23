import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { EventGuest } from "./EventGuest"
import { EventMovies } from "./EventMovies"
import { EventProposals } from "./EventProposals"
import { EventUser } from "./EventUser"




export const EventUsersList = () => {
    const [users, setUsers] = useState([])
    const [event, setEvent] = useState({})
    const [guests, setGuests] = useState([])
    const {eventId} = useParams()
    
    const localReaperUser = localStorage.getItem("reaper_user")
    const reaperUserObject = JSON.parse(localReaperUser)
    
    
    const getAllGuests = () => {
            fetch(`http://localhost:8088/eventGuests?eventId=${eventId}&_expand=user`)
                .then(response => response.json())
                .then((userArray) => {
                    setGuests(userArray)
                })
    }

    useEffect(
        () => {
            getAllGuests()

            fetch(`http://localhost:8088/users?_embed=eventGuests`)
                .then(response => response.json())
                .then((userArray) => {
                    setUsers(userArray)
                })
        }, 
        []
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/events?id=${eventId}`)
                .then(response => response.json())
                .then((eventArray) => {
                    setEvent(eventArray[0])
                })
        }, 
        []
    )
    
    
    
    // useEffect(
    //     () => {
    //         let nonHosts = []
    //         users.map(
    //             (user) => {
    //                 if (reaperUserObject.id !== event.userId) {
    //                     nonHosts.push(user)
    //                 }
    //             }
    //         )
    //         setNotHost(nonHosts)
    //     }, 
    //     [event]
    // )

  

    return <>
                {
                        reaperUserObject.id === event.userId
                        ? <>
                        <h2>Create A Guest List</h2>

                        <article className="users">
                            {
                                
                                users.map(
                                    (user) => 
                                    {   
                                        let alreadyInvited = false
                                        guests.map(
                                            (guest) => {
                                                if (user.id === guest.userId || user.id === event.userId) {
                                                    alreadyInvited = true
                                                }
                                            }
                                        )
                                        if (!alreadyInvited) {
                                            return <EventUser key={`event_user--${user.id}`}
                                            id={user.id}
                                            name={user.fullName} 
                                            eventId={eventId} 
                                            invited={alreadyInvited}
                                            getAllGuests={getAllGuests} />
                                        }
                                    })
                            
                            }
                        </article>
                        
                        <h2>Event Guests</h2>

                        <article className="users">
                            {
                                
                                guests.map(
                                    (guest) => <EventGuest key={`event_user--${guest.id}`}
                                    id={guest.id}
                                    name={guest.user.fullName} />
                                    
                                )
                            
                            
                            }
                        </article>
                        <article>
                            <EventProposals />
                        </article>
                     
                        </>
                        : <>

                        <h2>Event Guests</h2>

                        <article className="users">
                            {
                                
                                guests.map(
                                    (guest) => <EventGuest key={`event_user--${guest.id}`}
                                    id={guest.id}
                                    name={guest.user.fullName} />
                                    
                                )
                            
                            
                            }
                        </article>

                        <article className="movies">
                            <EventProposals />
                        </article>
                      
                        </>
                }

            </>
           
}

