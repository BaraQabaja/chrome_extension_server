# Chrome Extension 

A short description of your project.

## Table of Contents

- [Installation](#installation)
- [Code Structure](#code Structure)
- [Assumption](#assumption)
- [How To Test APIs](#how to test APIs)


## Installation

**Clone the Repository:**

- Go to the GitHub repository of the project ([https://github.com/BaraQabaja/chrome_extension](https://github.com/BaraQabaja/chrome_extension)) you want to run.
- Click on the "Code" button and copy the repository URL ([https://github.com/BaraQabaja/chrome_extension.git](https://github.com/BaraQabaja/chrome_extension.git)).
- Open your terminal/command prompt.
- Navigate to the directory where you want to clone the project.
- Run the following command :

     ```
     git clone https://github.com/BaraQabaja/chrome_extension.git
     ```
This will download the project's code to your local machine.


###Start with the Server side
**Install Server Dependencies:**

- Navigate to the server's directory using the terminal.
- Run the following command to install the server's dependencies (usually listed in a package.json file):

     ```
     npm install
     ```

**Run the server:**

- Run the following command to run the Server:

     ```
     nodemon .\index.js
     ```

### Client side
-Return to the project's root directory (the one containing both the server and client directories).
Navigate to the client directory using cd client.

**Install Client Dependencies:**

- Return to the project's root directory (the one containing both the server and client directories).
Navigate to the client directory using `cd client` using the terminal.
- Run the following command to install the server's dependencies (usually listed in a package.json file):

     ```
     npm install
     ```

**Run the Client chrome extension:**
- Navigate to `chrome://extensions/`. 
- Choose "Load unpacked" .
- Go to project folder and navigate to client folder, then choose dist folder and click Select Folder, the extension will appear on your chrome and then you can click on it but still not working because we are not runnig the server yet.
- navigate to client folder using `cd client` using terminal.
- Run the following command to run the chrome_extension client-side project:

     ```
     npm run dev
     ```

## Code Structure
The project follows a structured organization to maintain code readability and scalability.it provides a clear separation of concerns and makes it easier to maintain and expand our project. Below is an overview of the key components and directories:

**General project structure**

chrome_extension/
├── client/
├── server/


**Client side strucure**

client/
├── src/
    ├───assets (contians imgs but i did not store any img in it depending on project requirements)
    ├───components (This directory contains reusable React components used throughout the application but in this       app i did not built any component in it depending on project requirements)
    ├───hook
    │   └───auth
    ├───pages
    │   ├───Home
    │   └───Login
    └───Redux (state management tool and i used for APIs handling)


**Server side strucure**

server/
├───config (DB configration)
│
├───controllers (handle the application's logic and interact with the data in models)
│    └───auth_controller.js (handle authintication logic like login, logout and many auth issues)
│    └───user_controller.js
│
├───models (DB layout, i used ORM called sequelize)
│    └───user.js
│
├───node_modules (used packeges)
│
├────routes (define the API endpoints and their corresponding controllers.)
│    └───user_route.js
│
└───utils (used for token creation and error handling)


## Assumption
- **User Authentication**: I assumed that users have a basic understanding of the authentication process. Users are expected to provide valid credentials when logging in like email and password, and I do not provide detailed instructions for password recovery in this chrome extension app.

- **Supported Browsers**: I assume that users will access our Chrome extension using up-to-date versions of the Google Chrome browser. Compatibility with other browsers is not guaranteed because i just test it on chrome.

- **Internet Connection**: Users are assumed to have a stable internet connection while using our extension. Offline functionality is not a priority in this version of the chrome extension.

- **Security issues**: It is assumed that the Node.js server will receive a certain number of requests every 15 minutes i put a limitation on the number of requests to be 100 request every 15 min to increase the security level.


## How To Test APIs

I used Postman to do unit testing, there are 6 steps to prepare your Postman environment :

1. **Project workspace link:** [https://cloudy-station-78753.postman.co/workspace/33b1501d-f65d-4281-987c-08fc3edd62db](https://cloudy-station-78753.postman.co/workspace/33b1501d-f65d-4281-987c-08fc3edd62db)

2. **Prepare the Working Environment:** 
  - I have prepared an environment called "Dev: chrome_extension" You can find it on the top right corner, Click on it.

3. Go to auth folder and then click on "login", after that you will find a key word called "Tests" Click on it and write the following code:

     ```javascript
     pm.environment.set("JWT", pm.response.json().token);
     ```

4. Got to authorization.

5. Choose the Type to be "Bearer Token" and do that for all requests like logout,update username, and get user info.

6. There is ready Json data i have written for API testing.


