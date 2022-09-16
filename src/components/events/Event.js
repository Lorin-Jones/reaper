import { Link } from "react-router-dom"

const localReaperUser = localStorage.getItem("reaper_user")
const reaperUserObject = JSON.parse(localReaperUser)


export const Event = ({ id, eventName, host, deleteButton, hostId }) => {
    return (
        
        <>
            <section className="event">
                <div>
                    <Link to={`/events/${id}`}>{eventName}</Link>    
                </div>
                <div>Hosted By {host}</div>
                {
                    
                    reaperUserObject.id === hostId
                        ?   <>
                            {deleteButton}
                        </>
                        : <>
                            {""}
                        </>
                }
            </section>
            
        </>
    )
}