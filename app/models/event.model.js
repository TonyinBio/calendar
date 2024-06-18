module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("event", {
        checkout: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        checkin: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        presenters: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },
        color: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        }
    })

    return Event
}

