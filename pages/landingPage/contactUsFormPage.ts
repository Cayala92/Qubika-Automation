import { type Locator, type Page } from '@playwright/test';

export class ContactUsFormPage {
    readonly page: Page;
    readonly contactUsModal:Locator;
    readonly nameField:Locator;
    readonly emailField:Locator;
    readonly submitButton:Locator;

    constructor(page: Page) {
        this.page = page;  
        this.contactUsModal = page.locator('.contact-us-modal.show');
        this.nameField = page.locator('input[name="firstname"]');
        this.emailField = page.locator('input[name="email"]');
        this.submitButton = page.locator('input[type="submit"][value="Submit"]');
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
}
