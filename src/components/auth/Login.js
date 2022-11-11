import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import backgroundVideo from "/home/walter/workspace/reaper/src/assets/VCRBlueScreen.mp4"
import "./Login.css"
 
 
export const Login = () => {
    const [email, set] = useState("lorin.jones@gmail.com")
    const navigate = useNavigate()
 
    const handleLogin = (e) => {
        e.preventDefault()
 
        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("reaper_user", JSON.stringify({
                        id: user.id,
                        fullName: user.fullName
                    }))
 
                    navigate("/profile")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }
 
    return (
        <main className="container--login">
            <section className="outer-container">
                <div className="inner-container">
                        <form className="video-overlay" onSubmit={handleLogin}>
                            <img src="https://res.cloudinary.com/dlr2tm7qr/image/upload/v1664422067/ReaperLogoFinal_hjhseb.png" class="main" ></img>
                            <fieldset class="fieldset1">
                                <label htmlFor="inputEmail"></label>
                                <input type="email"
                                    value={email}
                                    onChange={evt => set(evt.target.value)}
                                    className="form-control1"
                                    placeholder="Email address"
                                    required autoFocus />
                            </fieldset>
                            <fieldset>
                                <Button
                                    className="button"
                                    type="submit">
                                    Sign in
                                </Button>
                            </fieldset>
                            <section className="link--register">
                                <Link to="/register">Register</Link>
                            </section>
                        </form>
                    <video autoPlay loop muted id="video1">
                        <source src={backgroundVideo} type="video/mp4" />
                    </video>
               
            </div>
 
            </section>
        </main>
    )
}
       
