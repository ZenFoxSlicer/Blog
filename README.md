# Blog App

A modern Angular application for blog functionality and content management.

## Features

- **Modern Angular 20** with Server-Side Rendering (SSR)
- **Responsive Design** with SCSS styling
- **Component-based Architecture** for maintainability
- **Routing System** for navigation
- **Blog Management** functionality
- **Public Pages** for clinic information

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Git** (for version control)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd blog-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:4200
   ```

## Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the application for production
- `npm run watch` - Build and watch for changes
- `npm test` - Run unit tests
- `npm run serve:ssr:blog-app` - Serve the SSR version

## Project Structure

```
src/
├── app/
│   ├── auth/              # Authentication components
│   ├── blog/              # Blog-related components
│   ├── business/          # Business logic components
│   ├── public/            # Public pages (home, clinics)
│   ├── shared/            # Shared components and utilities
│   ├── app.ts             # Main app component
│   ├── app.html           # App template
│   ├── app.scss           # App styles
│   └── app.routes.ts      # Application routes
├── main.ts                # Application entry point
├── main.server.ts         # SSR entry point
└── styles.scss            # Global styles
```

## Building for Production

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **The built files will be in the `dist/` directory**

3. **For SSR deployment:**
   ```bash
   npm run serve:ssr:dental-client
   ```

## Deployment Options

### Option 1: Static Hosting (Netlify, Vercel, GitHub Pages)

1. Build the application: `npm run build`
2. Deploy the `dist/blog-app/browser` folder to your static hosting service

### Option 2: Server Deployment (Node.js)

1. Build the application: `npm run build`
2. Deploy the entire project to your server
3. Install dependencies: `npm install --production`
4. Start the SSR server: `npm run serve:ssr:blog-app`

### Option 3: Docker Deployment

Create a `Dockerfile` in the root directory:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["npm", "run", "serve:ssr:blog-app"]
```

## Environment Configuration

Create a `.env` file in the root directory for environment-specific configurations:

```env
# Production settings
NODE_ENV=production
PORT=4000
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.

## Changelog

### Version 0.0.0
- Initial release
- Angular 20 with SSR
- Basic blog functionality
- Public pages for clinic information
