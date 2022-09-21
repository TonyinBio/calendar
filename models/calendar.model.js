module.exports = (sequelize, Sequelize) => {
    const Calendar = sequelize.define("calendar", {
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

    return Calendar
}

