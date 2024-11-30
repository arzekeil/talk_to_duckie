const images = import.meta.glob('../../assets/avatar/*.{png,jpg,jpeg,svg}', { eager: true });

const imageMap: { [key: string]: string } = {};

// Populate the map with image paths
Object.entries(images).forEach(([path, module]) => {
    const fileNameWithExt = path.split('/').pop() || ''; // Extract filename with extension
    const fileName = fileNameWithExt.split('.')[0];
    imageMap[fileName] = (module as { default: string }).default;
});

export default imageMap;
