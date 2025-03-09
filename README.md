# Qubika-Automation

## Qubika Automation Testing

This project uses **Playwright** for automating end-to-end UI tests on the contact form of the Qubika website. It follows best practices in test automation, including the **Page Object** design pattern to ensure maintainability and scalability of the code.

## Prerequisites

1. **Node.js** (v16.0.0 or higher).
2. **Playwright**: A framework for automating web browsers.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your_username/qubika-automation.git
    cd qubika-automation
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

3. If you don't have **Node.js** installed, you can download and install it from [nodejs.org](https://nodejs.org/).

## Project Structure

The project follows a modular approach, making the code easier to maintain and scale.

### Running the Tests
You can run the tests using the following command:

```
npx playwright test
```

By default, this will run all tests in the /tests directory.

### To run specific tests:

```
npx playwright test tests/contactUsFormValidation.test.ts
```
## Implementation Details

### Page Objects

Page Objects encapsulate the logic for interacting with the elements of the interface, keeping interaction details separate from the test logic. In this project, we have the following Page Objects:

1. **LandingPage**: Represents the landing page of the Qubika website and contains methods for interacting with elements such as the logo and the "Contact Us" button.
2. **ContactUsFormPage**: Represents the contact form and provides methods to interact with form fields and validate that error messages appear correctly.

Example of a Page Object (`contactUsFormPage.ts`):

```typescript
import { Locator, Page } from '@playwright/test';

export class ContactUsFormPage {
    readonly page: Page;

    // Form fields
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly emailField: Locator;
    readonly companyNameField: Locator;
    readonly contactTypeField: Locator;
    readonly messageField: Locator;

    // Error messages
    readonly firstNameErrorMessage: Locator;
    readonly lastNameErrorMessage: Locator;
    readonly emailErrorMessage: Locator;
    readonly companyNameErrorMessage: Locator;
    readonly contactTypeErrorMessage: Locator;
    readonly messageErrorMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        // Form fields
        this.firstNameField = page.locator('input[name="firstname"]');
        this.lastNameField = page.locator('input[name="lastname"]');
        this.emailField = page.locator('input[name="email"]');
        this.companyNameField = page.locator('input[name="company"]');
        this.contactTypeField = page.locator('select[name="contact_type"]');
        this.messageField = page.locator('textarea[name="message"]');

        // Error messages
        this.firstNameErrorMessage = page.locator('.hs_firstname .hs-error-msgs');
        this.lastNameErrorMessage = page.locator('.hs_lastname .hs-error-msgs');
        this.emailErrorMessage = page.locator('.hs_email .hs-error-msgs');
        this.companyNameErrorMessage = page.locator('.hs_company .hs-error-msgs');
        this.contactTypeErrorMessage = page.locator('.hs_contact_type .hs-error-msgs');
        this.messageErrorMessage = page.locator('.hs_message .hs-error-msgs');
    }
}
```
### Tests
The tests are located in the /tests directory. Each test is written to validate the behavior of the Qubika website.

```
Example of a test (contactUsFormValidation.test.ts):

import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/landingPage/landingPage';
import { ContactUsFormPage } from '../pages/landingPage/contactUsFormPage';

test.describe('Contact Us Form Validation', () => {
    let landingPage: LandingPage;
    let contactUsFormPage: ContactUsFormPage;

    test.beforeEach(async ({ page }) => {
        landingPage = new LandingPage(page);        
        contactUsFormPage = new ContactUsFormPage(page);  
    });

    test('Should show error messages for all mandatory fields except Name', async () => {
        await landingPage.navigateToQubikaWebSite();
        await landingPage.clickContactUsButton();

        // Submit the form with empty fields
        await contactUsFormPage.submitForm();

        // Validate the error messages for each mandatory field
        await expect(contactUsFormPage.firstNameErrorMessage).toBeHidden();
        await expect(contactUsFormPage.lastNameErrorMessage).toBeVisible();
        await expect(contactUsFormPage.emailErrorMessage).toBeVisible();
        await expect(contactUsFormPage.companyNameErrorMessage).toBeVisible();
        await expect(contactUsFormPage.contactTypeErrorMessage).toBeVisible();
        await expect(contactUsFormPage.messageErrorMessage).toBeVisible();
    });
});
```


### Conclusion
This project aims to test the behavior of the Qubika contact form using Playwright and the Page Object design pattern. It ensures that the UI is correctly handling form validations and error messages.
