import minimist from 'minimist';
import {IResponse, IData} from "./types";

const args = minimist(process.argv.slice(2));
const stateNameArg: string = args['state_name'] ? args['state_name'].toLowerCase() : '';
const fullReportArg: number = args['full_report'] ? args['full_report']: '';

// Check if state_name or full_report is passed properly and provide usage guidelines
if (!stateNameArg && !fullReportArg || stateNameArg && fullReportArg) {
  console.log(`
  This application accepts only one argument at a time.
 
  Usage:
  npm run start -- --state_name 'state_name' OR npm run start -- --full_report 'year'
  Example: npm run start -- --state_name 'california'
  Example: npm run start -- --full_report '2020' **Note only years 2013-2021 are supported.
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
const getStateData = async (): Promise<IData[]> => {
  try {
    const response = await fetch('https://datausa.io/api/data?drilldowns=State&measures=Population');
    const responseData: IResponse = await response.json();
    const stateData: IData[] = responseData.data;
    return stateData;
  } catch (error) {
    console.error(error);
    process.exit(0)
  }
}

/**
 * @description Retrieves and aggregates data based on the provided arguments.
 * @returns {Promise<IData[] | void>} An array of aggregated data or void if no data is available.
 */
const aggregateData = async () => {
  const stateData: IData[] = await getStateData();

  // returns the population history for the passed state in chronological order.
  if (stateNameArg) {
    const filteredStateData = stateData.filter((item) => item.State.toLowerCase() === stateNameArg);
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

  if (fullReportArg && stateData) {
    const filteredStateData = stateData.filter((item) => item["ID Year"] === fullReportArg);
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
  return stateData;
}

/**
 *@description Asynchronously displays aggregated data based on the provided arguments.
 * If `stateNameArg` is provided, it logs the data for the specified state.
 * If `fullReportArg` is provided, it logs the data for the specified year.
 * If neither argument is provided, it logs the raw dataset.
 *
 * @returns {Promise<void>} A Promise that resolves when the data is displayed.
 */
export const DisplayData = async () => {
  const result = await aggregateData();
  if (stateNameArg) {
    console.log(`Data for state of ${stateNameArg}:`);
    console.log(result)
    process.exit(0);
  }
  if (fullReportArg) {
    console.log(`Data for year ${fullReportArg}:`);
    console.log(result)
    process.exit(0);
  }
  console.log('Raw Data:');
  console.log(result)
};

DisplayData().then();



