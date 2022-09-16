import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const EventForm = () => {
    // TODO: Provide initial state for profile
    const [eventObj, setEvent] = useState({
        name: "",
        date: "",
        time: "",
        userId: 0,
    })

    const navigate = useNavigate()
    const localReaperUser = localStorage.getItem("reaper_user")
    const reaperUserObject = JSON.parse(localReaperUser)
    // const [feedback, setFeedback] = useState("")

    // useEffect(() => {
    //     if (feedback !== "") {
    //         // Clear feedback to make entire element disappear after 3 seconds
    //         setTimeout(() => setFeedback(""), 3000);
    //     }
    // }, [feedback])

    // TODO: Get employee profile info from API and update state
    // useEffect(() => {
    //     fetch(`http://localhost:8088/users?userId=${reaperUserObject.id}`)
    //        .then(response => response.json())
    //        .then((data) => {
    //            const userObject = data[0]
    //            setProfile(userObject)
    //        })
    // }, [])
  
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

    
        const eventToSendToApi = {
            name: eventObj.name,
            date: eventObj.date,
            time: eventObj.time,
            userId: reaperUserObject.id
        }
        return fetch(`http://localhost:8088/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventToSendToApi)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/events")
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