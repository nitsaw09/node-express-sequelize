const  { Sequelize, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize('Blog', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql',
    logging: true,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection Successfully');
    })
    .catch(err => {
        console.log('Error: ', err.message);
    });

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op;

db.roles = require('./roles')(sequelize, DataTypes);

db.users = require('./users')(sequelize, DataTypes);

db.posts = require('./posts')(sequelize, DataTypes);

db.comments = require('./comments')(sequelize, DataTypes);

db.categories = require('./categories')(sequelize, DataTypes);

db.tags = require('./tags')(sequelize, DataTypes);

db.postTag = require('./post-tag')(sequelize, DataTypes);

require('./utils/scopes')({db});

require('./utils/associates')({db});

db.sequelize.sync({ alter: true })
.then(() => {
    console.log('sync all tables');
})
.catch(err => {
    console.log('Error: ', err.message);
});

module.exports = db;