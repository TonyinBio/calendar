module.exports = (sequelize, Sequelize) => {
    const Demo = sequelize.define("demo", {
        title: {
            type: Sequelize.STRING
        },
        available: {
            type: Sequelize.BOOLEAN
        }
    })

    return Demo
}