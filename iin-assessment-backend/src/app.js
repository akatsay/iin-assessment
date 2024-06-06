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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayData = void 0;
var minimist = require("minimist");
var args = minimist(process.argv.slice(2));
var stateNameArg = typeof args['state_name'] === 'string' ? args['state_name'] : '';
var fullReportArg = typeof args['full_report'] === 'number' ? args['full_report'] : 0;
// Check if state_name or full_report is passed properly and provide usage guidelines
if (!stateNameArg && !fullReportArg || stateNameArg && fullReportArg) {
    console.log("\n  This application accepts only one argument at a time.\n\n  Usage:\n  npm run start -- --state_name 'state_name' OR npm run start -- --full_report 'year'\n  Example: npm run start -- --state_name 'california'\n  Example: npm run start -- --full_report '2020' **Note only years 2013-2021 are supported.\n  Arguments:\n  --state_name 'state_name' - returns the population history for the passed state in chronological order.\n  --full_report 'year' - to return a list of state names and populations in descending order by population for the passed year.\n  ");
    process.exit(0);
}
/**
 * @description Retrieves state data from the DataUSA API.
 * @return {Promise<IData[]>} A promise that resolves to an array of state data.
 */
var getStatesData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, responseData, statesData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch('https://datausa.io/api/data?drilldowns=State&measures=Population')];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                responseData = _a.sent();
                statesData = responseData.data;
                return [2 /*return*/, statesData];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                process.exit(0);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * @description Retrieves and aggregates data based on the provided arguments.
 * @returns {Promise<IData[] | void>} An array of aggregated data or void if no data is available.
 * @param {string} state - The name of the state to retrieve data for.
 * @param {number} year - The year to retrieve data for.
 */
var aggregateData = function (state, year) { return __awaiter(void 0, void 0, void 0, function () {
    var statesData, filteredStateData, mappedStateData, sortedArray, filteredStateData, mappedStateData, sortedArray;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getStatesData()];
            case 1:
                statesData = _a.sent();
                // returns the population history for the passed state in chronological order.
                if (state) {
                    filteredStateData = statesData.filter(function (item) { return item.State.toLowerCase() === state; });
                    mappedStateData = filteredStateData.map(function (item) {
                        return { Year: item['ID Year'], Population: item.Population };
                    });
                    sortedArray = mappedStateData.sort(function (a, b) {
                        var yearA = a.Year;
                        var yearB = b.Year;
                        if (yearA < yearB) {
                            return -1;
                        }
                        if (yearA > yearB) {
                            return 1;
                        }
                        return 0;
                    });
                    return [2 /*return*/, sortedArray];
                }
                if (year && statesData) {
                    filteredStateData = statesData.filter(function (item) { return item["ID Year"] === year; });
                    mappedStateData = filteredStateData.map(function (item) {
                        return { State: item.State, Year: item['ID Year'], Population: item.Population };
                    });
                    sortedArray = mappedStateData.sort(function (a, b) {
                        var popA = a.Population;
                        var popB = b.Population;
                        if (popA < popB) {
                            return 1;
                        }
                        if (popA > popB) {
                            return -1;
                        }
                        return 0;
                    });
                    return [2 /*return*/, sortedArray];
                }
                return [2 /*return*/, statesData];
        }
    });
}); };
/**
 *@description Asynchronously displays aggregated data based on the provided arguments.
 * If `state` is provided, it logs the data for the specified state.
 * If `year` is provided, it logs the data for the specified year.
 * If neither argument is provided, it logs the raw dataset.
 * @param {string} state - The name of the state to display data for.
 * @param {number} year - The year to display data for.
 * @returns {Promise<void>} A Promise that resolves when the data is displayed.
 */
var DisplayData = function (state, year) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, aggregateData(state, year)];
            case 1:
                result = _a.sent();
                if (state) {
                    console.log("Data for state of ".concat(state, ":"));
                    console.log(result);
                    process.exit(0);
                }
                if (year) {
                    console.log("Data for year ".concat(year, ":"));
                    console.log(result);
                    process.exit(0);
                }
                console.log('Raw Data:');
                console.log(result);
                return [2 /*return*/];
        }
    });
}); };
exports.DisplayData = DisplayData;
(0, exports.DisplayData)(stateNameArg, fullReportArg).then();
