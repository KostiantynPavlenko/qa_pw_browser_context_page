import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.profile = page.getByRole('link', { name: 'your profile image' });
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.firstArticleAuthors = page.locator('(//*[@class="author"])[1]');
    this.firstArticleTitle = page.locator('(//*[@class="preview-link"])[1]/h1');
    this.firstArticleDescription = page.locator('(//*[@class="preview-link"])[1]/p');
    this.noArticleOnHome = page.getByText('No articles are here... yet.');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
  }

  async open() {
    await test.step(`Open 'Home' page`, async () => {
      await this.page.goto('/');
    });
  }

  async goToProfile() {
    await test.step(`Go to 'Profile' page`, async () => {
      await this.profile.click();
    });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async clickYourFeed() {
    await test.step(`Click the 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async clickGlobalFeed() {
    await test.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async assertYourFeedIsEmpty() {
    await expect(this.noArticleOnHome).toBeVisible();
  }

  async assertArticleAuthorContainsAuthor(articleAuthor) {
    await this.firstArticleAuthors.waitFor({state: 'visible'});
    await expect(this.firstArticleAuthors).toContainText(articleAuthor.toLowerCase());
  }

  async assertArticleTitleContainsTitle(articleTitle) {
    await expect(this.firstArticleTitle).toContainText(articleTitle);
  }

  async assertArticleDescriptionContainsDescription(articleDescription) {
    await expect(this.firstArticleDescription).toContainText(articleDescription);
  }
}
