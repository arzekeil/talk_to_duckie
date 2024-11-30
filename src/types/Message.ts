class Message {
    id: number;
    text?: string;
    sender: "user" | "recipient";
    audioUrl?: string;

    constructor(id: number, sender: "user" | "recipient", text?: string, audioUrl?: string) {
        this.id = id;
        this.sender = sender;
        this.text = text;
        this.audioUrl = audioUrl;
    }

    // Example utility method to create a new message
    static createUserMessage(id: number, text: string): Message {
        return new Message(id, "user", text);
    }

    static createRecipientMessage(id: number, text: string): Message {
        return new Message(id, "recipient", text);
    }
}

export default Message;
