# API for Restaurant Management System

## Overview

This server is for a web-based Restaurant Management System.

## Features

- **Table Management**: View available and occupied tables.
- **Order Management**: Add, edit, and remove food and drink orders for each table.
- **Menu Management**: Add, edit, and remove menu items.
- **User Authentication**: Different user roles (e.g., waiter, chef, admin, visitor).
- **Payment Processing**: Calculate and process payments.
- **Kitchen View**: A dedicated view for chefs to see pending orders.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **ODM**: Mongoose

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB instance running

### Steps to Run the Project

1. Clone the repository:
   ```sh
   git clone https://github.com/delbusque/restaurant-api.git
   cd restaurant-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure it with:
   ```sh
   MONGO_URI=your_mongodb_connection_string
   PORT=your_preferred_port
   ```
4. Start the backend server:
   ```sh
   npm run nodemon
   ```

## Backend API Endpoints

### Base URL: `http://localhost:5000`

- **GET `/`**: Returns a 404 error message for invalid API endpoints.
- **Tables**:
  - `GET /tables` - Fetch all tables
  - `POST /tables/create` - Create a new table
  - `GET /tables/:id` - Fetch table
  - `POST /tables/edit/:id` - Edit table
- **Items**:
  - `GET /items` - Fetch all menu items
  - `POST /items/add` - Add a new menu item
  - `POST /items/edit/:id` - Edit menu item
  - `DELETE /items/:id` - Delete menu item
- **Users**:
  - `GET /user` - Fetch all users
  - `POST /user/signup` - Register a new user
  - `POST /user/login` - Login existing user
  - `POST /user/edit` - Edit user
- **Chefs**:
  - `POST /chef/add-orders` - Add kitchen order
  - `GET /chef/get-orders` - Fetch all kitchen orders
  - `POST /chef/update-waiting-status` - Update kitchen order status
  - `POST /chef/delete-ready-order` - Delete ready kitchen order

## Project Structure

```
restaurant-management/
│── backend/
│   │── controllers/        # API Controllers
│   │── models/             # Mongoose Models
│   │── routes/             # Express Routes
│   │── middleware/         # Middleware functions
│   │── server.js           # Express App entry point
│   │── .env                # Environment variables
│── client/                 # Frontend code
│── package.json            # Dependencies and scripts
│── README.md               # Project documentation
```

## User Roles

- **Admin**: Full access to the system.
- **Waiter**: Can manage orders and tables. Also, view items in stock and chef lists.
- **Chef**: Can view and prepare orders.
- **Visitor**: Can view menu.

## Deployment

This application is deployed on Render. You can access it here: [Live Demo](https://ourestaurant.onrender.com)

## License

This project is licensed under the MIT License.

## Contributors

- [delbusque](https://github.com/delbusque)
- [Ventsislav Peychev](https://www.linkedin.com/in/ventsislav-peychev/)

## Contact

For any inquiries, please contact: [del.busque@gmail.com](mailto:del.busque@gmail.com)

