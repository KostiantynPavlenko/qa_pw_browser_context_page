import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.homeTabButton = page.locator('(//a[text()="Home"])[1]');
    this.editArticleButton = page.locator('//*[@class="article-actions"]//a[contains(text(), "Edit Article")]');
    this.followButton = page.page.locator('.article-actions button', { hasText: /^Follow / });
    this.unfollowButton = page.page.locator('.article-actions button', { hasText: /^Unfollow / });
    this.articleTitleHeader = page.getByRole('heading');
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { name: username }).first();
  }

  url() {
    return this.page.url();
  }

  async open(url) {
    await test.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url);
    });
  }

  async goToHomePage(){
    await test.step(`Go to 'Home' page`, async () => {
      await this.homeTabButton.click();
    });
  }

  async clickEditArticleButton() {
    await test.step(`Click 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    });
  }

  async clickFollowButton() {
    await test.step(`Click 'Follow' button`, async () => {
      await this.followButton.click();
    });
  }

  async clickUnFollowButton() {
    await test.step(`Click 'Unfollow' button`, async () => {
      await this.unfollowButton.click();
    });
  }

  async assertFollowButtonIsVisible() {
    await test.step(`Assert the 'Follow' button is visible`, async () => {
      await expect(this.followButton).toBeVisible();
    });
  }
  async assertUnfollowButtonIsVisible() {
    await test.step(`Assert the 'Unfollow' button is visible`, async () => {
      await expect(this.unfollowButton).toBeVisible();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleAuthorNameIsVisible(username) {
    await test.step(`Assert the article has correct author username`, async () => {
      await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
    });
  }
}
