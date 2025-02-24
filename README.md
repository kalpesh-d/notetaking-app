# Notetaking App

A modern, mern-stack notetaking application built with React and Node.js.

## Features

- User authentication and authorization
- Create, read, update, and delete notes
- Responsive and modern UI with Tailwind CSS
- Secure API endpoints
- MongoDB database integration

## Tech Stack

### Frontend
- React
- React Router DOM
- Tailwind CSS
- Axios for API calls
- Vite as build tool

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- CORS enabled
- Environment variables support with dotenv

## Getting Started

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd notetaking-app
```

2. Install dependencies
```bash
npm install
```

This will install dependencies for both client and server using workspaces.

3. Environment Setup
Create a `.env` file in the server directory with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

### Development

To run the development server:

1. Start the backend server:
```bash
npm run dev --prefix server
```

2. In a new terminal, start the frontend development server:
```bash
npm run dev --prefix client
```

### Production Build

To create a production build:
```bash
npm run build
```

To start the production server:
```bash
npm start
```

## Project Structure

```
notetaking-app/
├── client/                 # Frontend React application
│   ├── src/               # Source files
│   ├── public/            # Static files
│   └── package.json       # Frontend dependencies
├── server/                # Backend Node.js application
│   ├── src/              # Source files
│   └── package.json      # Backend dependencies
└── package.json          # Root package.json for workspaces
```