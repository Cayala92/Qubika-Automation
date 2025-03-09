import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/landingPage/landingPage'; // Import the Landing Page Page Object

/**
 * TODO:
 * This E2E test file verifies the overall behavior of the Landing Page 
 * through interactions defined in the Page Object. 
 * 
 * The file will performs (end-to-end) tests, ensuring that key features 
 * on the page are working  as expected from the user's perspective.
 * 
 * By using the Page Object, interactions with the page are kept separate from 
 * the tests, making the code cleaner, more scalable, and easier to maintain as 
 * the project grows.
 */

test.describe('Landing Page E2E Tests', () => {
    let landingPage: LandingPage;

    test.beforeEach(async ({ page }) => {
        landingPage = new LandingPage(page);
    });

    test('Should render the Qubika website and show the logo', async () => {
        await landingPage.navigateToQubikaWebSite();
        await expect(landingPage.getCurrentUrl()).resolves.toBe('https://qubika.com/');
        await expect(landingPage.isLogoVisible()).resolves.toBe(true);
    });
});