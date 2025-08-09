Find-A-Worker Web Application
This is a full-stack web application for a platform that connects customers with skilled professionals for various services. The front-end is built with HTML, CSS, and JavaScript, and the back-end is a Node.js server with a MySQL database.

Features
User Registration: Customers and workers can create new accounts.

User Login: Secure login functionality for registered users.

Service Pages: Dedicated pages for different service categories (Plumbing, Electrical, etc.).

Location-Based Search: Search for services and filter workers by city.

Worker Profiles: View detailed profiles of workers.

Functional Contact Form: A working contact form that sends emails via Formspree.

Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
You will need to have the following software installed on your machine:

Node.js

[suspicious link removed] (or a package like XAMPP)

A code editor like VS Code with the Live Server extension.

Installation & Setup
Clone the repository:

git clone https://github.com/sumitpatel1008/Find-A-Worker.git

Navigate to the project directory:

cd Find-A-Worker

Install NPM packages:
This command will download and install all the necessary libraries for the back-end server (like Express, MySQL, etc.).

npm install

Set up the database:

Open your MySQL management tool (like MySQL Workbench).

Create a new database named find_a_worker.

Run the SQL commands in the database_setup.sql file (you'll need to create this file and paste the SQL code I gave you into it) to create the users and worker_profiles tables.

Configure the database connection:

Open the server.js file.

Update the db.createConnection details with your MySQL username and password if they are different.

Start the back-end server:

node server.js

Your terminal should show "MySQL Connected..." and "Server running on port 5000".

Start the front-end:

In VS Code, right-click on the index.html file.

Select "Open with Live Server".

The website will now be open in your browser and fully connected to your back-end.
