# Youtube Video Sharing App

This project is a Youtube Video Sharing application that allows users to register, log in, share Youtube videos, view a list of shared videos, and receive real-time notifications for new video shares. The application built with Nestjs for the server-side, Nextjs for the client-side, Mongo database and SoketIO for real-time notifications.

# 📦 Table of Contents

1. [Rules](#📜-rules)
2. [Requirements](#-requirements)
3. [Installation](#-installation)
4. [Running the Project](#-running-the-project)
5. [Docker Deployment](#-docker-deployment)
6. [Usage](#-usage)
7. [Troubleshooting](#-troubleshooting)

## 📜 Rules

## Requirements

Make sure you have the following software and tools installed:

- Node.js (version >=16)
- npm (version >=8) or Yarn (version >=1.22.xx)
- MongoDB (version >= 4)

## Installation

1. Clone the repository: `git clone https://github.com/woowebsite/remitano-home-assign.git`
2. Navigate to the server directory: `cd server`
3. Install server dependencies: `npm install` or `yarn install`
4. Configure server settings:
   - Create a `.env` file in the server directory.
   - Specify the necessary environment variables in the `.env` file (e.g., database connection details, JWT secret, etc.).
5. Navigate to the client directory: `cd ../client`
6. Install client dependencies: `npm install` or `yarn install`
7. Configure client settings:
   - Open the `.env` file in the client directory & update API endpoint (if you changed server port).

## Running the project

1. Start the server: In the server directory, run `npm start` or `yarn start`.
2. Start the client: In the client directory, run `npm run dev` or `yarn dev`.
3. Access the application in a web browser: Open `http://localhost:3000`.
4. Run the test suite: In the server directory, run `npm run test` or `yarn test`.

## Docker Deployment

To deploy the application at local using Docker, follow these steps:

1. Make sure you have Docker and Docker Compose installed on your system.
2. Start app with `docker-compose.yml` file, run `docker-compose up`

## Usage

Once the application is running, follow these steps to use its features:

1. Login/Register: Click on the "Login/Register" button to login or register new a account.
2. Share a Youtube video: Click on the "Share Video" button, paste the Youtube video URL, and submit the form.
3. View shared videos: Click on Home Button or Funny Movies text to go to the shared videos list.
4. Real-time notifications: When a new video is shared by another user, you will receive a real-time notification containing the video title and the user's email.

## Troubleshooting

If you encounter any issues during setup or usage, consider the following troubleshooting steps:

- Double-check that all the prerequisites are installed correctly.
- Verify the configuration settings for both the server and client.
- Make sure the database connection details are accurate.

If you're still experiencing difficulties, please open a new issue in the project's repository for further assistance.
