import { Box, Tab, Tabs } from "@mui/material"
import { useState } from "react"
import InterviewSetupForm from "./components/setupInterview/InterviewSetupForm"

const HomeScreen = () => {
    const [tabValue, setTabValue] = useState(0)

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue)
    }

    return (
        <Box padding={8} maxWidth='500px' margin='0 auto'>
            <Tabs value={tabValue} onChange={handleTabChange} >
                <Tab label="Start New Meeting" />
                <Tab label="History" />
            </Tabs>
            <div>
                {tabValue === 0 &&
                    <>
                        <InterviewSetupForm />
                    </>
                }
                {tabValue === 1 && <h1>show history here</h1>}
            </div>
        </Box>
    )
}

export default HomeScreen
