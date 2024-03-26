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

describe("list of blogs with ", () => {
    test("empty blog", () => {
        const blogs = [];

        const result = listHelper.favoriteBlog(blogs);

        assert.strictEqual(result, 0);
    });

    test("just one blog", () => {
        const blogs = [
            {
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                likes: 12,
            },
        ];

        const result = listHelper.favoriteBlog(blogs);

        // compare objects with deepStrictEqual
        assert.deepStrictEqual(result, blogs[0]);
    });

    test("a few blogs", () => {
        const blogs = [
            {
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                likes: 12,
            },
            {
                title: "No reverse without split and join",
                author: "Him Who",
                likes: 30,
            },
        ];

        const result = listHelper.favoriteBlog(blogs);

        assert.deepStrictEqual(result, blogs[1]);
    });
});
