from selenium import webdriver
import time
from selenium.webdriver.common.by import By

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
email = driver.find_element(By.ID, "email")
password = driver.find_element(By.ID, "password")
signinButton = driver.find_element(By.CLASS_NAME, "signin-button")
time.sleep(2)
email.send_keys("testuser1@email.com")
password.send_keys("testpass1")
# test with wrong pwd length
# test with an unaccurate email format
time.sleep(7)
signinButton.click()
time.sleep(6)
#click on the Get started for free button
# driver.find_element_by_link_text("Get started free").click()
# time.sleep(10)
#close the browser
driver.close()
driver.quit()
print("Test Execution Successfully Completed!")

#test wrong crediantials, test with right, request button,

