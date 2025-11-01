import { expect, test } from '@playwright/test';

export class ProfileSettingsPage {
  constructor(page) {
    this.page= page;
    this.newPasswordField = this.page.getByPlaceholder('New Password');
    this.updateSettingsButton = this.page.getByRole('button', { name: 'Update Settings' });
  }

  async fillNewPasswordField(password) {
    await test.step(`Fill the 'New Password' field`, async () => {
      await this.newPasswordField.fill(password);
    });
  }

  async clickUpdateSettingsButton() {
    await test.step(`Click the 'Update Settings' button`, async () => {
      await this.updateSettingsButton.click();
    });
  }
}