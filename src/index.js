
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { Reaper } from "./Reaper"
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#e36414'
        },
        secondary: {
            main: '#0f4c5c'
        }
    }
})

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <Reaper />
        </ThemeProvider>
    </BrowserRouter>
)

