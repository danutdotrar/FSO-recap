const { test, describe, expect } = require("@playwright/test");

describe("Note app", () => {
    test("front page can be opened", async ({ page }) => {
        await page.goto("http://localhost:5173");

        const locator = await page.getByText("Notes");
        await expect(locator).toBeVisible();
    });

    test("login form can be opened", async ({ page }) => {
        // go to page
        // take login button and click it -> form opened
        // insert the name and password into corresponding input text fields
        await page.goto("http://localhost:5173");
        await page.getByRole("button", { name: "log in" }).click();

        const textboxes = await page.getByRole("textbox").all();

        await textboxes[0].fill("danut");
        await textboxes[1].fill("danut");

        await page.getByRole("button", { name: "login" }).click();

        await expect(page.getByText("danut is logged in")).toBeVisible();
    });
});
