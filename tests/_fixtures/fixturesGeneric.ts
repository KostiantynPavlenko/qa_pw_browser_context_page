import { test as base } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

export const test = base.extend<
  {
    page1;
    page2;
    user;
    user1;
    user2;
    infoTestLog;
  },
  {
    logger: Logger;
  }
>({
  page1: async ({ page }, use) => {
    await use(page);
  },
  page2: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page2 = await context.newPage();

    await use(page2);
  },
  user: async ({ logger }, use) => {
    const user = generateNewUserData(logger);

    await use(user);
  },
  user1: async ({ user }, use) => {
    await use(user);
  },
  user2: async ({ logger }, use) => {
    const user2 = generateNewUserData(logger);

    await use(user2);
  },
  logger: [
    async ({}, use) => {
      const logger = new Logger('error');

      await use(logger);
    },
    { scope: 'worker' },
  ],
  infoTestLog: [
    async ({ logger }, use, testInfo) => {
      const indexOfTestSubfolderStart = testInfo.file.indexOf('/tests') + 7;
      const fileName = testInfo.file.substring(indexOfTestSubfolderStart);

      logger.info(`Test started: ${fileName}`);

      await use('infoTestLog');

      logger.info(`Test completed: ${fileName}`);
    },
    { scope: 'test', auto: true },
  ],
});
