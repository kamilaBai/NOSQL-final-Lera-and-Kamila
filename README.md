Sneakers Shop
Description
The Sneakers Shop is a web application built using Node.js and MongoDB, allowing users to manage products in a virtual sneaker store. Users can register an account, log in securely, and manage product listings by adding, updating, and deleting items from the store. The application uses Express.js for backend routing and EJS as the templating engine for rendering HTML views. All product information and user credentials are stored in MongoDB.

This application serves as a simple e-commerce platform to demonstrate the use of Node.js, Express, MongoDB, and basic authentication.

Features
User Features
User Registration: New users can create an account by entering a username and password. Passwords are securely hashed using bcrypt before being stored in the database.
User Login: Registered users can log in to their accounts using their username and password.
Product Management
Add Product: Admins can add new products to the store, providing details like name, product ID, price, old price, and an image URL.
Update Product: Users can update existing product details by entering the product_id. Fields such as name, price, old price, and image URL can be updated.
Delete Product: Products can be deleted from the store by submitting a request with the product’s MongoDB ID.
Product List: All available products are listed on the main page, showing relevant product details.
Authentication
Password Hashing: The passwords entered by users are hashed using bcrypt to ensure security.
Session Management: Users must log in before accessing the product management features.
Tech Stack
Backend: Node.js, Express.js
Database: MongoDB (with Mongoose for object modeling)
Templating Engine: EJS (for rendering dynamic HTML views)
Authentication: Bcrypt.js (for secure password hashing)
Installation
Follow these steps to set up the project on your local machine:

1. Clone the Repository
First, clone the project repository to your local system:

git clone https://github.com/your-username/sneakers-shop.git
cd sneakers-shop
2. Install Dependencies
Make sure Node.js and npm (Node Package Manager) are installed. Install the required dependencies by running:
npm install
This command installs all dependencies listed in the package.json file, including Express, Mongoose, bcryptjs, and others.

3. Set up MongoDB
You need to have MongoDB installed and running on your machine.

If MongoDB is not installed, follow the official MongoDB installation guide here.
After installation, start MongoDB using the following command:

mongod
By default, MongoDB will run on mongodb://localhost:27017.

4. Run the Application
Once MongoDB is running, start the application using:

node server.js
The application will be available on http://localhost:3000. Open this URL in your browser to interact with the sneakers shop.

Routes
Authentication
POST /register: Handles user registration. Users provide a username and password.
POST /login: Handles user login. Users provide their username and password.
Product Management
GET /main: Displays the list of products in the store.
POST /addProduct: Adds a new product to the store. Fields required: name, product_id, price, old price, image_url.
POST /deleteProduct: Deletes a product from the store. You need to provide the product's MongoDB ID.
POST /updateProduct: Updates a product's details using its product_id. Fields: new_name, new_price, new_old_price, new_image_url.
Authentication Views
GET /: Displays the user registration page.
GET /login: Displays the login page.
Product Views
GET /main: Displays a list of all products. This page is only accessible after logging in.
Usage
User Registration:

Visit the homepage (/) and fill out the registration form.
Provide a valid username and password.
User Login:

After registering, go to the login page (/login) and enter your credentials.
If the login is successful, you will be redirected to the main page, where you can manage products.
Manage Products:

Add New Product: Fill out the "Add New Product" form on the main page. You need to provide the product’s name, ID, price, old price, and image URL.
Update Product: If you want to update an existing product, provide its product_id in the "Update Product" form and fill in the new details.
Delete Product: To delete a product, click the delete button next to the product listing.
Example Flow
Registration:
Navigate to the homepage (/) and register with your username and password.
Login:
Once registered, log in using your credentials.
Add Product:
After logging in, you can add a new product to the store by filling out the form on the main page.
Update Product:
To update a product, enter its product_id in the update form and provide the new values.
Delete Product:
You can delete a product by clicking the "Delete" button next to the product you want to remove.
Folder Structure
The folder structure is as follows:

/sneakers-shop
    /public
        /styles.css          # Custom CSS for styling
    /views
        index.ejs            # Registration page
        login.ejs            # Login page
        main.ejs             # Main product management page
    server.js                # Node.js server with routing logic
    package.json             # Project dependencies and metadata
/public/styles.css: Contains custom CSS for styling the pages.
/views/*.ejs: EJS template files for rendering HTML pages dynamically.
server.js: The main server file that handles routing, database interactions, and rendering views.
License
This project is licensed under the MIT License.

