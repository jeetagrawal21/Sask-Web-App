const {By, Key, Builder} = require('selenium-webdriver');
require("chromedriver");


async function test_case(){

    //Lauch Browser
    let driver = await new Builder().forBrowser("chrome").build();
    
    //Navigate To Our Application
    await driver.get("https://google.com");

    //Add A Todo
    await driver.findElement(By.name("q")).sendKeys("Hello, World!", Key.RETURN);

    //Close The Browser
    setInterval(function(){
        driver.quit();
    }, 10000)
}

test_case();