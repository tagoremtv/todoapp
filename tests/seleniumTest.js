const { Builder, By, until } = require('selenium-webdriver');
const assert = require('chai').assert;
const chrome = require('selenium-webdriver/chrome');
const path = require('path');
const mocha = require('mocha');
const MochaHtmlReporter = require('mocha-html-reporter');

// Initialize Chrome Driver
let driver;
const appUrl = 'https://your-app-service-url.com'; // Replace with your actual Azure App Service URL

// Test Suite
describe('To-Do List App Selenium Tests', function () {
    this.timeout(30000); // Set a timeout to allow page loading

    beforeEach(async () => {
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options())
            .build();
    });

    afterEach(async () => {
        await driver.quit();
    });

    // Test Case 1: Test if the homepage is loading correctly
    it('should load the homepage and check the title', async () => {
        await driver.get(appUrl);
        let title = await driver.getTitle();
        assert.equal(title, 'Your To-Do List'); // Replace with your expected title
    });

    // Test Case 2: Test adding a task
    it('should add a new task', async () => {
        await driver.get(appUrl);
        await driver.findElement(By.id('new-task')).sendKeys('New Task'); // Replace with the actual ID for the input box
        await driver.findElement(By.id('add-task-button')).click(); // Replace with the actual ID for the add button
        let tasks = await driver.findElements(By.css('.task-item')); // Replace with your CSS selector for task items
        assert.isTrue(tasks.length > 0, 'Task was not added');
    });

    // Test Case 3: Test removing a task
    it('should remove a task', async () => {
        await driver.get(appUrl);
        await driver.findElement(By.id('new-task')).sendKeys('Task to Remove');
        await driver.findElement(By.id('add-task-button')).click();
        let removeButton = await driver.findElement(By.css('.remove-task-button')); // Replace with actual remove button class or ID
        await removeButton.click();
        let tasks = await driver.findElements(By.css('.task-item'));
        assert.isFalse(tasks.length === 1, 'Task was not removed');
    });
});
