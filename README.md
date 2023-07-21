# ProShop eCommerce Platform
eCommerce platform built with the MERN stack & Redux.

## Features
- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

## Usage
1. Create a MongoDB database and obtain your MongoDB URI - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a PayPal account and obtain your Client ID - [PayPal Developer](https://developer.paypal.com/).

## Env Variables
Rename the `.env.example` file to `.env` and add the following:

NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
PAGINATION_LIMIT = 8

markdown
Copy code

Change the `JWT_SECRET` and `PAGINATION_LIMIT` to what you want.

## Install Dependencies (frontend & backend)
npm install
cd frontend
npm install

markdown
Copy code

## Run
- Run frontend (:3000) & backend (:5000)
npm run dev

diff
Copy code

- Run backend only
npm run server

r
Copy code

## Build & Deploy
Create frontend prod build
cd frontend
npm run build

python
Copy code

## Seed Database
You can use the following commands to seed the database with some sample users and products as well as destroy all data:

- Import data
npm run data:import

diff
Copy code

- Destroy data
npm run data:destroy

shell
Copy code

## Sample User Logins
- **admin@email.com (Admin)**
  Password: 123456

- **john@email.com (Customer)**
  Password: 123456

- **jane@email.com (Customer)**
  Password: 123456

## Bug Fixes, Corrections, and Code FAQ
### BUG: Warnings on ProfileScreen
### BUG: Changing an uncontrolled input to be controlled
### BUG: All file types are allowed when updating product images
### BUG: Throwing error from productControllers will not give a custom error response
### BUG: Bad responses not handled in the frontend
### Example from PlaceOrderScreen.jsx
### BUG: After switching users, our new user gets the previous users cart
### FAQ: How do I use Vite instead of CRA?
#### Setting up the proxy
#### Setting up linting
#### Vite outputs the build to /dist
#### Vite has a different script to run the dev server

## A Final Note
Add any final notes or additional information here.

## License
Include the license information for your project here.
