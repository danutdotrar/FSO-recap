// write a test for HTTP request GET using the supertest llibrary

//
const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");

// importam app pt a folosi supertest
const app = require("../app");
const supertest = require("supertest");
const blogHelper = require("./blog_helper");

// cu api vom face HTTP requests catre backend
const api = supertest(app);

// import Blog model
const Blog = require("../models/blog");
const mongoose = require("mongoose");

// initializam baza de date
// inainte de toate testele
beforeEach(async () => {
    console.log("saving blogs...");
    // reset database
    await Blog.deleteMany({});

    // trebuie sa salvam initialBlogs in MongoDB
    // ca sa salvam un obiect in MongoDB, trebuie sa folosim model constructorul Blog pentru a crea un document care mai apoi poate fi salvat prin metoda .save()
    // cream un array de documente/obiecte, fiecare creat cu model constructorul Blog
    const blogsObjects = blogHelper.initialBlogs.map((blog) => new Blog(blog));

    // iteram peste fiecare document din blogsObject si il salvam
    // fiecare blog salvat va rezulta intr-un Promise
    const promiseArray = blogsObjects.map((blog) => blog.save());

    // avem un array de Promises, asadar putem folosi Promise.all() pentru a crea un singur Promise DOAR dupa ce toate Promises din  promiseArray sunt fullfiled
    await Promise.all(promiseArray);
    console.log("Blogs are saved!");
});

// check if blogs are returned in the correct format and length
test("blogs are returned in correct format and length", async () => {
    // check the status code and the format type
    const returnedBlogs = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);

    // check if the length of returnedBlogs is the same as the length of initial blogs
    assert.strictEqual(
        returnedBlogs.body.length,
        blogHelper.initialBlogs.length
    );
});

test("the unique identifier is named 'id'", async () => {
    // get a resource from db
    const blogs = blogHelper.blogsInDb();

    // take first blog
    const firstBlog = blogs[0];

    // get request to resource unique id
    await api.get(`/api/blogs/${firstBlog.id}`).expect(200);
});

// inchidem mongodb
after(async () => {
    await mongoose.connection.close();
});
