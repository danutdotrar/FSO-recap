import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";
import { expect } from "vitest";

test("<BlogForm /> creates new blog with right details", async () => {
    const mockTitleChange = vi.fn();
    const mockBlogSubmit = vi.fn();

    render(
        <BlogForm
            handleBlogSubmit={mockBlogSubmit}
            handleTitle={mockTitleChange}
        />
    );

    // start user session
    const user = userEvent.setup();

    const submitBtn = screen.getByText("create blog");
    const input = screen.getAllByRole("textbox");

    await user.type(input[0], "testing a form :)");

    await user.click(submitBtn);

    // fireEvent.submit(submitBtn);

    console.log(mockBlogSubmit.mock.calls.content);
});
