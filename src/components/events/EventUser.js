import { useState, useEffect } from "react"
import { Link } from "react-router-dom"





export const EventUser = ({ id, name }) => {


    const localReaperUser = localStorage.getItem("reaper_user")
    const reaperUserObject = JSON.parse(localReaperUser)
    const [feedback, setFeedback] = useState("")
    const [eventId, setEvent] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8088/events?userId=${reaperUserObject.id}`)
            .then(response => response.json())
            .then((eventObj) => {
                setEvent(eventObj[0])
            })
       
    }, [])

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const guestItemToSendToApi = {
            userId: id,
            eventId: eventId.id,
        }

        return fetch(`http://localhost:8088/eventGuests`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(guestItemToSendToApi)
        })
            .then(response => response.json())
            .then(() => {
                
            })
    }

    return <section className="user">
        <div>{name}</div>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="user_add">
                Invite Guest
        </button>
            
    </section>
}