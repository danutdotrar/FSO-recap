const { test, describe, expect, beforeEach } = require("@playwright/test");
const { before } = require("node:test");
const { loginWith, createNote } = require("./helper");

describe("Note app", () => {
    beforeEach(async ({ page, request }) => {
        // empty db
        await request.post("http://localhost:3001/api/testing/reset");
        await request.post("http://localhost:3001/api/users", {
            data: {
                name: "Danut",
                username: "danut",
                password: "danut",
            },
        });

        await page.goto("http://localhost:5173");
    });

    test("login fails with wrong password", async ({ page }) => {
        // get 'log in' button and click it
        // fill the username and wrong password
        // get 'login' and click it
        // expect 'wrong credentials' to be visible
        await loginWith(page, "danut", "wrong");

        const errorDiv = await page.locator(".error");
        await expect(errorDiv).toContainText("Wrong credentials");

        await expect(page.getByText("Danut is logged in")).not.toBeVisible();
    });

    test("front page can be opened", async ({ page }) => {
        const locator = await page.getByText("Notes");
        await expect(locator).toBeVisible();
    });

    test("login form can be opened and login", async ({ page }) => {
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
            await loginWith(page, "danut", "danut");
        });

        test("testing note creation", async ({ page }) => {
            // take 'new note' button
            // click button
            // get the textbox to fill some content
            // click save note
            // expect the text content that was saved to be visible

            // save new note
            await createNote(page, "testing e2e", true);

            await expect(page.getByText("testing e2e")).toBeVisible();
        });

        describe("and a note exists", () => {
            beforeEach(async ({ page }) => {
                await createNote(page, "first note", true);
                await createNote(page, "second note", true);
                await createNote(page, "third note", true);
            });

            test("importance can be changed", async ({ page }) => {
                const otherNoteText = await page.getByText("second note");
                const otherNoteElement = await otherNoteText.locator("..");

                await otherNoteElement
                    .getByRole("button", { name: "make not important" })
                    .click();

                await expect(
                    otherNoteElement.getByText("make important")
                ).toBeVisible();
            });
        });
    });
});
