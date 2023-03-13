from selenium import webdriver
import time
from selenium.webdriver.common.by import By
import sys

def test1():
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
    driver.get("http://covid_api:3000")
    driver.get("http://covid_app:3080")

    time.sleep(3)
    #assertion
    expected_url = "http://covid_app:3080/"
    if (driver.current_url != expected_url):
        print('Error expected the page to be at ' + expected_url + " but it's at " + driver.current_url)
        time.sleep(2)
        driver.close()
        driver.quit()
        print("Test 1 failed")
        sys.exit() 

    email = driver.find_element(By.ID, "email")
    password = driver.find_element(By.ID, "password")
    signinButton = driver.find_element(By.CLASS_NAME, "signin-button")
    time.sleep(2)
    email.send_keys("testuser1@email.com")
    password.send_keys("testpass1")

    time.sleep(7)
    signinButton.click()
    time.sleep(6)

    #assertion
    expected_url = "http://covid_app:3080/Dashboard"
    if (driver.current_url != expected_url):
        print('Error expected the page to be at ' + expected_url + " but it's at " + driver.current_url)
        time.sleep(2)
        driver.close()
        driver.quit()
        print("Test 1 failed")
        sys.exit() 

    #close the browser
    driver.close()
    driver.quit()
    print("Test Execution Successfully Completed!")

#test wrong crediantials, test with right, request button,

def test2():
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
    driver.get("http://covid_api:3000")
    driver.get("http://covid_app:3080")

    time.sleep(3)
    #assertion
    expected_url = "http://covid_app:3080/"
    if (driver.current_url != expected_url):
        print('Error expected the page to be at ' + expected_url + " but it's at " + driver.current_url)
        time.sleep(2)
        driver.close()
        driver.quit()
        print("Test 2 failed")
        sys.exit() 

    email = driver.find_element(By.ID, "email")
    password = driver.find_element(By.ID, "password")
    signinButton = driver.find_element(By.CLASS_NAME, "signin-button")
    time.sleep(2)
    email.send_keys("testuser1@email.com")
    password.send_keys("testpass1")

    time.sleep(7)
    signinButton.click()
    time.sleep(6)

    #assertion
    expected_url = "http://covid_app:3080/"
    if (driver.current_url != expected_url):
        print('Error expected the page to be at ' + expected_url + " but it's at " + driver.current_url)
        time.sleep(2)
        driver.close()
        driver.quit()
        print("Test 2 failed")
        sys.exit() 

    #close the browser
    driver.close()
    driver.quit()
    print("Test Execution Successfully Completed!")

test1()
test2()