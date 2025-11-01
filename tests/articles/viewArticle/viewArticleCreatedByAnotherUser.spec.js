import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../../src/ui/pages/article/CreateArticlePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
  console.log(user1.username + ' BEFORE USER 1');
});

test('View an article created by another user', async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);
});

test('User can view an article created by another user in the Global Feed.', async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);
  await homePage.open();
  await homePage.clickGlobalFeed();

  await homePage.assertArticleAuthorContainsAuthor(user1.username);
  await homePage.assertArticleTitleContainsTitle(articleWithoutTags.title);
  await homePage.assertArticleDescriptionContainsDescription(articleWithoutTags.description);
});

test('User can follow the article created by another user.', async ({
  page2,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickFollowButton();
  await viewArticlePage.assertUnfollowButtonIsVisible();
});

test('User can unfollow the article created by another user.', async ({
  page2,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickFollowButton();
  await viewArticlePage.assertUnfollowButtonIsVisible();
  await viewArticlePage.clickUnFollowButton();
  await viewArticlePage.assertFollowButtonIsVisible();
});

test('User can view an article updated by another user.', async ({
  page1,
  page2,
  articleWithoutTags,
  articleWithOneTag,
}) => {
  const viewArticlePage1 = new ViewArticlePage(page1);
  const createArticlePage1 = new CreateArticlePage(page1);
  const viewArticlePage2 = new ViewArticlePage(page2);

  await viewArticlePage2.open(articleWithoutTags.url);
  await viewArticlePage2.assertArticleTextIsVisible(articleWithoutTags.text);

  await viewArticlePage1.open(articleWithoutTags.url);
  await viewArticlePage1.clickEditArticleButton();
  await createArticlePage1.fillTextField(articleWithOneTag.text)
  await createArticlePage1.clickUpdateArticleButton();

  await viewArticlePage2.open(articleWithoutTags.url);
  await viewArticlePage2.assertArticleTextIsVisible(articleWithOneTag.text);
});

test('User can see other user\'s new articles in "Your Feed" after following their profile.', async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);
  const homePage = new HomePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickFollowButton();
  await viewArticlePage.assertUnfollowButtonIsVisible();

  await homePage.open();
  await homePage.clickYourFeed();
  await homePage.assertArticleAuthorContainsAuthor(user1.username);
  await homePage.assertArticleTitleContainsTitle(articleWithoutTags.title);
  await homePage.assertArticleDescriptionContainsDescription(articleWithoutTags.description);
});

test('User doesn\'t see other user\'s articles in "Your Feed" after unfollowing their profile.', async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);
  const homePage = new HomePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickFollowButton();
  await viewArticlePage.assertUnfollowButtonIsVisible();

  await homePage.open();
  await homePage.clickYourFeed();
  await homePage.assertArticleAuthorContainsAuthor(user1.username);
  await homePage.assertArticleTitleContainsTitle(articleWithoutTags.title);
  await homePage.assertArticleDescriptionContainsDescription(articleWithoutTags.description);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickUnFollowButton();
  await viewArticlePage.assertFollowButtonIsVisible();

  await homePage.open();
  await homePage.clickYourFeed();
  await homePage.assertYourFeedIsEmpty();
});
