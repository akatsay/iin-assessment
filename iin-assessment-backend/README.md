# iin-assessment-backend

## Description

This is a backend program developed for the IIN assessment. It retrieves data from the DataUSA API and provides population-related information based on specified parameters.

## Installation

Before running the program locally, ensure you have Node.js and TypeScript installed on your machine. You can install them using the following steps:

1. **Node.js:**
    - Download and install Node.js from the [official website](https://nodejs.org/).
    - Follow the installation instructions provided for your operating system.

2. **TypeScript:**
    - After installing Node.js, open a terminal and install TypeScript globally using npm:
      ```
      npm install -g typescript
      ```

Once Node.js and TypeScript are installed, you can proceed with the following steps to set up and run the program.

## Setup

1. Clone the repository to your local machine:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd iin-assessment-backend
   ```

3. Install project dependencies:
   ```
   npm install
   ```

## Usage

To run the program, you can use the provided npm scripts defined in the package.json file:

- **Build the TypeScript files:**
  ```
  npm run build
  ```

- **Run tests:**
  ```
  npm test
  ```

- **Start the program:**
  ```
  npm start
  ```

By default, the program retrieves population-related data based on the specified parameters. You can pass parameters to the program to customize its behavior. Supported parameters are:

- `--state_name 'state_name'`: Retrieves the population history for the specified state in chronological order.
- `--full_report 'year'`: Retrieves a list of state names and populations in descending order by population for the specified year (2013-2021 supported).

Example usage:

```
npm start -- --state_name 'california'
npm start -- --full_report '2020'
```

## Tests

The program includes Jest tests to ensure its functionality. You can run the tests using the following command:

```
npm test
```

## Dependencies

- **minimist**: ^1.2.8
- **@types/minimist**: "^1.2.5"
- **@types/jest**: ^29.5.12
- **@types/node**: ^20.14.1
- **jest**: ^29.7.0
- **ts-jest**: ^29.1.4