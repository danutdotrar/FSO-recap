// check if the blog renders only title and author

// import stuff for testing
// import the Blog component
// render the component with a test blog obj
// select the component by class name
// expect that element to contain blog title and author
import { render, screen } from "@testing-library/react";
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
