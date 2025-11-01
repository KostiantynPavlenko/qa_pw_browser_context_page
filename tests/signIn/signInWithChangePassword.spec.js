import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ProfilePage } from '../../src/ui/pages/profile/ProfilePage';
import { ProfileSettingsPage } from '../../src/ui/pages/profile/ProfileSettingsPage';

test.beforeEach(async ({ page1, user, user2 }) => {
  await signUpUser(page1, user);

  const homePage1 = new HomePage(page1);
  const profilePage = new ProfilePage(page1);
  const profileSettingsPage = new ProfileSettingsPage(page1);

  await homePage1.goToProfile();
  await profilePage.goToProfileSettings();
  await profileSettingsPage.fillNewPasswordField(user2.password);
  await profileSettingsPage.clickUpdateSettingsButton();
});

test('User can sign in with changed in profile password.', async ({
  page2,
  user1,
  user2,
}) => {
  const signInPage = new SignInPage(page2);
  const homePage = new HomePage(page2);
  
  await signInPage.open();

  await signInPage.open();
  await signInPage.fillEmailField(user1.email);
  await signInPage.fillPasswordField(user2.password);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});