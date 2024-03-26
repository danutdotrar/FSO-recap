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

module.exports = { dummy, totalLikes };
