import { execSync } from 'child_process';

describe('app', () => {
  it('should log the third command line argument', () => {
    const arg = 'testArgument';
    const output = execSync(`node .dist/app.js ${arg}`, { encoding: 'utf-8' });

    expect(output.trim()).toBe(arg);
  });
});