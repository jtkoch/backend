# Expat Journal - Back End Code Base

****A social media app for expats and travelers to connect and share experiences with each other. ****


## GETTING STARTED
  - This is a set of instructions for you to get a copy of the project up and running on your local machine for development and testing purposes. Below are some notes on how to deploy and install   the project on your machine. 

## INSTALLATION
  - first cd into the server folder and install dependencies with:
  ```npm install```

  - then launch the api with:
  ```npm run server```
  


## API 

## /--------------------------------------------/ AUTH ROUTES /-----------------------------------/
 - POST ```/api/auth/register```
  - Returns the newly created user object
  - Your request body must include a Username, Password, first name, last name, and email address

 - POST ```/api/auth/login```
  - Returns the user (if found and valid) along with a JSON Web token.
  - Your request body must include the name, password.

## /-------------------------------------------/ ENDPOINTS /--------------------------------------/**  
|    METHOD    |        ROUTE         | RESTRICTED |
|--------------|----------------------|------------|
|     POST     | /api/auth/register   |    NO      |
|     POST     | /api/auth/login      |    NO      |
|     GET      | /api/users           |    YES     |
|     GET      | /api/users/:id       |    YES     |
|     GET      | /api/users/:id/posts |    YES     |
|     PUT      | /api/users/:id       |    YES     |
|     DELETE   | /api/users/:id       |    YES     |
|     GET      | /api/posts           |    YES     |
|     GET      | /api/posts/:id       |    YES     |
|     POST     | /api/posts           |    YES     |
|     PUT      | /api/posts/:id       |    YES     |
|     DELETE   | /api/posts/:id       |    YES     |

