module.exports = (sequelize, Sequelize) => {
    const Events = sequelize.define("event", {
        title: {
            type: Sequelize.STRING
        },
        demotype: {
            type: Sequelize.STRING
        },
        presenters: {
            type: Sequelize.STRING
        },
        checkout: {
            type: Sequelize.DATE
        },
        checkin: {
            type: Sequelize.DATE
        }
    })

    return Events
}

