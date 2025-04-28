const Mocha = require('mocha');
const mocha = new Mocha({
    reporter: 'mocha-html-reporter', // Use Mocha HTML Reporter
    reporterOptions: {
        reportFilename: 'report', // Report will be saved as report.html
    },
});

mocha.addFile('./tests/seleniumTest.js'); // Path to your test file

mocha.run(failures => {
    process.exitCode = failures ? 1 : 0; // Set the exit code to 1 if there are test failures
});
