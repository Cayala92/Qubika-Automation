
import { type Locator, type Page } from '@playwright/test';

export class LandingPage {
    readonly page: Page;
    readonly logo:Locator;

    constructor(page: Page) {
        this.page = page;  
        this.logo = page.locator('a.logo');
    }

    async getCurrentUrl() {
        return this.page.url();
      }

    async navigateToQubikaWebSite() {
        await this.page.goto('https://qubika.com/');
    }

    async isLogoVisible(): Promise<boolean> {
        return await this.logo.isVisible();
    }
}
