import { useEffect, useState } from "react"

export const UserProfile = () => {
    // TODO: Provide initial state for profile
    const [profile, setProfile] = useState({})

    const localReaperUser = localStorage.getItem("reaper_user")
    const reaperUserObject = JSON.parse(localReaperUser)

    useEffect(() => {
        fetch(`http://localhost:8088/users?id=${reaperUserObject.id}`)
           .then(response => response.json())
           .then((data) => {
               const userObject = data[0]
               setProfile(userObject)
           })
    }, [])

    return <section className="profile">
        
        <label>Name: {profile.fullName}</label>    
        <div>Email: {profile.email}</div>
        <div></div>
                
    </section>
}

