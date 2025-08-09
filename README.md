#  Find-A-Worker Web Application

**Find-A-Worker** is a **full-stack web application** designed to connect customers with skilled professionals across various service categories.
The platform allows customers to search, filter, and connect with workers based on location and service type.

##  Features

*  User Registration** — Customers and workers can create accounts with role selection.
*  Secure Login** — Authentication with encrypted passwords using `bcrypt`.
*  Service Categories** — Dedicated pages for services like Plumbing, Electrical, Carpentry, etc.
*  Location-Based Search** — Filter workers by city or region.
*  Worker Profiles** — View detailed worker profiles including experience, skills, and contact info.
*  Contact Form** — Fully functional contact form powered by **Formspree**.

## Tech Stack

 Frontend

* HTML5, CSS3, JavaScript
* Responsive design principles
* Live Server for local development

### **Backend**

* Node.js
* Express.js
* MySQL for database management
* `bcrypt` for password hashing
* `cors` for cross-origin requests

##  Project Structure

```
Find-A-Worker/
├── public/                # Static frontend files (CSS, JS, Images)
├── views/                 # HTML pages
│   ├── index.html
│   ├── register.html
│   ├── login.html
│   ├── services/          # Service category pages
├── server.js               # Node.js backend server
├── database_setup.sql      # SQL script for database tables
├── package.json
└── README.md

```

##  Getting Started

Follow these steps to set up **Find-A-Worker** locally:

###  Prerequisites

* [Node.js](https://nodejs.org/) installed
* [MySQL](https://dev.mysql.com/downloads/) or a local server stack (e.g., XAMPP)
* [VS Code](https://code.visualstudio.com/) with **Live Server** extension


###  Installation

**Clone the repository**

-- git clone https://github.com/sumitpatel1008/Find-A-Worker.git
cd Find-A-Worker


**Install dependencies**

-- npm install



###  Database Setup

1. Open MySQL Workbench or your preferred MySQL tool.
2. Create the database:

CREATE DATABASE find_a_worker;


3. Create the required tables using `database_setup.sql`
```sql
-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    user_type ENUM('customer', 'worker') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Worker Profiles Table
CREATE TABLE worker_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    service_category VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    about_me TEXT,
    experience_years INT,
    profile_image_url VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

###  Configure Database Connection

Open `server.js` and update your MySQL credentials:

```
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "YOUR_PASSWORD",
    database: "find_a_worker",
    port: 3306
});
```

###  Start the Backend Server


--- node server.js

If successful, you should see:


MySQL Connected...
Server running on port 5000

###  Launch the Frontend

1. Open **VS Code**
2. Right-click on `index.html`
3. Select **"Open with Live Server"**
4. The site will be available in your browser (e.g., `http://127.0.0.1:5501`)


##  API Endpoints

| Method | Endpoint          | Description             |
| ------ | ----------------- | ----------------------- |
| POST   | `/register`       | Register a new user     |
| POST   | `/login`          | Login and authenticate  |
| POST   | `/worker_profile` | Create a worker profile |


## Security Measures

* **Password Encryption**: All passwords stored as bcrypt hashes.
* **SQL Injection Prevention**: Using parameterized queries.
* **CORS Support**: Enabled for local and remote requests.


##  License

This project is licensed under the **MIT License**.
Feel free to fork, modify, and use for your own projects.


##  Author

**Sumit Patel**
📧 Email: [patelsumit55286@gmail.com](mailto:patelsumit55286@gmail.com)
🔗 GitHub: [sumitpatel1008](https://github.com/sumitpatel1008)

