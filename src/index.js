
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { Reaper } from "./Reaper"
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <Reaper />
    </BrowserRouter>
)

