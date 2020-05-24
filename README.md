# Expat Journal - Back End Code Base

* A social media app for expats and travelers to connect and share experiences with each other.


## GETTING STARTED
  - This is a set of instructions for you to get a copy of the project up and running on your local machine for development and testing purposes. Below are some notes on how to deploy and install   the project on your machine. 

## INSTALLATION
  - first cd into the server folder and install dependencies with:
  ```npm install```

  - then launch the api with:
  ```npm run server```
  


## API 

#### BASEURL: ```https://expat-journal-backend-jensen.herokuapp.com```

## ENDPOINTS
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

## AUTH ROUTES
  ### POST ```/api/auth/register```
    - Returns the newly created user object
    - Your request body must include a username, password, first_name, last_name, and email address

  ### POST ```/api/auth/login```
    - Returns the user (if found and valid) along with a JSON Web token
    - Your request body must include the username, password

## USER ROUTES
  ### GET ```/api/users```
    - Returns an array of all the users in the database

  ### GET ```/api/users/:id```     
    - Returns username, password, first_name, last_name, and email of the user by ID
    - The ID should be in the request parameters

  ### GET ```/api/users/:id/posts```
    - Returns posts of specified user by ID

  ### PUT ```/api/users/:id```  
    - Returns an updated user object
    - The ID should be in the request parameters
    - Response of "success": "updated", and ID of the user that was updated

  ### DELETE ```/api/users/:id```  
    - Response of "success": "deleted", and ID of the user that was deleted

## POSTS ROUTES
  ### GET ```/api/posts```
    - Returns an array of all the posts in the database    

  ### GET ```/api/posts/:id```  
    - Returns user_id, title, body, and img_url
    - The ID should be in the request parameters

  ### POST ```/api/posts``` 
    - Creates a new user post to the specified user ID in the request body
    - Response of "success": "You have successfully created a new post"

  ### PUT ```/api/posts/:id```
    - Returns an updated posts object
    - The ID should be in the request parameters  
    - Response of "success": "updated", and ID of the post that was updated

  ### DELETE ```/api/posts/:id```
    - Response of "success": "deleted", and ID of the post that was deleted