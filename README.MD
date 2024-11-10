
# Bike Service App
This is a Bike Service Application that allows service station owners to list their services, manage bookings, and notify customers about booking status updates via email. Customers can book services and track the status of their bookings.


## Installation
**Prerequisites**

 - Node.js (v14 or higher)
 - MongoDB (running locally or on a remote server)
 - NPM (comes with Node.js)
 - Git (to clone the repository)

**Clone the repository**

    git clone https://github.com/yourusername/bike-service-app.git
    cd bike-service-app

## Backend
The backend is built with Node.js, Express, and MongoDB.

1. Navigate to the backend directory

    cd backend

2. Install Dependencies

    npm install

3. Configure Environment Variables
Create a .env file in the backend directory with the following content. Replace placeholders with your actual values.

**env**

    PORT=5000
    MONGO_URI=mongodb://localhost:27017/bike-service-app
    JWT_SECRET=your_jwt_secret
    EMAIL_USER=example@gmail.com
    EMAIL_PASS=passowrd
    
## Frontend

The frontend is built with React.

1. Navigate to the frontend directory

    cd frontend

2. Install Dependencies

    npm install

3. Configure Environment Variables
Create a .env file in the frontend directory with the following content. Replace placeholders with your actual values.

env

    REACT_APP_API_URL=http://localhost:5555

Running the Application
Run Backend
Start the MongoDB server if it’s not already running:


    mongod

In a new terminal window, navigate to the backend directory:

    cd backend

**Start the backend server:**

    npm start

The backend server should now be running on http://localhost:5555.

**Run Frontend**
Open a new terminal window and navigate to the frontend directory:

    cd frontend

Start the frontend server:

    npm start

The frontend app should now be running on http://localhost:3000 and will be communicating with the backend.
## Features

- **Service Management**: Service station owners can add, update, and delete services.
- **Booking Management**: Customers can create bookings for services, and owners can view and update booking statuses.
- **Email Notifications**: Automated emails for booking confirmation and status updates.

## API Endpoints

### Authentication
- **POST** `/api/auth/register`: Register a new user
- **POST** `/api/auth/login`: Login for an existing user

### Services
- **POST** `/api/services`: Create a new service (requires authentication)
- **GET** `/api/services`: Get all services for the logged-in owner
- **PUT** `/api/services/:id`: Update a service by ID
- **DELETE** `/api/services/:id`: Delete a service by ID

### Bookings
- **POST** `/api/bookings`: Create a new booking
- **GET** `/api/bookings/owner`: Get bookings for the logged-in owner
- **GET** `/api/bookings/customer`: Get bookings for the logged-in customer
- **GET** `/api/bookings/:id`: Get booking details by ID
