const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const NewUser = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,

            autoIncrement: true,
            primaryKey: true
        },
        FirstName: {
            type: Sequelize.STRING,
        },
        LastName: {
            type: Sequelize.STRING,
        },
        Email: {
            type: Sequelize.STRING,
        },
        Address: {
            type: Sequelize.STRING,
        },
        MobileNo: {
            type: Sequelize.STRING,
        },
        Image: {
            type: Sequelize.STRING,
        },

    });
    return NewUser;
}