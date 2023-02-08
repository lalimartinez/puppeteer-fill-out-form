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

  const startWebsiteButton = await page.$x('//*[@id="76c00e62-f6cc-5450-9667-dfaf9604c3b0"]');
  await startWebsiteButton[3].click();
  await page.waitForTimeout(3000);

  await page.type('#mui-17', 'Lali');
  await page.type('#mui-18', 'Martinez');
  await page.type('#mui-19', 'lali@hi.com');
  await page.type('#mui-20', '8286371937')

  const helpWithdropdown = await page.$x('//*[@id="mui-component-select-solutions"]');
  await helpWithdropdown[3].click();
  await page.waitForTimeout(1000);
  const selectWebDevelopment = await page.$x('//*[@id="menu-solutions"]/div[3]/ul/li[1]');
  await selectWebDevelopment[0].click();
  await page.waitForTimeout(1000);

  scrollToElement(page, '#mui-21');
  await page.type('#mui-21', 'This is a description of the website.')
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'schedule_call_form.png', fullPage: true });
  await browser.close();
}

fillOutStartWebsiteProjectForm()