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
    readonly closeIcon : Locator;

    constructor(page: Page) {
        this.page = page;  
        this.contactUsModal = page.locator('.contact-us-modal.show');
        this.nameField = page.locator('input[name="firstname"]');
        this.emailField = page.locator('input[name="email"]');
        this.submitButton = page.locator('input[type="submit"][value="Submit"]'); 
        this.nameFieldError = page.locator('.hs_firstname .hs-error-msgs');
        this.lastNameFieldError = page.locator('.hs_lastname .hs-error-msgs');
        this.emailFieldError = page.locator('.hs_email .hs-error-msgs');
        this.companyNameFieldError = page.locator('.hs_company .hs-error-msgs');
        this.contactTypeFieldError = page.locator('.hs_contact_type .hs-error-msgs'); 
        this.messageFieldError = page.locator('.hs_message .hs-error-msgs');
        this.closeIcon = page.locator('.contact-us-modal.show  .close-modal');
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

    async writeInNameField(text: string) {
        await this.nameField.fill(text);
    }

    async clickCloseIcon() : Promise<void> {
        await this.closeIcon.click();
    }

    async getNameFieldText(): Promise<string> {
        return await this.nameField.inputValue();
    }    
}
