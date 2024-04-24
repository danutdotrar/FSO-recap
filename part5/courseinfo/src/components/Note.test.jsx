// globals is set to 'true' in vite config, so we dont need to import keywords as 'describe, test, expect'

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Note from "./Note";
import { expect } from "vitest";

test("renders content", () => {
    const note = {
        content: "Component testing is done with react-testing-library",
        important: true,
    };

    render(<Note note={note} />);

    // container obj is one of the fields returned by the render function
    const { container } = render(<Note note={note} />);

    // select the div in container by the CSS class
    const div = container.querySelector(".note");

    expect(div).toHaveTextContent(
        "Component testing is done with react-testing-library"
    );
});

test("clicking the button calls event handler once", async () => {
    const note = {
        content: "Component testing is done with react-testing-library",
        important: true,
    };

    // mock function
    const mockHandler = vi.fn();

    // render the component
    render(<Note note={note} toggleImportance={mockHandler} />);

    // start a session with setup
    const user = userEvent.setup();
    const button = screen.getByText("make not important");

    // click the button
    await user.click(button);

    // expect the mock function to call once
    // the calls of the mock function is saved to the 'mock.calls' array
    expect(mockHandler.mock.calls).toHaveLength(1);
});
