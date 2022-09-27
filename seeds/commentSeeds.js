const { Comments } = require("../models");

const cmmnt = [
  {
    comment_text: "Test comment",
    user_id: 1,
    post_id: 1,
  },
];

const commentSeeds = () => Comments.bulkCreate(cmmnt);

module.exports = commentSeeds;

//done
