# Weather Meetup App

A React-based weather application designed to help organizers plan outdoor meetups by providing weather forecasts and recommendations. The app uses the Visual Crossing Weather API to fetch weather data and provides an intuitive interface for checking weather conditions for recurring events.

## Features

- Set event location and recurring schedule
- View weather forecasts for the next 7 days
- Interactive weather data visualization using Chart.js
- Smart recommendations based on temperature, humidity, and wind conditions
- Material-UI components for a modern, responsive design

## Prerequisites

Before running the application, make sure you have:
- Node.js installed (version 14 or higher)
- npm or yarn package manager
- Visual Crossing API key (sign up at https://www.visualcrossing.com/)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Visual Crossing API key:
   ```
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```
4. Replace the `API_KEY` constant in `src/App.tsx` with your actual API key

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Usage

1. Enter the location for your meetup
2. Select the day of the week for your recurring event
3. Choose the time range for your event
4. Click "Check Weather" to see the forecast and recommendations

The app will display:
- Temperature and humidity trends
- Weather condition messages
- Recommendations based on weather conditions

## Technologies Used

- React with TypeScript
- Material-UI for components and styling
- Chart.js for weather data visualization
- Axios for API requests
- Visual Crossing Weather API

## Contributing

Feel free to submit issues and enhancement requests!
