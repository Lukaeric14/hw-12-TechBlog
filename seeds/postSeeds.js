const { Post } = require('../models');

const pst = [

    {
        title: "Test Title",
        user_id: 1,
        content:"This is a test"
    }
];

const postSeeds = () => Comment.bulkCreate(pst);

module.exports = postSeeds;

//done