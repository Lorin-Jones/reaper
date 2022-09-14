import { UserViews } from "./UserViews"


export const ApplicationViews = () => {
    const localReaperUser = localStorage.getItem("reaper_user")
    const reaperUserObject = JSON.parse(localReaperUser)

    if (reaperUserObject) {
        return UserViews()

    }
}