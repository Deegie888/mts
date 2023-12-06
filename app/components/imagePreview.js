'use client';

import Image from 'next/image';

function ImagePreview({ base64Image, alt, width, height}) {
  const detectImageFormat = (base64Data) => {
    if (!base64Data) {
    console.error('Base64 data is undefined or null.');
    return 'image/jpeg';
  }
    const magicNumbers = {
      '/9j/': 'image/jpeg', 
      'iVBORw0KGg': 'image/png', 
      'R0lGOD': 'image/gif', 
      'UklGR': 'image/webp', 
    };

    for (const magic in magicNumbers) {
      if (base64Data.startsWith(magic)) {
        return magicNumbers[magic];
      }
    }

    return 'image/jpeg'; 
  };

  const format = detectImageFormat(base64Image);

  const getImageMimeType = (format) => {
    switch (format) {
        case 'image/jpeg':
            return 'image/jpeg';
        case 'image/png':
            return 'image/png';
        case 'image/gif':
            return 'image/gif';
        case 'image/webp':
            return 'image/webp';
        default:
            return 'image/jpeg'; 
    }
  };

  const imageMimeType = getImageMimeType(format);

  return (
    <div>
      <Image
        src={`data:${imageMimeType};base64,${base64Image}`} 
        alt={alt}
        width={width}
        height={height}
      />
    </div>
  );
}

export default ImagePreview;