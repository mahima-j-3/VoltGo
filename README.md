##⚡ VoltGo – EV Charging Platform

## About the Project

VoltGo is an EV charging platform designed to make electric vehicle charging easier and more convenient. Users can view available charging stations, check charging information, and interact with the charging service through a simple web interface.

## Problem Statement

Finding and accessing EV charging stations can be inconvenient for users. VoltGo provides a centralized platform where users can explore charging stations and manage their charging requirements through a user-friendly interface.

## Features

* View EV charging stations
* Check charging station information
* Book a charging slot
* User-friendly and responsive interface
* Backend API for handling application data
* API testing using Postman

## Technologies Used

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Testing

* Thunder Client

### Version Control

* Git
* GitHub

## Project Structure

```text
VoltGo/
├── index.html
├── style.css
├── script.js
├── server.js
├── package.json
├── package-lock.json
└── screenshots/
```

## How to Run the Project

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

### 2. Open the project folder

```bash
cd VoltGo
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the backend server

```bash
node server.js
```

The server will run on the port specified in `server.js`.

### 5. Open the frontend

Open `index.html` using Live Server in VS Code, or use the frontend setup specified by the project.

## API Endpoints

| Method | Endpoint   | Purpose       |
| ------ | ---------- | ------------- |
| GET    | `/api/...` | Retrieve data |
| POST   | `/api/...` | Add data      |
| PUT    | `/api/...` | Update data   |
| DELETE | `/api/...` | Delete data   |


## 🧪 API Testing

The backend APIs were tested using Thunder Client.

Screenshots of successful API requests and responses are included in the `screenshots` folder.

## 📸 Screenshots

### 📸 Screenshots

#### Homepage
![Homepage](screenshots/homepage.png)

#### Charging Stations
![Charging Stations](screenshots/stations.png)

#### Booking
![Booking](screenshots/Booking.png)

#### API Testing
![API Testing 1](screenshots/api%20testing.png)
![API Testing 2](<screenshots/api testing (1).png>)
![API Testing 3](<screenshots/api testing (4).png>)
![API Testing 4](<screenshots/api testing (5).png>)
![API Testing 5](<screenshots/api testing (6).png>)

## Future Improvements

* Real-time charging station availability
* GPS-based station discovery
* Online payments
* User authentication
* Charging history
* Integration with real EV charging stations
* Mobile application

## 👩‍💻 Project

**VoltGo – EV Charging Platform**

Developed as a student project to demonstrate frontend and backend web development.
