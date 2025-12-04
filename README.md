# Harrison Pickett Portfolio

A modern, responsive portfolio website showcasing software development work.

## Features

- Clean, minimal design with smooth animations
- Dark/light mode toggle (respects system preference)
- Responsive layout for mobile, tablet, and desktop
- Interactive project gallery with lightbox carousel (keyboard + touch swipe support)
- Leaflet.js map with OpenStreetMap tiles
- Typing animation on hero section
- Smooth scroll navigation

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid, animations
- **JavaScript** - Vanilla ES6+, no frameworks
- **Leaflet.js** - Interactive map
- **OpenStreetMap** - Map tiles (no API key required)
- **Google Fonts** - Inter typeface

## Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css       # All styles
│   ├── js/
│   │   └── main.js         # All JavaScript
│   └── img/
│       ├── favicon/        # Favicon assets
│       ├── logo/           # Brand logos (dark/light)
│       ├── siren/          # USGS SIREN screenshots
│       ├── ttv/            # Tabletop Vault screenshot
│       └── dice/           # Dice Roll Statistics screenshot
├── LICENSE                 # MIT License
└── README.md
```

## Local Development

No build step required. Serve the directory with any static file server. 

For development with hot reload, use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for VS Code.

## Deployment

Static site - deploy to any hosting service:

- **Netlify** - Drag and drop the folder or connect repo
- **Vercel** - Connect repo
- **GitHub Pages** - Push to `gh-pages` branch
- **AWS S3** - Upload as static website

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge). Uses CSS custom properties, ES6+, and Intersection Observer API.

## License

MIT License - see [LICENSE](LICENSE) file.

## Author

**Harrison Pickett**
- GitHub: [@harrisonapickettiv](https://github.com/harrisonapickettiv)
- LinkedIn: [harrisonapickettiv](https://www.linkedin.com/in/harrisonapickettiv/)
