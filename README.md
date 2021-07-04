# Contact Keeper Documentation

### Overview

A simple web application using React.js to manage contacts. Users can sign up for an account and login to their account to access the contacts data. 

### Development

- **Frontend**

    Single page application built using React v17, JavaScript, and CSS.

    To run the frontend app in development mode:

    Make sure Node.js v.14 or higher is installed on our computer.

    ```bash
    cd frontend
    ```

    Install the dependencies for this app

    ```bash
    npm install
    ```

    Run the development server and open `[http://localhost:3000](http://localhost:3000)` (Make sure the backend server is already running)

    ```bash
    npm start
    ```

- **Backend**

    The backend is a REST API with that provides the frontend the data from the database. It provides multiple endpoints that are available to be called by the frontend using HTTP request or AJAX calls. It is built using Node.js environment and Express framework. The backend is wrapped as a container using Dockerfile to be built as an image which is going to be deployed to the server (AWS EC2).

    To run the backend server in development mode:

    Make sure Node.js v.14 or higher is installed on our machine

    ```bash
    cd backend
    ```

    Install dependencies

    ```bash
    npm install
    ```

    Run the server in development mode (with hot reload)

    ```bash
    npm run server
    ```

    Run the server without hot reload

    ```bash
    npm start
    ```

- **Database**

    The database for this project is MongoDB which is a NoSQL database to store the users and contacts data. We use MongoDB Atlas which is a service in the cloud that MongoDB provides so we don't have to setup MongoDB locally and can be accessible from the cloud. This services makes the deployment really convenient because we don't need to setup a separate database container to run with Docker, we can just call the MongoDB URI that is provided to connect with our MongoDB database and collections.

### Deployment

- **Frontend**

    For the production deployment, we use AWS S3 to host the frontend application as a static website. Because it is a single page application and it is separated with the backend API, therefore we can deploy it separately as well.

    [Frontend Deployment Steps](./s3-deployment-steps.md)

- **Backend**

    For the backend deployment, we use Amazon EC2 to host our backend API as a remote server. Before deploying it to the cloud, we want to make sure to Dockerize our backend app. We create a Dockerfile for this app to then later be built as an image.
    
    [Backend Deployment Steps](./ec2-deployment-steps.md)