import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.profileSettingsButton = this.page.locator('//*[@class="profile-page"]//a[@href="/settings"]');
  }

  async goToProfileSettings() {
    await test.step(`Go to 'Profile' settings`, async () => {
      await this.profileSettingsButton.click();
    });
  }

}