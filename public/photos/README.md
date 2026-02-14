# Photo Gallery Setup Guide

## Directory Structure

Your photos should be organized in the following structure:

```
/public/photos/
├── profile/           # Profile photo
│   └── profile.jpg    # Your professional headshot (recommended: 400x400px)
│
├── projects/          # Project photos
│   ├── smart-glove.jpg      # Smart Glove project photo
│   ├── parrot-mambo.jpg     # Parrot Mambo drone project
│   ├── swarm-robotics.jpg   # Swarm robotics project
│   └── drone-autonomy.jpg   # GPS-denied quadrotor project
│
├── awards/            # Award ceremony photos (optional)
│
└── gallery/           # General gallery photos
    ├── photo1.jpg     # Additional photos
    ├── photo2.jpg
    ├── photo3.jpg
    ├── photo4.jpg
    ├── photo5.jpg
    └── photo6.jpg
```

## How to Add Your Google Drive Photos

### Option 1: Direct Upload (Recommended)
1. Download your photos from Google Drive to your computer
2. Rename them according to the naming convention above
3. Place them in the appropriate `/public/photos/` subdirectory
4. The website will automatically display them

### Option 2: Update Image Configuration
If your photos have different names, update the `imageConfig` object in `/src/app/page.tsx`:

```javascript
const imageConfig = {
  profile: {
    src: '/photos/profile/your-photo-name.jpg',  // Update path
    alt: 'Your Name - Profile Photo',
    placeholder: false,  // Set to false when photo is added
  },
  projects: {
    'smart-glove': {
      src: '/photos/projects/your-smart-glove-photo.jpg',
      alt: 'Smart Glove Project',
    },
    // ... etc
  },
  gallery: [
    { src: '/photos/gallery/photo1.jpg', alt: 'Description', caption: 'Optional caption' },
    // ... etc
  ],
};
```

## Photo Recommendations

### Profile Photo
- Size: 400x400px or larger (square)
- Format: JPG, PNG, or WebP
- Style: Professional headshot with good lighting

### Project Photos
- Size: 800x600px or larger (landscape)
- Format: JPG, PNG, or WebP
- Content: Hardware, demos, screenshots, or action shots

### Gallery Photos
- Size: 800x600px or larger
- Format: JPG, PNG, or WebP
- Ideas: Conferences, hackathons, team events, demos, certifications

## Troubleshooting

### Photos not showing?
1. Check the file path matches the `imageConfig` exactly
2. Ensure photos are in `/public/photos/` (not `/src/`)
3. Restart the dev server after adding new photos

### Image too large?
- Compress images before uploading (recommended: < 500KB each)
- Use tools like TinyPNG or Squoosh

## After Adding Photos

1. Set `placeholder: false` in the profile config
2. Update captions in the gallery array
3. Test all photos display correctly
4. The website will show beautiful placeholders until real photos are added
