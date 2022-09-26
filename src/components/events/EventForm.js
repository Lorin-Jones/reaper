import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const EventForm = () => {
    
    const [eventObj, setEvent] = useState({
        name: "",
        date: "",
        time: "",
        userId: 0,
    })

    const navigate = useNavigate()
    const localReaperUser = localStorage.getItem("reaper_user")
    const reaperUserObject = JSON.parse(localReaperUser)

  
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

    
        const eventToSendToApi = {
            name: eventObj.name,
            date: eventObj.date,
            time: eventObj.time,
            userId: reaperUserObject.id
        }
        const eventUserToSendToApi = {
            userId: reaperUserObject.id,
            hasVoted: false,
            isHost: true,

        } 
        
        fetch(`http://localhost:8088/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventToSendToApi)
        })
            .then(response => response.json())
            .then((newEventFromApi) => {

                eventUserToSendToApi.eventId = newEventFromApi.id

                fetch(`http://localhost:8088/eventGuests`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(eventUserToSendToApi)
            })
                .then(response => response.json())
                .then(() => {
                    navigate("/events")

                })
                
                // setFeedback("New Event Created")
            })
    }

    return (
        <>
         {/* <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
         </div>
         */}
        <form className="event">
            <h2 className="event__title">New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="event_name">Event Name</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={eventObj.name}
                        onChange={
                            (evt) => {
                                const copy = {...eventObj}
                                copy.name = evt.target.value
                                setEvent(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="date"
                        className="form-control"
                        value={eventObj.date}
                        onChange={
                            (evt) => {
                                const copy = {...eventObj}
                                copy.date = evt.target.value
                                setEvent(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time:</label>
                    <input type="time"
                        className="form-control"
                        value={eventObj.time}
                        onChange={
                            (evt) => {
                                const copy = {...eventObj}
                                copy.time = evt.target.value
                                setEvent(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Event
            </button>
        </form>
        </>
    )
}