module.exports = (sequelize, Sequelize) => {
    const Demo = sequelize.define("demo", {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },
        available: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    })

    return Demo
}