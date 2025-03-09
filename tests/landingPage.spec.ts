import { test, expect } from '@playwright/test'; 
import { LandingPage } from '../pages/landingPage/landingPage'; // Import the Landing Page Page Object
import { ContactUsFormPage } from '../pages/landingPage/contactUsFormPage'; // Import the Contact Us Form Page Object


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
    let contactUsFormPage: ContactUsFormPage;

    test.beforeEach(async ({ page }) => {
        landingPage = new LandingPage(page);        
        contactUsFormPage = new ContactUsFormPage(page);  
    });

    test('Contact Us form Validations', async () => {
        await landingPage.navigateToQubikaWebSite();
        await expect(landingPage.getCurrentUrl()).resolves.toBe('https://qubika.com/');
        await expect(landingPage.isLogoVisible()).resolves.toBe(true);
        await landingPage.clickContactUsButton();      
        await expect(contactUsFormPage.isContactUsModalVisible()).resolves.toBe(true);
        await validateFormFieldsVisibility(contactUsFormPage);
        await contactUsFormPage.clickSubmitButton();
        await validateErrorMessagesOnMandatoryFields(contactUsFormPage);
        await contactUsFormPage.writeInNameField("Test Name");
        await validateMandatoryFieldsErrorMessagesExceptName();
        await contactUsFormPage.clickCloseIcon();
        await expect(contactUsFormPage.isContactUsModalVisible()).resolves.toBe(false);
    });

    const validateFormFieldsVisibility = async (contactUsFormPage: ContactUsFormPage) => {
        await expect(contactUsFormPage.isNameFieldVisible()).resolves.toBe(true);
        await expect(contactUsFormPage.isEmailFieldVisible()).resolves.toBe(true);
        await expect(contactUsFormPage.isSubmitButtonVisible()).resolves.toBe(true);
    };

    const validateErrorMessagesOnMandatoryFields = async (contactUsFormPage: ContactUsFormPage) => {
        await expect(contactUsFormPage.isNameFieldErrorVisible()).resolves.toBe(true);
        await expect(contactUsFormPage.isLastNameFieldErrorVisible()).resolves.toBe(true);
        await expect(contactUsFormPage.isEmailFieldErrorVisible()).resolves.toBe(true);
        await expect(contactUsFormPage.isCompanyNameFieldErrorVisible()).resolves.toBe(true);
        await expect(contactUsFormPage.isContactTypeFieldErrorVisible()).resolves.toBe(true);
    };

    const validateMandatoryFieldsErrorMessagesExceptName = async () => {
        await expect(contactUsFormPage.isNameFieldErrorVisible()).resolves.toBe(false);
        await expect(contactUsFormPage.isLastNameFieldErrorVisible()).resolves.toBe(true);
        await expect(contactUsFormPage.isEmailFieldErrorVisible()).resolves.toBe(true);
        await expect(contactUsFormPage.isCompanyNameFieldErrorVisible()).resolves.toBe(true);
        await expect(contactUsFormPage.isContactTypeFieldErrorVisible()).resolves.toBe(true);
      };
});