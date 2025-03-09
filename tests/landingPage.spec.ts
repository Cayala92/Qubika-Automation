/**
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

import { test, expect } from '@playwright/test'; 
import { LandingPage } from '../pages/landingPage/landingPage'; // Import the Landing Page Page Object
import { ContactUsFormPage } from '../pages/landingPage/contactUsFormPage'; // Import the Contact Us Form Page Object

test.describe('Landing Page E2E Tests', () => {
    let landingPage: LandingPage;
    let contactUsFormPage: ContactUsFormPage;

    test.beforeEach(async ({ page }) => {
        landingPage = new LandingPage(page);        
        contactUsFormPage = new ContactUsFormPage(page);  
    });

    test('Contact Us form Validations', async () => {
        const inputName = "Test Name";
        const url = "https://qubika.com/";
        await landingPage.navigateToQubikaWebSite();
        await expect(landingPage.getCurrentUrl()).resolves.toBe(url);
        await expect(landingPage.isLogoVisible()).resolves.toBeTruthy();
        await landingPage.clickContactUsButton();      
        await expect(contactUsFormPage.isContactUsModalVisible()).resolves.toBeTruthy();
        await validateFormFieldsVisibility(contactUsFormPage);
        await contactUsFormPage.clickSubmitButton();
        await validateErrorMessagesOnMandatoryFields(contactUsFormPage);
        await contactUsFormPage.writeInNameField(inputName);
        await validateMandatoryFieldsErrorMessagesExceptName();
        await contactUsFormPage.clickCloseIcon();
        await expect(contactUsFormPage.isContactUsModalVisible()).resolves.toBeFalsy();
        await landingPage.clickContactUsButton();
        await expect(contactUsFormPage.isContactUsModalVisible()).resolves.toBeTruthy();
        await validateMandatoryFieldsErrorMessagesExceptName();
        const nameFieldText = await contactUsFormPage.getNameFieldText();
        await expect(nameFieldText).toBe(inputName);
    });

    const validateFormFieldsVisibility = async (contactUsFormPage: ContactUsFormPage) => {
        await expect(contactUsFormPage.isNameFieldVisible()).resolves.toBeTruthy();
        await expect(contactUsFormPage.isEmailFieldVisible()).resolves.toBeTruthy();
        await expect(contactUsFormPage.isSubmitButtonVisible()).resolves.toBeTruthy();
    };

    const validateErrorMessagesOnMandatoryFields = async (contactUsFormPage: ContactUsFormPage) => {
        await expect(contactUsFormPage.isNameFieldErrorVisible()).resolves.toBeTruthy();
        await expect(contactUsFormPage.isLastNameFieldErrorVisible()).resolves.toBeTruthy();
        await expect(contactUsFormPage.isEmailFieldErrorVisible()).resolves.toBeTruthy();
        await expect(contactUsFormPage.isCompanyNameFieldErrorVisible()).resolves.toBeTruthy();
        await expect(contactUsFormPage.isContactTypeFieldErrorVisible()).resolves.toBeTruthy();
    };

    const validateMandatoryFieldsErrorMessagesExceptName = async () => {
        await expect(contactUsFormPage.isNameFieldErrorVisible()).resolves.toBeFalsy();
        await expect(contactUsFormPage.isLastNameFieldErrorVisible()).resolves.toBeTruthy();
        await expect(contactUsFormPage.isEmailFieldErrorVisible()).resolves.toBeTruthy();
        await expect(contactUsFormPage.isCompanyNameFieldErrorVisible()).resolves.toBeTruthy();
        await expect(contactUsFormPage.isContactTypeFieldErrorVisible()).resolves.toBeTruthy();
    };
});