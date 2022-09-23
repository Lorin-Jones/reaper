import { Link } from "react-router-dom"

const localReaperUser = localStorage.getItem("reaper_user")
const reaperUserObject = JSON.parse(localReaperUser)


export const EventGuest = ({ name }) => {
    return (
           
                <section className="user">
 
                    <div>{name}</div>
                    
                </section>
        )
}