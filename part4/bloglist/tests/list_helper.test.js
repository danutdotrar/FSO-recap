const { test, describe } = require("node:test");

const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);

    assert.strictEqual(result, 1);
});

describe("total likes of ", () => {
    test("empty list is zero", () => {
        const blogs = [];

        const result = listHelper.totalLikes(blogs);

        assert.strictEqual(result, 0);
    });

    test("when list has one blog, return the likes of that", () => {
        const listWithOneBlog = [
            {
                title: "test1",
                author: "test1",
                url: "test1",
                likes: 12,
                id: "66018d8a2b3c81aafdcc3a74",
            },
        ];

        const result = listHelper.totalLikes(listWithOneBlog);

        assert.strictEqual(result, 12);
    });

    test("a bigger list with blogs is done right", () => {
        const listOfBlogs = [
            {
                title: "test1",
                author: "test1",
                url: "test1",
                likes: 12,
                id: "66018d8a2b3c81aafdcc3a74",
            },
            {
                title: "test2",
                author: "test2",
                url: "test2",
                likes: 10,
                id: "66019801bb32238b612763ad",
            },
        ];

        const result = listHelper.totalLikes(listOfBlogs);

        assert.strictEqual(result, 22);
    });
});
