import { Link } from "react-router-dom"

const localReaperUser = localStorage.getItem("reaper_user")
const reaperUserObject = JSON.parse(localReaperUser)



export const EventUser = ({ name, id, eventId, alreadyinvited, getAllGuests }) => {

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
    
    
        const guestItemToSendToApi = {
            userId: id,
            eventId: parseInt(eventId),
            hasVoted: false
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
                alreadyinvited = true
                getAllGuests()
            })
    }

    return (
           
                <section className="user">
 
                    <div>{name}</div>
                    <button onClick={handleSaveButtonClick}>Invite Guest!</button>
                    
                </section>
        )
}