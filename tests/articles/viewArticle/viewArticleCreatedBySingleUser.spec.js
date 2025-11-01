import { test } from "../../_fixtures/fixtures";
import { createArticle } from "../../../src/ui/actions/articles/createArticle";
import { signUpUser } from "../../../src/ui/actions/auth/signUpUser";
import { ViewArticlePage } from "../../../src/ui/pages/article/ViewArticlePage";
import { HomePage } from "../../../src/ui/pages/HomePage";

test.beforeEach(async ({ page1, user1, articleWithoutTags }) => {
  await signUpUser(page1, user1);

  await createArticle(page1, articleWithoutTags);

  const viewArticlePage = new ViewArticlePage(page1);
  const homePage = new HomePage(page1);
  await viewArticlePage.goToHomePage();
  await homePage.clickGlobalFeed();

  await homePage.assertArticleAuthorContainsAuthor(user1.username);
});

test('User can see own article in "Global feed" when not logged in.', async ({
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