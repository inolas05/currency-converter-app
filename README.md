# Currency Converter Application

The Currency Converter Application is a web-based tool that allows users to convert currencies using exchange rates.

## Features

- Convert currencies based on exchange rates
- View conversion history
- Responsive user interface

## Technologies Used

- Frontend: React.js
- Backend: Node.js with Express.js
- Testing: Cypress
- Deployment: Docker

## Installation

Follow these steps to install and run the Currency Converter Application:

1. Clone the repository:
git clone <repository-url>
2. Navigate to the project directory:
cd currency-converter-app
3. Install dependencies for the backend and frontend:
npm install

## Usage

1. Start the application using Docker:

- Build the Docker image:
  ```
  docker build -t currency-converter-app .
  ```

- Run the Docker container:
  ```
  docker run -p 3001:3001 currency-converter-app
  ```

2. Access the application in your browser at: `http://localhost:3001`

## Testing

The Currency Converter Application uses Cypress for end-to-end testing. Follow these steps to run the tests:

1. Make sure the application is running.
2. In a separate terminal, run the following command to open the Cypress Test Runner:
npx cypress open

3. In the Cypress Test Runner, click on the `currencyConvert.cy.js` test file to run it.
4. Cypress will automatically open a browser and execute the test steps.
5. Once the test is complete, Cypress will display the test results in the Test Runner.
