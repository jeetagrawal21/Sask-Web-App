from selenium import webdriver
import time
from selenium.webdriver.common.by import By
import sys
try:
    print("Test Execution Started")
    options = webdriver.ChromeOptions()
    options.add_argument('--ignore-ssl-errors=yes')
    options.add_argument('--ignore-certificate-errors')
    driver = webdriver.Remote(
    command_executor='http://localhost:4444/wd/hub',
    options=options
    )
    #maximize the window size
    driver.maximize_window()
    time.sleep(5)
    #navigate to browserstack.com
    driver.get("http://covid_app:3080")
    time.sleep(3)
    requestAccount = driver.find_element(By.CLASS_NAME, "request-account-link")
    requestAccount.click()
    time.sleep(2)
    # check to see if it gets to the right page
    expected_url = "http://covid_app:3080/RequestAccount"
    if (driver.current_url != expected_url):
        print('Error expected the page to be at ' + expected_url + " but it's at " + driver.current_url)
        time.sleep(2)
        driver.close()
        driver.quit()
        print("Test failed")
        sys.exit() 

    driver.close()
    driver.quit()
    print("Test Execution Successfully Completed!")
except BaseException as e:
    print("Error, RequestAccountTest failed.")
    print(type(e))
    print(e.args)
    print(e)
    driver.close()
    driver.quit()