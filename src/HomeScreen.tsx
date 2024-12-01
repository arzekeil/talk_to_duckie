import { Box, Button, Tab, Tabs } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"
import InterviewSetupForm from "./components/setupInterview/InterviewSetupForm"

const HomeScreen = () => {
    const [tabValue, setTabValue] = useState(0)

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue)
    }


    return (
        <Box padding={8} maxWidth='500px' margin='0 auto'>
            <Tabs value={tabValue} onChange={handleTabChange} >
                <Tab label="History" />
                <Tab label="Start New Meeting" />
            </Tabs>
            <div>
                {tabValue === 0 && <h1>show history here</h1>}
                {tabValue === 1 &&
                    <>
                        <InterviewSetupForm />
                    </>
                }
            </div>
        </Box>
    )
}

export default HomeScreen
