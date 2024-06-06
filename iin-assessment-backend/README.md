# iin-assessment-backend

## Description

This is a node application developed for the IIN assessment. It retrieves data from the DataUSA API and provides population-related information based on specified parameters via command-line.

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
   git clone https://github.com/akatsay/iin-assessment.git
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

1. Build the TypeScript files:
    ```
    npm run build
    ```

2. Navigate to .dist folder
    ```
    cd .dist
    ```

3. Run the program with specified arguments
    ```
    node app.js 
    ```

The program retrieves population-related data based on the specified parameters. Supported parameters are:

- `--state_name 'state_name'`: Retrieves the population history for the specified state in chronological order.
- `--full_report 'year'`: Retrieves a list of state names and populations in descending order by population for the specified year (2013-2021 supported).

Example usage:

```
node app.js --state_name 'california'
node app.js --full_report '2020'
```

## Dependencies

- **minimist**: ^1.2.8
- **@types/minimist**: "^1.2.5"
- **@types/node**: ^20.14.1