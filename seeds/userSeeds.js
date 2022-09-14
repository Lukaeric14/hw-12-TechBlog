const { User } = require('../models');

const usr = [
    {
        username: 'Luka',
        password: 'isawesome'

    }
];

const userSeeds = () => User.bulkCreate(usr);

module.exports = userSeeds;

//done