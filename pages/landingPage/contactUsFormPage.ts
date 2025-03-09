import { type Locator, type Page } from '@playwright/test';

export class ContactUsFormPage {
    readonly page: Page;
    readonly contactUsModal:Locator;
    readonly nameField:Locator;
    readonly emailField:Locator;
    readonly submitButton:Locator;
    readonly nameFieldError : Locator;
    readonly lastNameFieldError : Locator;
    readonly emailFieldError : Locator;
    readonly companyNameFieldError : Locator;
    readonly contactTypeFieldError : Locator;
    readonly messageFieldError : Locator;

    constructor(page: Page) {
        this.page = page;  
        this.contactUsModal = page.locator('.contact-us-modal.show');
        this.nameField = page.locator('input[name="firstname"]');
        this.emailField = page.locator('input[name="email"]');
        this.submitButton = page.locator('input[type="submit"][value="Submit"]');        
        this.nameFieldError = page.getByRole('group').filter({ hasText: 'First Name*Please complete' }).locator('label').nth(1);
        this.lastNameFieldError = page.getByRole('group').filter({ hasText: 'First Name*Please complete' }).locator('label').nth(3);
        this.emailFieldError = page.getByRole('group').filter({ hasText: 'Email*Please complete this' }).locator('label').nth(1);
        this.companyNameFieldError = page.getByRole('group').filter({ hasText: 'Email*Please complete this' }).locator('label').nth(3);
        this.contactTypeFieldError = page.getByRole('group').filter({ hasText: 'Contact type*Please' }).locator('label').nth(1);
        this.messageFieldError = page.getByRole('group').filter({ hasText: 'Message*Please complete this' }).locator('label').nth(1);
    }

    async isContactUsModalVisible(): Promise<boolean> {
        return await this.contactUsModal.isVisible();
    }

    async isNameFieldVisible(): Promise<boolean> {
        return await this.nameField.isVisible();
    }

    async isEmailFieldVisible(): Promise<boolean> {
        return await this.emailField.isVisible();
    }

    async isSubmitButtonVisible(): Promise<boolean> {
        return await this.submitButton.isVisible();
    }

    async clickSubmitButton() : Promise<void> {
        await this.submitButton.click();
    }

    async isNameFieldErrorVisible(): Promise<boolean> {
        return await this.nameFieldError.isVisible();
    }

    async isLastNameFieldErrorVisible(): Promise<boolean> {
        return await this.lastNameFieldError.isVisible();
    }

    async isEmailFieldErrorVisible(): Promise<boolean> {
        return await this.emailFieldError.isVisible();
    }

    async isCompanyNameFieldErrorVisible(): Promise<boolean> {
        return await this.companyNameFieldError.isVisible();
    }

    async isContactTypeFieldErrorVisible(): Promise<boolean> {
        return await this.contactTypeFieldError.isVisible();
    }

    async isMessageFieldErrorVisible(): Promise<boolean> {
        return await this.messageFieldError.isVisible();
    }
    
}
