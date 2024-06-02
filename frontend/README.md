# Frontend Detailed README for SRC

## Table of Contents

- [Overview](#overview)
- [Module and Code Structure Overview](#module-and-code-structure-overview)
- [URL Routing](#url-routing)
- [Plaid Connection](#plaid-connection)
- [Installation](#installation)
- [Acknowledgements](#acknowledgements)
- [Contributors](#contributors)
- [License](#license)

## Overview
The Frontend enters the program through public index.html which then calls index.js. The div is contained for App.js which is the main controller for the Frontend structure


## Module and Code Structure Overview
Our frontend application is secured with JWT tokens, which are managed using interceptors. 

- `api.js`: This file sets up a pre-configured instance of axios for making HTTP requests to our server. It also sets up an interceptor that adds an Authorization header to each request if an access token is present in local storage.

- `Constants.js`: This file stores the keys for accessing tokens in local storage.

- `.env`: This file stores environment variables, including the URL for the backend server connection. When deploying, remember to change the `.env` file to point to the actual backend server URL.

- `index.html` : This is the main HTML file that is loaded when a user visits your site. It includes a script tag that loads the `index.js` file, and it also includes the Plaid Link script (https://cdn.plaid.com/link/v2/stable/link-initialize.js). The Plaid Link script is necessary for using Plaid's Link product, which provides a secure, elegant authentication flow for users to connect their bank accounts to your application. 

- `index.js`: This is the entry point of our application. It contains the root div where our main `App.js` component is rendered. 

- `Protected Route`: This mechanism checks if a user is logged in when they attempt to access a protected route. If logged in, they receive a pair of tokens - an access token (short-lived) and a refresh token (longer lifespan). When navigating to a page that requires authentication, we verify the access token. If it's expired, we use the refresh token to generate a new access token. If the refresh token is also expired, the user is prompted to log in again.

- `src`: This is the main directory where the majority of our code resides. It contains the following subdirectories and files:

    - `Javascript_Pages`: This directory contains the main JavaScript files for our frontend pages.

    - `Styling_Pages`: This directory contains the CSS files that correspond to each JavaScript page.

    - `Components`: This directory contains reusable components, including protected routes for securing certain parts of our application.


## URL Routing



## Plaid Connection

Our application integrates with Plaid to securely connect with users' bank accounts. The process is as follows:

1. We initiate the linking process by sending a POST request to our server to create a Plaid link token.
2. This link token is used to open the Plaid Link module.
3. If the user successfully links their account, the Plaid Link module returns a public token.
4. We send this public token to our server to exchange it for an access token.
5. We use this access token to send requests to the Plaid API to retrieve the user's account data.
6. If the request is successful, we update the `accountData` state with the response data.

This process is implemented in the `Link_Account` component of our application.
 


## Installation

This project uses several dependencies:

- `axios`: A promise-based HTTP client for making requests from both the browser and Node.js.
- `react-router-dom`: A collection of navigational components for managing and implementing routing in a React application.
- `jwt-decode`: A small browser library that helps decoding JSON Web Tokens (JWTs) to extract and use the encoded data.
- `dotenv`: A zero-dependency module that loads environment variables from a `.env` file into `process.env`. It's used to handle project configuration.

To install these dependencies, run the following command: npm install axios react-router-dom jwt-decode dotenv

## Acknowledgements

This module has been developed and maintained by:

- Micah Chen, CEO at Harbinger

## Contributors
We would like to express our gratitude towards 'Tech With Tim' for their educational resources that greatly assisted the project.

## License
Currently, there is no specific license for this module. Please use it responsibly and ethically.



