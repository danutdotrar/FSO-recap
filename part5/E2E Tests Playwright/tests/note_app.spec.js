const { test, describe, expect, beforeEach } = require("@playwright/test");
const { before } = require("node:test");

describe("Note app", () => {
    beforeEach(async ({ page }) => {
        await page.goto("http://localhost:5173");
    });

    test("front page can be opened", async ({ page }) => {
        const locator = await page.getByText("Notes");
        await expect(locator).toBeVisible();
    });

    test("login form can be opened", async ({ page }) => {
        // take login button and click it -> form opened
        // insert the name and password into corresponding input text fields

        await page.getByRole("button", { name: "log in" }).click();

        await page.getByTestId("username").fill("danut");
        await page.getByTestId("password").fill("danut");
        await page.getByRole("button", { name: "login" }).click();

        await expect(page.getByText("danut is logged in")).toBeVisible();
    });

    describe("when logged in", () => {
        beforeEach(async ({ page }) => {
            // login first
            await page.getByRole("button", { name: "log in" }).click();
            await page.getByTestId("username").fill("danut");
            await page.getByTestId("password").fill("danut");
            await page.getByRole("button", { name: "login" }).click();
        });

        test("testing note creation", async ({ page }) => {
            // take 'new note' button
            // click button
            // get the textbox to fill some content
            // click save note
            // expect the text content that was saved to be visible

            // save new note
            await page.getByRole("button", { name: "new note" }).click();
            await page.getByTestId("noteContent").fill("testing e2e");

            await page.getByRole("button", { name: "save note" }).click();

            await expect(page.getByText("testing e2e")).toBeVisible();
        });
    });
});
