const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith } = require("./helper");

describe("Blog app", () => {
    beforeEach(async ({ page, request }) => {
        // empty DB to create a new user
        await request.post("http://localhost:3001/api/testing/reset");

        // create user for backend
        await request.post("http://localhost:3001/api/users", {
            name: "Danut",
            username: "danut",
            password: "danut",
        });

        await page.goto("http://localhost:5173");
    });

    // check if login form is shown
    test("login form is displayed", async ({ page }) => {
        await expect(page.getByText("Log in to app")).toBeVisible();
    });

    describe("Login", () => {
        test("succeeds with correct credentials", async ({ page }) => {
            await loginWith(page, "danut", "danut");

            await expect(page.getByText("Danut is Logged In")).toBeVisible();
        });

        test("fails with wrong password", async ({ page }) => {
            await loginWith(page, "danut", "wrong");

            await expect(
                page.getByText("username or password not ok")
            ).toBeVisible();
            await expect(
                page.getByText("Danut is Logged In")
            ).not.toBeVisible();
        });
    });

    describe("When logged in", () => {
        beforeEach(async ({ page, request }) => {
            await loginWith(page, "danut", "danut");

            await request.post("http://localhost:3001/api/testing/reset");
        });

        // a new blog can be created
        // ex 5.19
        test("a new blog can be created", async ({ page }) => {
            // get the button 'new blog' and click it
            // get the title author and url and fill them
            // get the create 'blog button' and click it
            await page.getByRole("button", { name: "new blog" }).click();
            await page.getByTestId("title").fill("typing from playwright");
            await page.getByTestId("author").fill("author from playwright");
            await page.getByTestId("url").fill("url from playwright");

            await page.getByRole("button", { name: "create blog" }).click();

            await expect(
                page.getByText("typing from playwright, author from playwright")
            ).toBeVisible();
        });
    });
});
