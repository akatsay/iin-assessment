"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimist_1 = __importDefault(require("minimist"));
const args = (0, minimist_1.default)(process.argv.slice(2));
const stateNameArg = args['state_name'] ? args['state_name'].toLowerCase() : '';
const fullReportArg = args['full_report'] ? args['full_report'] : '';
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
const getStateData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('https://datausa.io/api/data?drilldowns=State&measures=Population');
        const responseData = yield response.json();
        const stateData = responseData.data;
        return stateData;
    }
    catch (error) {
        console.error(error);
        process.exit(0);
    }
});
/**
 * Retrieves and aggregates data based on the provided arguments.
 * @returns {Promise<IData[] | void>} An array of aggregated data or void if no data is available.
 */
const aggregateData = () => __awaiter(void 0, void 0, void 0, function* () {
    const stateData = yield getStateData();
    // returns the population history for the passed state in chronological order.
    if (stateNameArg) {
        const filteredStateData = stateData.filter((item) => item.State.toLowerCase() === stateNameArg);
        const mappedStateData = filteredStateData.map((item) => {
            return { Year: item['ID Year'], Population: item.Population };
        });
        const sortedArray = mappedStateData.sort((a, b) => {
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
            return { State: item.State, Year: item['ID Year'], Population: item.Population };
        });
        const sortedArray = mappedStateData.sort((a, b) => {
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
});
const DisplayData = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield aggregateData();
    if (stateNameArg) {
        console.log(`Data for state of ${stateNameArg}:`);
        console.log(result);
        process.exit(0);
    }
    if (fullReportArg) {
        console.log(`Data for year ${fullReportArg}:`);
        console.log(result);
        process.exit(0);
    }
    console.log('Raw Data:');
    console.log(result);
});
DisplayData();
