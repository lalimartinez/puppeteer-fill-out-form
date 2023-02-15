const puppeteer = require('puppeteer')

//SCROLL INTO VIEW FUNCTION
async function scrollToElement(page, selector) {
  const element = await page.$(selector);
  if (element) {
    await page.evaluate(el => el.scrollIntoView(), element);
  }
}

//FILL OUT A FORM
async function fillOutStartWebsiteProjectForm() {
  const browser = await puppeteer.launch({ headless: false, executablePath: '/opt/homebrew/bin/chromium' });
  const page = await browser.newPage();
  await page.goto('https://www.webstacks.com/');
  await page.waitForTimeout(3000);

  const closeSurveyButton = await page.$x('//*[@id="mutiny-preact-0df4392a-d9aa-4fe3-bede-8289ebaf933a"]/div/div[1]');
  await closeSurveyButton[0].click();
  await page.waitForTimeout(2000);

  //Open form
  const startWebsiteButton = await page.$x('//*[@id="76c00e62-f6cc-5450-9667-dfaf9604c3b0"]');
  await startWebsiteButton[3].click();
  await page.waitForTimeout(3000);

  //Fill out form
  await page.type('#mui-20', 'Lali');
  //await page.type('#mui-21', 'Martinez');
  //await page.type('#mui-22', 'lali@hi.com');
  await page.type('#mui-23', '8286371937')

  //Select drop down option
  const budgetDropdown = await page.$x('//*[@id="mui-component-select-estimated_website_project_budget"]');
  await budgetDropdown[3].click();
  await page.waitForTimeout(1000);
  const selectBudget = await page.$x('//*[@id="menu-estimated_website_project_budget"]/div[3]/ul/li[1]');
  await selectBudget[0].click();
  await page.waitForTimeout(1000);

  //Fill out the rest of the form
  scrollToElement(page, '#mui-24');
  await page.type('#mui-24', 'This is a description of the website.');
  await page.type('#mui-25', 'From a friend.');
  await page.waitForTimeout(2000);

  //Submit form
  const startAProjectButton = await page.$x('//*[@id="c9ddb794-a0ec-5d4b-a71e-82e31adc9f9e"]/form/div/button');
  startAProjectButton[3].click();
  await page.waitForTimeout(2000);

  //Check for empty required fields
  const firstNameInvalid = await page.evaluate(() => document.querySelector('#mui-20').getAttribute('aria-invalid') == 'true');
  const lastNameInvalid = await page.evaluate(() => document.querySelector('#mui-21').getAttribute('aria-invalid') == 'true');
  const emailInvalid = await page.evaluate(() => document.querySelector('#mui-22').getAttribute('aria-invalid') == 'true');
  const phoneInvalid = await page.evaluate(() => document.querySelector('#mui-23').getAttribute('aria-invalid') == 'true');
  const descriptionInvalid = await page.evaluate(() => document.querySelector('#mui-24').getAttribute('aria-invalid') == 'true');

  //Check if no option selected for drop down
  const dropdownEmpty = await page.evaluate(() => {
    const dropdownValue = Array.from(document.querySelectorAll('#mui-component-select-estimated_website_project_budget')).slice(-1)[0].textContent;
    return dropdownValue.length == 1;
  });

  //Print message to console if form was submitted or not
  if (firstNameInvalid || lastNameInvalid || emailInvalid || phoneInvalid || descriptionInvalid || dropdownEmpty)
    console.log("Error: form did not submit.");
  else
    console.log("Form successfully submitted.");

  await page.screenshot({ path: 'schedule_call_form.png', fullPage: true });
  await browser.close();
}

fillOutStartWebsiteProjectForm()