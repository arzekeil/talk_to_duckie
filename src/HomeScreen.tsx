import { Box, Tab, Tabs } from "@mui/material"
import { useState } from "react"
import InterviewSetupForm from "./components/setupInterview/InterviewSetupForm"
import RecordingList from "./components/history/RecordingList"

const HomeScreen = () => {
    const [tabValue, setTabValue] = useState(0)

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue)
        event.preventDefault();
    }

    return (
        <Box padding={8} margin='0 auto'>
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
                {tabValue === 1 &&
                    <>
                        <RecordingList />
                    </>
                }
            </div>
        </Box>
    )
}

export default HomeScreen
