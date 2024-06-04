"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
describe('app', function () {
    it('should log the third command line argument', function () {
        var arg = 'testArgument';
        var output = (0, child_process_1.execSync)("node .dist/app.js ".concat(arg), { encoding: 'utf-8' });
        expect(output.trim()).toBe(arg);
    });
});
