# Hospital Finder Web App

A responsive web application built with Next.js and React to help users find affordable hospitals for specific diseases. The app fetches hospital data from a backend Express.js API and provides dynamic filtering by city, rating, and government schemes.

## Features

- Search hospitals by disease name.
- Filter hospitals by city, minimum rating, and government healthcare schemes.
- Responsive UI using Tailwind CSS.
- Displays hospital details including specialists, address, rating, service hours, and estimated treatment prices.
- Backend API built with Express.js serving hospital data with CORS enabled.

## Technologies Used

- Frontend: Next.js, React, Tailwind CSS
- Backend: Node.js, Express.js
- Data fetching: REST API
- State management: React Hooks
- Styling: Tailwind CSS

## Setup and Installation

### Backend

1. Navigate to the backend directory.

2. Install dependencies:

npm install express cors

text

3. Run the Express server:

node server.js

text

Backend runs on `https://hospitalfinder-backend.onrender.com`.

### Frontend

1. Navigate to the frontend directory.

2. Install dependencies:

npm install

text

3. Run the Next.js dev server:

npm run dev

text

Open `https://hospital-finder-sandy.vercel.app` to access the app.

## API Endpoints

- `GET /hospitals?disease=<disease-name>`  
  Returns hospitals treating the specified disease.

- Optional:  
  `GET /hospitals/all`  
  Returns all hospitals data.

## Usage

1. Enter a disease name in the search box (e.g., "dengue fever", "appendicitis").

2. Use the dropdown filters to refine results by city, minimum rating, or government schemes.

3. Click Search to fetch and display matching hospitals.

## Project Structure

- `/app`: Next.js app frontend code.
- `/index.js`: Express backend server with hospital data API.
- `/components`: Reusable UI components like `HospitalCard`.

## License

This project is open source and free to use.

---
