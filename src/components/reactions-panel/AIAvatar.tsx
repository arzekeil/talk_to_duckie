import Avatar from "@mui/material/Avatar";
import imageMap from "./imageMap";

interface AIAvatarProps {
    fileName?: string; // Name of the file (e.g., "user1.png")
    alt?: string; // Alt text for the avatar
}
const AIAvatar: React.FC<AIAvatarProps> = ({fileName = 'default', alt = 'Avatar'}) => {
    const filePath = imageMap[fileName];
    return (
        <Avatar alt={alt} src={filePath} sx={{
            width: 312, // Set the width
            height: 312, // Set the height
            fontSize: 50, // Adjust font size for initials if no image
        }}/>
    );
};

export default AIAvatar;