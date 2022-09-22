module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("event", {
        checkout: {
            type: Sequelize.DATE
        },
        checkin: {
            type: Sequelize.DATE
        },
        presenters: {
            type: Sequelize.STRING
        }
    })

    return Event
}

