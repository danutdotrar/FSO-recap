// check if the blog renders only title and author

// import stuff for testing
// import the Blog component
// render the component with a test blog obj
// select the component by class name
// expect that element to contain blog title and author
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Blog from "./Blog";
import { expect } from "vitest";

test("component displays only title and author at first render", () => {
    // create test obj
    const blog = {
        title: "title",
        author: "author",
        url: "www",
        likes: "3",
        user: {
            name: "name",
        },
    };

    // render the Blog component with the blog obj
    const container = render(<Blog blog={blog} />).container;

    // check for title and author to be rendered
    const titleAndAuthor = screen.getByText("title, author");
    expect(titleAndAuthor).toBeDefined();

    // check for togglable content to be display: none
    const togglableContent = container.querySelector(".togglableContent");
    expect(togglableContent).toHaveStyle("display: none;");
});

test("url and number of likes are shown when view is clicked", async () => {
    // render the component with dummy data
    // check for 'togglableContent' to be hidden (display: none)
    // click on 'view' button
    // check for 'togglableContent' to be shown (display not none)

    // create dummy obj
    const blog = {
        title: "title",
        author: "author",
        url: "www",
        likes: "3",
        user: {
            name: "name",
        },
    };

    const { container } = render(<Blog blog={blog} />);
    const togglableContent = container.querySelector(".togglableContent");

    expect(togglableContent).toHaveStyle("display: none;");

    // click 'view'
    // start a user session
    // await click
    const viewBtn = screen.getByText("view");
    const user = userEvent.setup();
    await user.click(viewBtn);

    expect(togglableContent).not.toHaveStyle("display: none;");
});

test("like button is called twice if clicked twice", async () => {
    // render the component with dummy data
    // get the like button
    // create mock function

    // create dummy obj
    const blog = {
        title: "title",
        author: "author",
        url: "www",
        likes: "3",
        user: {
            name: "name",
        },
    };

    const mockHandler = vi.fn();

    render(<Blog blog={blog} updateBlog={mockHandler} />);

    const likeButton = screen.getByText("like");

    // start user session
    const user = userEvent.setup();
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
});
