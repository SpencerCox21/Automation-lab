const {By, Builder, Browser, until} = require('selenium-webdriver')

let driver;

beforeEach(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get("http://localhost:3000/")
    
});

afterEach(async () => {
    await driver.quit();
});


describe("Test the movies app", () => {
    test("can add a movie", async () => {
        const movie = 'Spiderman 2';

        await driver.findElement(By.css('input[name="movieTitle"]')).sendKeys('Spiderman 2')

        
        await driver.findElement(By.xpath('//button[@type="submit"]')).click()
        
        await driver.sleep(2000);
        
        const addedMovie = await driver.wait(until.elementLocated(By.css('label[for="movie-0"]')), 1000)
        
        expect(await addedMovie.getText()).toBe(movie)

        await driver.sleep(2000);
    });



    test("can remove a movie", async () => {
        const movie = 'Spiderman 2';


        await driver.findElement(By.css('input[name="movieTitle"]')).sendKeys('Spiderman 2')

        
        await driver.findElement(By.xpath('//button[@type="submit"]')).click()
        
        await driver.sleep(2000);



        await driver.findElement(By.xpath('//button[@class="delete-btn"]')).click()



        const checkMessage = await driver.wait(until.elementLocated(By.id('message')))
        expect(await checkMessage.getText()).toContain(movie)


        // const ulList = await driver.wait(until.elementLocated(By.css('label[for="movie-0"]')), 1000)
        
        // expect(await ulList.get().toBe())

        await driver.sleep(2000);
    });


    test("can check watched movie", async () => {
        const movie = 'Spiderman 2';


        await driver.findElement(By.css('input[name="movieTitle"]')).sendKeys('Spiderman 2')

        
        await driver.findElement(By.xpath('//button[@type="submit"]')).click()
        
        await driver.sleep(500);
        
        await driver.findElement(By.xpath('//input[@type="checkbox"]')).click()


        const checkMessage = await driver.wait(until.elementLocated(By.id('message')))
        expect(await checkMessage.getText()).toContain(movie)


        
        await driver.sleep(2000);
    });

    test("can uncheck movie", async () => {
        const movie = 'Spiderman 2';

        await driver.findElement(By.css('input[name="movieTitle"]')).sendKeys('Spiderman 2')

        
        await driver.findElement(By.xpath('//button[@type="submit"]')).click()
        
        await driver.sleep(500);
        
        await driver.findElement(By.xpath('//input[@type="checkbox"]')).click()
        
        await driver.sleep(2000);

        await driver.findElement(By.xpath('//input[@type="checkbox"]')).click()


        const checkMessage = await driver.wait(until.elementLocated(By.id('message')))
        expect(await checkMessage.getText()).toContain(movie)

        
        await driver.sleep(2000);
    });
});





