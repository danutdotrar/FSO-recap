const dummy = (blogs) => {
    //
    return 1;
};

// return the total number of likes
const totalLikes = (blogs) => {
    // blogs is an array of objects

    // get all the likes
    // const numOfLikes = blogs.map((blog) => blog.likes);

    // reduce the numOfLikes array
    const total = blogs.reduce((acc, val) => acc + val.likes, 0);

    return blogs.length === 0 ? 0 : total;
};

// find out which blog has the most likes
const favoriteBlog = (blogs) => {
    // blogs is an array of objects

    // find the max likes in the blogs
    // array with the blog likes [12,2,3,4...]
    //
    const maxLikes = Math.max(...blogs.map((blog) => blog.likes));

    // use filter method
    // filter keeps the items that satisfy the condition
    // filter for blog.likes === max likes
    const blogWithMostLikes = blogs.filter((blog) => blog.likes === maxLikes);

    // we have an array with that one so return the first item[0]???
    return blogs.length === 0 ? 0 : blogWithMostLikes[0];
};

// return the author with the largest amount of blogs
// return as {author: name, blogs: number}
const mostBlogs = (blogs) => {
    // blogs is an array of objects

    // find the maximum number of blogs
    const maxNrOfBlogs = Math.max(...blogs.map((blog) => blog.blogs));
    // use filter to keep only the blog with the blog.blogs === max nr of blogs
    const filteredBlog = blogs.filter((blog) => blog.blogs === maxNrOfBlogs);

    // create new obj with the values from that obj
    const newBlogObj = {
        author: filteredBlog[0]?.author,
        blogs: filteredBlog[0]?.blogs,
    };

    // return 0 if blogs length === 0, else return new obj
    return blogs.length === 0 ? 0 : newBlogObj;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
