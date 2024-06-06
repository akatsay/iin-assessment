import minimist = require('minimist');
import {IResponse, IData} from "./types";

const args = minimist(process.argv.slice(2));
const stateNameArg: string = typeof args['state_name'] === 'string' ? args['state_name'] : '';
const fullReportArg: number = typeof args['full_report'] === 'number' ? args['full_report']: 0;

// Check if state_name or full_report is passed properly and provide usage guidelines
if (!stateNameArg && !fullReportArg || stateNameArg && fullReportArg) {
  console.log(`
  This application accepts only one argument at a time.

  Usage:
  node app.js --state_name 'state_name' OR node app.js --full_report 'year'
  Example: node app.js --state_name 'california'
  Example: node app.js --full_report 2020 **Note only years 2013-2021 are available.
  Arguments:
  --state_name 'state_name' - returns the population history for the passed state in chronological order.
  --full_report 'year' - to return a list of state names and populations in descending order by population for the passed year.
  `);
  process.exit(0);
}

/**
 * @description Retrieves state data from the DataUSA API.
 * @return {Promise<IData[]>} A promise that resolves to an array of state data.
 */
const getStatesData = async (): Promise<IData[]> => {
  try {
    const response = await fetch('https://datausa.io/api/data?drilldowns=State&measures=Population');
    const responseData: IResponse = await response.json();
    const statesData: IData[] = responseData.data;
    return statesData;
  } catch (error) {
    console.error(error);
    process.exit(0)
  }
}

/**
 * @description Retrieves and aggregates data based on the provided arguments.
 * @returns {Promise<IData[] | void>} An array of aggregated data or void if no data is available.
 * @param {string} state - The name of the state to retrieve data for.
 * @param {number} year - The year to retrieve data for.
 */
const aggregateData = async (state: string, year: number) => {
  const statesData: IData[] = await getStatesData();

  // returns the population history for the passed state in chronological order.
  if (state) {
    const filteredStateData = statesData.filter((item) => item.State.toLowerCase() === state);
    const mappedStateData = filteredStateData.map((item) => {
      return {Year: item['ID Year'], Population: item.Population};
      }
    );
    const sortedArray =  mappedStateData.sort((a, b) => {
      const yearA = a.Year;
      const yearB = b.Year;
      if (yearA < yearB) {
        return -1;
      }
      if (yearA > yearB) {
        return 1;
      }
      return 0;
    });
    return sortedArray;
  }

  if (year && statesData) {
    const filteredStateData = statesData.filter((item) => item["ID Year"] === year);
    const mappedStateData = filteredStateData.map((item) => {
        return {State: item.State, Year: item['ID Year'], Population: item.Population};
      }
    );
    const sortedArray =  mappedStateData.sort((a, b) => {
      const popA = a.Population;
      const popB = b.Population;
      if (popA < popB) {
        return 1;
      }
      if (popA > popB) {
        return -1;
      }
      return 0;
    });
    return sortedArray;
  }
  return statesData;
}

/**
 *@description Asynchronously displays aggregated data based on the provided arguments.
 * If `state` is provided, it logs the data for the specified state.
 * If `year` is provided, it logs the data for the specified year.
 * If neither argument is provided, it logs the raw dataset.
 * @param {string} state - The name of the state to display data for.
 * @param {number} year - The year to display data for.
 * @returns {Promise<void>} A Promise that resolves when the data is displayed.
 */
export const DisplayData = async (state: string, year: number) => {
  const result = await aggregateData(state, year);
  if (state) {
    console.log(`Data for state of ${state}:`);
    console.log(result)
    process.exit(0);
  }
  if (year) {
    console.log(`Data for year ${year}:`);
    console.log(result)
    process.exit(0);
  }
  console.log('Raw Data:');
  console.log(result)
};

DisplayData(stateNameArg, fullReportArg).then();



