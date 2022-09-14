const userSeeds = require('./userSeeds');
const postSeeds = require('./postSeeds');
const commentSeeds = require('./commentSeeds');

const sequelize = require('../config/connection');

const seed = async() => {
    
    await sequelize.sync({ force: true });
    await userSeeds();
    await postSeeds();
    await commentSeeds();
    process.exit(0);
};

seed();

//done