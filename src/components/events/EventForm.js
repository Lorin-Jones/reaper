import { useEffect, useState } from "react"

export const EventForm = () => {
    // TODO: Provide initial state for profile
    const [event, setEvent] = useState({
        name: "",
        date: "",
        hostId: 0,
    })

    const localReaperUser = localStorage.getItem("reaper_user")
    const reaperUserObject = JSON.parse(localReaperUser)
    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    // TODO: Get employee profile info from API and update state
    useEffect(() => {
        fetch(`http://localhost:8088/users?userId=${reaperUserObject.id}`)
           .then(response => response.json())
           .then((data) => {
               const userObject = data[0]
               updateProfile(userObject)
           })
    }, [])


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
       return fetch(``, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
       })
           .then(response => response.json())
           .then(() => {
                setFeedback("New Event Created")
           })
    }

    return (
        <>
         <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
         </div>
        
        <form className="event">
            <h2 className="event__title">New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="event_name">Event Name</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={event.name}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.specialty = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Hourly rate:</label>
                    <input type="number"
                        className="form-control"
                        value={profile.rate}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.rate = parseFloat(evt.target.value, 2)
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
        </>
    )
}