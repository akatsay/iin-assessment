"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
describe('app', () => {
    it('should log the third command line argument', () => {
        const arg = 'testArgument';
        const output = (0, child_process_1.execSync)(`node .dist/app.js ${arg}`, { encoding: 'utf-8' });
        expect(output.trim()).toBe(arg);
    });
});
