import { afterEach } from "vitetest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// after each test, reset jsdom
afterEach(() => {
    cleanup();
});
