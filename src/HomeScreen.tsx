import { Button } from "@mui/material"
import { Link } from "react-router-dom"

const HomeScreen = () => {
    return (
        <div>
            <h1>Home page :)</h1>
            <Link to="/mock">
                <Button variant="contained" color="primary">
                    Start Meeting
                </Button>
            </Link>
        </div>
    )
}

export default HomeScreen
