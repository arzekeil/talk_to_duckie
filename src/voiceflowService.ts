// src/voiceflowService.ts
import API from '@voiceflow/api-sdk';

const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const ENDPOINT = 'https://general-runtime.voiceflow.com'; // Voiceflow's API endpoint
const PROJECT_ID = 'YOUR_PROJECT_ID'; // Replace with your project ID

// Initialize the Voiceflow API client
const voiceflow = new API({
    endpoint: ENDPOINT,
    apiKey: API_KEY,
});

// Define response type
export interface VoiceflowResponse {
    type: string;
    payload: {
        text?: string;
    };
}

// Interact with Voiceflow project
export const interactWithVoiceflow = async (
    userId: string,
    message: string
): Promise<VoiceflowResponse[]> => {
    try {
        // Create or retrieve a session
        const session = await voiceflow.state.get(PROJECT_ID, userId);

        // Send a message to Voiceflow
        const response = await voiceflow.state.interact(PROJECT_ID, userId, [
            { type: 'text', payload: message },
        ]);

        return response; // Voiceflow's response array
    } catch (error) {
        console.error('Error interacting with Voiceflow:', error);
        throw error;
    }
};
