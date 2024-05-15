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
        // a new blog can be created
        // ex 5.19
    });
});
