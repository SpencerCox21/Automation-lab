const {By, Builder, Browser, until} = require('selenium-webdriver')

let driver;

beforeEach(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
});

afterEach(async () => {
    await driver.quit();
});


describe("Test the movies app", () => {
    test("can add a movie", async () => {
        
        const movie = 'Spiderman 2';

        await driver.get("http://localhost:3000/")

        await driver.findElement(By.css('input[name="movieTitle"]')).sendKeys('Spiderman 2')

        
        await driver.findElement(By.xpath('//button[@type="submit"]')).click()
        
        await driver.sleep(2000);
        
        const addedMovie = await driver.wait(until.elementLocated(By.css('label[for="movie-0"]')), 1000)
        
        expect(await addedMovie.getText()).toBe(movie)

        await driver.sleep(2000);
    });



    test("can remove a movie", async () => {

        const movie = 'Spiderman 2';

        await driver.get("http://localhost:3000/")

        await driver.findElement(By.css('button[class="delete-btn"]')).click()

        const deleteMovie = await driver.wait(until.elementLocated(By.css('label[for="movie-0"]')), 1000)
        
        expect(await deleteMovie.getText()).toBe(movie)

    })
});





